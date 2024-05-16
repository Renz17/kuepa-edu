// eslint-disable-next-line no-unused-vars
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { URL_BASE } from "../constants";
import { useSnackbar } from "notistack";

const url = `${URL_BASE}/users/`;

const SignUpForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log({ errors });

  const onSubmit = async (data) => {
    try {
      await axios.post(url, data);
      enqueueSnackbar("User registered successfully", { variant: "success" });
      navigate("/login");
    } catch (error) {
      enqueueSnackbar(error.response.data.message + ". Try with some new.", {
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
            Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            {...register("name", {
              required: "This is required*",
              pattern: {
                value: /^[a-zA-Z\s.]*$/i,
                message: "Can not include numbers",
              },
            })}
          />
          {errors.name && (
            <span className="text-[10px] text-red-300">
              {errors.name.message}
            </span>
          )}
        </div>
      </div>
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
            {...register("user", {
              required: "This is required*",
              maxLength: 20,
            })}
          />
          {errors.user && (
            <span className="text-[10px] text-red-300">
              {errors.user.message}
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
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-orange-500 text-xs font-bold mb-2"
            htmlFor="role"
          >
            Role
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              {...register("role")}
            >
              <option>Student</option>
              <option>Moderator</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center -mx-3 mb-6">
        <button
          className="shadow bg-[#f97316] hover:bg-[#c2410c] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-6"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
