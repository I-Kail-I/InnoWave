"use client";
import { useState } from "react";
import { account, databases, ID } from "../appwrite.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaGoogle, FaGithub, FaApple } from "react-icons/fa";

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const createUser = async (e) => {
    e.preventDefault();
    try {
      // Create user account
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );

      if (userAccount) {
        // Store additional user data in database
        await databases.createDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_COLLECTION_ID,
          ID.unique(),
          {
            userId: userAccount.$id,
            email: email,
            username: username,
            firstName: firstName,
            lastName: lastName,
          }
        );

        // Create session for the new user
        await account.createEmailSession(email, password);

        // Clear form
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setError("");

        // Redirect to home page
        router.push("/home");
      }
    } catch (e) {
      if (e.message.includes("already exists")) {
        setError("An account with this email already exists");
      } else {
        setError("Error creating account: " + e.message);
      }
      console.error("Sign up error:", e);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const redirectUrl = `${window.location.origin}/home`;
      await account.createOAuth2Session("google", redirectUrl, redirectUrl);
    } catch (e) {
      console.error("OAuth error:", e);
      setError("Failed to connect with Google");
    }
  };

  return (
    <div className="Container min-h-screen flex items-center justify-center p-4">
      <div className="cardLogin shadow-lg shadow-gray-900 p-10 rounded-lg w-full max-w-md">
        <div className="header text-center">
          <h1 className="text-2xl font-normal">Create your account</h1>
          <p className="text-xl text-gray-600">
            Please enter your details to sign up
          </p>
        </div>

        <div className="formInput mt-12 w-full">
          <form onSubmit={createUser}>
            {error && (
              <div className="text-red-500 text-sm mb-4 text-center">
                {error}
              </div>
            )}

            <div className="flex gap-4 w-full">
              <div className="nameInput flex flex-col flex-1">
                <h1>First Name</h1>
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="outline-1 outline-gray-300 rounded-md mt-2 p-2 ps-3 placeholder-gray-400 text-black hover:outline-gray-800 focus:outline-gray-800 duration-300 w-full"
                />
              </div>

              <div className="nameInput flex flex-col flex-1">
                <h1>Last Name</h1>
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="outline-1 outline-gray-300 rounded-md mt-2 p-2 ps-3 placeholder-gray-400 text-black hover:outline-gray-800 focus:outline-gray-800 duration-300 w-full"
                />
              </div>
            </div>

            <div className="usernameInput flex flex-col mt-5">
              <h1>Username</h1>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="outline-1 outline-gray-300 rounded-md mt-2 ms-2 p-2 ps-3 placeholder-gray-400 text-black hover:outline-gray-800 focus:outline-gray-800 duration-300"
              />
            </div>

            <div className="emailInput flex flex-col mt-5">
              <h1>Email</h1>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <div className="submitButton flex mt-8 w-full">
              <button
                type="submit"
                className="w-full bg-black text-white h-10 rounded-lg hover:bg-cyan-950 cursor-pointer duration-300"
              >
                Sign up
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
                  onClick={handleGoogleSignUp}
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

              <div className="signInLink text-center mt-5">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link href="/signIn" className="font-semibold text-black">
                    Sign in
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
