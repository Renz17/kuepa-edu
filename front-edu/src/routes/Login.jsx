// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import LogInForm from "../components/LogInForm";

const Login = () => {
  return (
    <main>
      <div className="w-full min-h-screen flex flex-col justify-center items-center p-8 gap-6 bg-[#fbfaf9]">
        <h1 className="text-3xl font-bold text-orange-500	">Kuepa Edu</h1>
        <LogInForm />
        <Link className="text-orange-500" to="/sign-up">
          No tienes cuenta? Crea una. 
        </Link>
      </div>
    </main>
  );
};

export default Login;
