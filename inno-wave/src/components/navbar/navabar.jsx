"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IoIosSearch, IoIosSettings } from "react-icons/io";
import { motion as Motion } from "framer-motion";
import Link from "next/link";
import Logo from "../../../public/logo.png"
import Image from "next/image";

export default function Navbar() {
  const path = usePathname();
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (path === "/signIn" || path === "/signUp" || windowWidth < 768) {
    return null; 
  }

  return <TheNavbar />;
}

export function TheNavbar() {
  return (
    <header className="navbarContainer w-screen fixed top-0 m flex h-15 items-center shadow-md z-50 bg-white">
      <ul className="w-full ms-10 me-15 flex justify-between items-center">
        <li className="">
          <Link href="/" className="flex justify-center items-center">
          <Image src={Logo} alt="Logo" width={40}/>
            <h1
              className="font-semibold text-lg ms-1"
              style={{ fontFamily: "unset" }}
            >
              Inno Wave
            </h1>
          </Link>
        </li>

        <li>
          <ul className="flex gap-x-9">
            <li className="flex items-center">
              <IoIosSearch size={25} className="absolute text-gray-400 ms-1 " />
              <input
                type="text"
                name="searchRegion"
                placeholder="country"
                className="outline-1 outline-gray-400 rounded-md p-1.5 ps-8 placeholder:text-gray-500 text-black hover:outline-black focus:outline-black duration-200"
              />
            </li>

            <li>
              <Motion.button
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 1, type: "spring", stiffness: 30 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="cursor-pointer"
              >
                <IoIosSettings
                  size={30}
                  className="mt-1 text-gray-500 hover:text-black duration-200"
                />
              </Motion.button>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
}
