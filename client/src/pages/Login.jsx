/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password || (currentState === "Sign Up" && !name)) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      let response;

      if (currentState === "Sign Up") {
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name: name.trim(),
          email: email.trim(),
          password,
        });
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email: email.trim(),
          password,
        });
      }

      if (response.data.success) {
        const token = response.data.token;

        // Save token properly
        localStorage.setItem("token", token);
        setToken(token);

        toast.success(
          currentState === "Login"
            ? "Logged in successfully"
            : "Account created successfully"
        );

        // Clear fields
        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Something went wrong, try again"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 bg-white p-6 rounded-xl shadow-md"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign Up" && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-black/70"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter Name"
          required
        />
      )}

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-black/70"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter Email"
        required
      />

      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-black/70"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter Password"
        required
      />

      <div className="w-full flex justify-between text-sm -mt-2">
        {currentState === "Login" && (
          <p className="text-gray-500 cursor-pointer hover:text-black">
            Forgot your password?
          </p>
        )}

        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="text-gray-500 cursor-pointer hover:text-black"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="text-gray-500 cursor-pointer"
          >
            Have an account already?{" "}
            <span className="text-gray-900 font-medium">Login here</span>
          </p>
        )}
      </div>

      <button
        disabled={loading}
        className={`w-full font-light py-2 px-3 rounded-md transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:opacity-90"
        }`}
      >
        {loading
          ? "Please wait..."
          : currentState === "Login"
          ? "Sign In"
          : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
