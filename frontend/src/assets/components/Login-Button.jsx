import React from "react";
import { useGlobalContext } from "./context";
import { useNavigate } from "react-router-dom";

const LoginBtn = () => {
  const { submitLogout, update_form_btn, currentUser } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    submitLogout();
    navigate("/");
  };

  if (currentUser) {
    return (
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
      >
        Log out
      </button>
    );
  }

  return (
    <button
      id="form_btn"
      onClick={update_form_btn}
      className="px-8 py-4 text-lg rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all bg-blue-600 hover:bg-blue-700 text-white font-bold"
    >
      Register / Login
    </button>
  );
};

export default LoginBtn;
