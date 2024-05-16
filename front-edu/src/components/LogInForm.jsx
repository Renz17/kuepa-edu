import React from "react";
import axios from "axios";
import { URL_BASE } from "../constants";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const url = `${URL_BASE}/users/auth`;

function LogInForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(url, {
        params: { username: data.username, password: data.password },
      });
      enqueueSnackbar("User Logged successfully", { variant: "success" });
      localStorage.setItem("userData", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      enqueueSnackbar(error.response.data.message + ". Try Again.", {
        variant: "error",
      });
    }
  };

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-orange-500 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            User
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            {...register("username", {
              required: "This is required*",
              maxLength: 20,
            })}
          />
          {errors.username && (
            <span className="text-[10px] text-red-300">
              {errors.username.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-orange-500 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Password
          </label>
          <input
            type="password"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            {...register("password", {
              required: "This is required*",
              maxLength: 20,
            })}
          />
          {errors.password && (
            <span className="text-[10px] text-red-300">
              {errors.password.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-center -mx-3 mb-6">
        <button
          className="shadow bg-[#f97316] hover:bg-[#c2410c] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-6"
          type="submit"
        >
          Iniciar Sesion
        </button>
      </div>
    </form>
  );
}

export default LogInForm;
