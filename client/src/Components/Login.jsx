import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = () => {
    console.log(form);
    if(form.username === "admin" && form.password === "admin"){
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  }


  return (
    <div className="flex justify-center items-center h-screen z-10">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e) => {setForm({ ...form, username: e.target.value });}}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => {setForm({ ...form, password: e.target.value });}}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-purple-800 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-purple-800 text-xs">
          &copy;SaysVed Project. All rights reserved.
        </p>
      </div>
    </div>
  );
}
