"use client";
import { useState } from "react";
import { account, ID } from "@/app/appwrite";
import Link from "next/link";
import React from "react";
import { FaGoogle, FaGithub, FaApple } from "react-icons/fa";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.createSession(email, password);
      setEmail("");
      setPassword("");
      setError("");
    } catch (e: Error) {
      setError(e.message);
      console.error(e);
    }
  };

  // Add new Google OAuth handler
  const handleGoogleLogin = async () => {
    try {
      await account.createOAuth2Session(
        "google",
        "http://localhost:3000/dashboard", // Success URL
        "http://localhost:3000/signIn" // Failure URL
      );
    } catch (e) { 
      console.error("OAuth error:", e);
      setError("Failed to connect with Google");
    }
  };

  return (
    <div className="Container min-h-screen flex items-center justify-center p-4">
      <div className="cardLogin shadow-lg shadow-gray-900 p-10 rounded-lg w-full max-w-md">
        {/* header */}
        <div className="header text-center">
          <h1 className="text-2xl font-normal">Sign in to your account</h1>
          <p className="text-xl text-gray-600">
            Welcome back! Please enter your details
          </p>
        </div>

        {/* form */}
        <div className="formInput mt-12 w-full">
          <form onSubmit={handleLogin}>
            {error && (
              <div className="text-red-500 text-sm mb-4 text-center">
                {error}
              </div>
            )}

            {/* Input */}
            <div className="emailInput flex flex-col">
              <h1>Email</h1>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-1 outline-gray-300 rounded-md mt-2 ms-2 p-2 ps-3 placeholder-gray-400 text-black hover:outline-gray-800 focus:outline-gray-800 duration-200"
              />
            </div>

            <div className="passwordInput flex flex-col mt-5">
              <h1>Password</h1>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="outline-1 outline-gray-300 rounded-md mt-2 ms-2 p-2 ps-3 placeholder-gray-400 text-black hover:outline-gray-800 focus:outline-gray-800 duration-200"
              />
            </div>

            {/* below input */}
            <div className="underInputSection mt-6 flex justify-between">
              <div className="checkboxPart flex">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="ms-2 cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="ms-2 cursor-pointer text-gray-900 font-normal"
                >
                  Remember me
                </label>
              </div>

              <div className="forgotPassword">
                <Link href="#" className="font-semibold">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* submit button */}
            <div className="submitButton flex mt-5 w-full">
              <button
                type="submit"
                className="w-full bg-black text-white h-10 rounded-lg hover:bg-cyan-950 cursor-pointer duration-300"
              >
                Sign in
              </button>
            </div>

            {/* footer */}
            <div className="footerSection mt-10">
              <div className="continueText flex w-full justify-between items-center">
                <div className="firstLine flex-nowrap w-full">
                  <hr className="w-full" />
                </div>

                <div className="text flex-nowrap w-full">
                  <p className="text-center w-full text-gray-500 px-1">
                    or continue with
                  </p>
                </div>

                <div className="secondLine flex-nowrap w-full">
                  <hr className="w-full" />
                </div>
              </div>

              <div className="loginOption flex justify-center mt-5 gap-x-5">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="google px-10 border border-gray-300 rounded-lg p-3 hover:bg-gray-400 cursor-pointer duration-200"
                >
                  <FaGoogle size={20} />
                </button>

                <button
                  type="button"
                  className="apple px-10 border border-gray-300 rounded-lg p-3 hover:bg-gray-400 cursor-pointer duration-200"
                >
                  <FaApple size={20} />
                </button>

                <button
                  type="button"
                  className="github px-10 border border-gray-300 rounded-lg p-3 hover:bg-gray-400 cursor-pointer duration-200"
                >
                  <FaGithub size={20} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
