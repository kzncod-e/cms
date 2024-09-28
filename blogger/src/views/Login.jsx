import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Toastify from "toastify-js";

const Login = ({ url }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleLogin(event) {
    event.preventDefault();
    try {
      let { data } = await axios.post(`${url}/apis/login`, { email, password });
      localStorage.setItem("token", data.data.access_token);
      console.log(data.data.access_token);

      navigate("/");
      Toastify({
        text: "Success Login",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } catch (error) {
      console.log(error);

      // Toastify({
      //   text: error.response.data.error,
      //   duration: 2000,
      //   newWindow: true,
      //   close: true,
      //   gravity: "bottom",
      //   position: "right",
      //   stopOnFocus: true,
      //   style: {
      //     background: "#00B29F",
      //     color: "#17202A",
      //     boxShadow: "0 5px 10px black",
      //     fontWeight: "bold",
      //   },
      // }).showToast();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className=" bg-opacity-10 p-8 rounded-lg shadow-lg w-96">
        <div className="flex mb-6">
          <h2 className="text-2xl font-bold text-white mr-4">SIGN IN</h2>
          <h2 className="text-2xl font-bold text-gray-400">SIGN UP</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="USERNAME"
              className="w-full bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 pb-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="PASSWORD"
              className="w-full bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 pb-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="keepSignedIn"
              className="mr-2 accent-blue-500"
            />
            <label htmlFor="keepSignedIn" className="text-white text-sm">
              Keep me Signed in
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300">
            login
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-gray-400 text-sm hover:text-white">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
