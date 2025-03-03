"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Home, PanelLeftClose, PanelLeftOpen, User } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const path = usePathname();
  if (path === "") {
    return null;
  } else {
    return <SidebarComponent />;
  }
}

export function SidebarComponent() {
  const [navbarExpand, setNavbarexpand] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  return (
    <nav>
      {/* Light Blurred Background */}
      <AnimatePresence>
        {navbarExpand && (
          <motion.div
            className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNavbarexpand(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className="min-h-screen flex justify-center w-45 bg-white shadow-2xl fixed md:left-0 md:top-15 top-0 left-0 z-30"
        initial={{ x: "-100%" }}
        animate={{ x: navbarExpand ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Toggle Button Inside Sidebar */}
        <motion.button
          className="absolute -right-15 md:top-4 top-2 p-2 bg-white rounded-full shadow-lg z-40 hover:bg-gray-400 duration-200 cursor-pointer"
          onClick={() => setNavbarexpand(!navbarExpand)}
          initial={{ x: 0 }}
          animate={{ x: navbarExpand ? -10 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {navbarExpand ? (
            <PanelLeftClose size={24} />
          ) : (
            <PanelLeftOpen size={24} />
          )}
        </motion.button>

        <ul className="flex flex-col text-center w-full">
          <li>
            <Link
              href="user-page"
              target="_parent"
              className="cursor-pointer"
              passHref
            >
              <motion.div
                className="w-full py-2 cursor-pointer flex justify-center relative"
                whileHover={{
                  backgroundColor: "#aeb0b5",
                }}
                onClick={() => setActiveItem("user")}
                transition={{
                  type: "keyframes",
                  stiffness: 100,
                  duration: 0.3,
                }}
              >
                {activeItem === "user" && (
                  <motion.div
                    layoutId="highlight"
                    className="absolute inset-0 bg-[#aeb0b5]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <User size={20} className="me-1 z-10" />
                <button className="cursor-pointer me-2.5 z-10">User</button>
              </motion.div>
            </Link>
          </li>

          <li>
            <Link href="/" target="_parent" className="cursor-pointer" passHref>
              <motion.div
                className="w-full py-2 cursor-pointer flex justify-center relative"
                whileHover={{
                  backgroundColor: "#aeb0b5",
                }}
                onClick={() => setActiveItem("home")}
                transition={{
                  type: "keyframes",
                  stiffness: 100,
                  duration: 0.3,
                }}
              >
                {activeItem === "home" && (
                  <motion.div
                    layoutId="highlight"
                    className="absolute inset-0 bg-[#aeb0b5]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Home strokeWidth={1.8} size={20} className="me-1 z-10" />
                <button className="cursor-pointer z-10">Home</button>
              </motion.div>
            </Link>
          </li>

          <li>
            <Link href="/weather">
              <motion.div
                className="w-full py-2 cursor-pointer flex justify-center relative"
                whileHover={{
                  backgroundColor: "#aeb0b5",
                }}
                onClick={() => setActiveItem("weather")}
                transition={{
                  type: "keyframes",
                  stiffness: 100,
                  duration: 0.3,
                }}
              >
                {activeItem === "weather" && (
                  <motion.div
                    layoutId="highlight"
                    className="absolute inset-0 bg-[#aeb0b5]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Cloud strokeWidth={2} size={20} className="me-1 z-10 ms-3" />
                <button className="cursor-pointer z-10">Weather</button>
              </motion.div>
            </Link>
          </li>
        </ul>
      </motion.div>
    </nav>
  );
}
