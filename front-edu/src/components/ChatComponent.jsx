import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { URL_BASE } from "../constants";
import axios from "axios";
import { socket } from "../socket";

const url = `${URL_BASE}/chats`;

function ChatComponent() {
  const { register, handleSubmit, reset } = useForm();

  const [messages, setMessages] = useState([]);
  const infoUser = localStorage.getItem("userData");
  const userInfo = JSON.parse(infoUser);

  const onSubmit = async (data) => {
    try {
      const info = {
        _id: userInfo._id,
        name: userInfo.name,
        message: data.text,
        role: userInfo.role,
        createdAt: new Date(),
      };
      socket.emit("message", info);
      setMessages((current) => [...current, info]);
      await axios.post(url, info);
      reset();
    } catch (error) {
      enqueueSnackbar(error.response.data.message + ". Try with some new.", {
        variant: "error",
      });
    }
  };

  const fetchChat = async () => {
    const response = await axios.get(url);
    setMessages(response.data);
  };

  const dummy = useRef(null);
  useEffect(() => {
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    socket.connect();

    socket.on("message", (data) => {
      setMessages((current) => [...current, data]);
    });

    return () => {
      socket.disconnect();
      socket.off("message");
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-full h-[calc(100vh_-_422px)] lg:h-[calc(100vh_-_134px)] overflow-y-scroll">
        {messages.length > 0 ? (
          <ul className="w-full p-3">
            {messages.map((c) => {
              return (
                <li
                  key={c.createdAt}
                  className={` my-2 p-2 ml-3 table text-sm rounded-md max-w-[200px] break-all ${
                    c.name == userInfo.name
                      ? `bg-sky-700 ml-auto`
                      : `bg-red-400`
                  }`}
                >
                  {c.role == "Moderator" && (
                    <>
                      <span className="text-[8px] font-semibold">
                        Moderator
                      </span>
                      <br />
                    </>
                  )}
                  <span className="font-semibold">{c.name}: </span> {c.message}
                </li>
              );
            })}
            <div ref={dummy} />
          </ul>
        ) : (
          <div className="flex justify-center items-center py-4">
            <p className="font-bold">No messages yet...</p>
          </div>
        )}
      </div>
      <div className="flex items-center w-full h-[70px]">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row p-2 gap-3">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              placeholder="Type your text here..."
              {...register("text", { required: true })}
            />
            <button
              className="shadow bg-[#f97316] hover:bg-[#c2410c] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatComponent;
