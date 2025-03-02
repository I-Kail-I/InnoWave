"use client";
import { useState } from "react";
import { account, databases } from "../appwrite.js";
import Link from "next/link";
import React from "react";
import { FaGoogle, FaGithub, FaApple } from "react-icons/fa";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const checkUserExists = async (username) => {
    try {
      const users = await databases.listDocuments(
        "your-database-id",
        "your-collection-id"
      );
      return users.documents.some((user) => user.username === username);
    } catch (e) {
      console.error("Error checking user:", e);
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userExists = await checkUserExists(username);
      if (!userExists) {
        setError("User not found. Please sign up first.");
        return;
      }

      await account.createEmailPasswordSession(username, password);
      setUsername("");
      setPassword("");
      setError("");
    } catch (e) {
      setError(e.message);
      console.error(e);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const redirectUrl = `${window.location.origin}/home`;
      await account.createOAuth2Session("google", redirectUrl, redirectUrl);

      const user = await account.get();

      const users = await databases.listDocuments(
        "your-database-id",
        "your-collection-id",
        [Query.equal("email", user.email)]
      );

      // If user doesn't exist, create new user document
      if (users.documents.length === 0) {
        await databases.createDocument(
          "your-database-id",
          "your-collection-id",
          ID.unique(),
          {
            email: user.email,
            name: user.name,
            username: user.name.toLowerCase().replace(/\s+/g, "_"),
            oauth_provider: "google",
          }
        );
      }
    } catch (e) {
      console.error("OAuth error:", e);
      setError("Failed to connect with Google");
    }
  };

  return (
    <div className="Container min-h-screen flex items-center justify-center p-4">
      <div className="cardLogin shadow-lg shadow-gray-900 p-10 rounded-lg w-full max-w-md">
        <div className="header text-center">
          <h1 className="text-2xl font-normal">Sign in to your account</h1>
          <p className="text-xl text-gray-600">
            Welcome back! Please enter your details
          </p>
        </div>

        <div className="formInput mt-12 w-full">
          <form onSubmit={handleLogin}>
            {error && (
              <div className="text-red-500 text-sm mb-4 text-center">
                {error}
              </div>
            )}

            <div className="usernameInput flex flex-col">
              <h1>Username</h1>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="outline-1 outline-gray-300 rounded-md mt-2 ms-2 p-2 ps-3 placeholder-gray-400 text-black hover:outline-gray-800 focus:outline-gray-800 duration-300"
              />
            </div>

            <div className="passwordInput flex flex-col mt-5">
              <h1>Password</h1>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="outline-1 outline-gray-300 rounded-md mt-2 ms-2 p-2 ps-3 placeholder-gray-400 text-black hover:outline-gray-800 focus:outline-gray-800 duration-300"
              />
            </div>

            <div className="underInputSection mt-6 flex justify-between">
              <div className="checkboxPart flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="ms-2 cursor-pointer w-5 h-4 "
                />
                <label
                  htmlFor="rememberMe"
                  className="cursor-pointer text-gray-900 font-normal ms-1"
                >
                  Remember me
                </label>
              </div>

              <div className="forgotPassword">
                <Link href="/forget-password" className="font-semibold">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="submitButton flex mt-5 w-full">
              <button
                type="submit"
                className="w-full bg-black text-white h-10 rounded-lg hover:bg-cyan-950 cursor-pointer duration-300"
              >
                Login
              </button>
            </div>

            <div className="footerSection mt-10">
              <div className="continueText flex w-full justify-between items-center">
                <hr className="w-full" />
                <p className="text-center w-full text-gray-500 px-1">
                  or continue with
                </p>
                <hr className="w-full" />
              </div>

              <div className="loginOption flex justify-center mt-5 gap-x-5">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="google px-10 border border-gray-300 rounded-lg p-3 hover:bg-gray-400 cursor-pointer duration-300"
                >
                  <FaGoogle size={20} />
                </button>

                <button
                  type="button"
                  className="apple px-10 border border-gray-300 rounded-lg p-3 hover:bg-gray-400 cursor-pointer duration-300"
                >
                  <FaApple size={20} />
                </button>

                <button
                  type="button"
                  className="github px-10 border border-gray-300 rounded-lg p-3 hover:bg-gray-400 cursor-pointer duration-300"
                >
                  <FaGithub size={20} />
                </button>
              </div>

              <div className="signUpLink text-center mt-5">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/signUp" className="font-semibold text-black">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
