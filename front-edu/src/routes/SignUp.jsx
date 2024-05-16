import React from "react";
import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <main>
      <div className="w-full min-h-screen flex flex-col justify-center items-center p-8 gap-6 bg-[#fbfaf9]">
        <h1 className="text-3xl font-bold text-orange-500">Registrate</h1>
        <SignUpForm />
        <Link className="text-orange-500" to="/login">
          Iniciar sesion
        </Link>
      </div>
    </main>
  );
};

export default SignUp;
