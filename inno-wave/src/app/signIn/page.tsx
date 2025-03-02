import Link from "next/link";
import React from "react";
import { FaGoogle, FaGithub, FaApple } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="Container min-h-screen flex items-center justify-center">
      <div className="cardLogin shadow-lg shadow-gray-900 p-10 rounded-lg">
        {/* header */}
        <div className="header text-center">
          <h1
            className="text-2xl font-normal"
            style={{ fontFamily: "sans-serif" }}
          >
            Sign in to your acount
          </h1>
          <p className="text-xl text-gray-600">
            Welcome back! Please enter you details
          </p>
        </div>

        {/* form */}
        <div className="formInput mt-12">
          <form action="">
            {/* Input */}
            <div className="emailInput flex flex-col">
              <h1>Email</h1>
              <input
                type="email"
                placeholder="Enter your email"
                className="outline-1 outline-gray-300 rounded-md mt-2 ms-2 p-2 ps-3 placeholder-gray-400 text-black hover:outline-gray-800 focus:outline-gray-800 duration-200"
              />
            </div>

            <div className="emailInput flex flex-col mt-5">
              <h1>Passowrd</h1>
              <input
                type="password"
                placeholder="Enter your password"
                className="outline-1 outline-gray-300 rounded-md mt-2 ms-2 p-2 ps-3 placeholder-gray-400 text-black hover:outline-gray-800 focus:outline-gray-800 duration-200"
              />
            </div>

            {/* below input */}
            <div className="underInputSection mt-6 flex justify-between">
              <div className="checkboxPart flex">
                <input
                  type="checkbox"
                  name="rememberMe"
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
                <Link href="#" passHref>
                  <p className="font-semibold">Forgot password?</p>
                </Link>
              </div>
            </div>

            {/* submit button */}
            <div className="submitButton flex mt-5 text-center">
              <button
                type="submit"
                className="w-90 bg-black text-white h-10 rounded-lg hover:bg-cyan-700 cursor-pointer duration-300"
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
                <button className="google px-10 border border-gray-300 rounded-lg p-3 hover:bg-gray-100 duration-200">
                  <FaGoogle size={20} />
                </button>

                <button className="apple px-10 border border-gray-300 rounded-lg p-3 hover:bg-gray-100 duration-200">
                  <FaApple size={20} />
                </button>

                <button className="github px-10 border border-gray-300 rounded-lg p-3 hover:bg-gray-100 duration-200">
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
