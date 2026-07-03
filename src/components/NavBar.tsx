"use client";
import Link from "next/link";
import React, { useState } from "react";

const NavBar = ({ className }: { className: string }) => {
  const [active, setActive] = useState<string | null>(null);
  const [ham, setHam] = useState<boolean>(false);
  const header = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "About",
      path: "/about"
    },
    {
      name: "Blogs",
      path: "/blogs"
    },
    {
      name: "Post Blog",
      path: "/post-blog"
    }
  ];
  return (
    <div
      className={`rounded-full fixed top-10 text-white z-50 lg:max-w-[1000px] inset-x-0 mx-5 sm:mx-10 lg:mx-auto shadow-[0_0_10px] shadow-neon-blue p-[2px] bg-border-gradient`}
    >
      <div
        className={`top-10 bg-night/90 flex justify-between items-center rounded-full  w-full px-10  py-5 inset-x-0 mx-auto `}
      >
        <h1 className=" text-2xl font-bold ">Blog App </h1>

        <nav className="text-md flex gap-2 md:gap-5 lg:gap-15 hidden md:flex">
          {header.map((e, index) => (
            <Link
              href={e.path}
              key={index}
              className=" hover:text-glow transition-colors duration-400"
            >
              {e.name}{" "}
            </Link>
          ))}
        </nav>

        {/* smaller screens */}
        <div className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu-icon lucide-menu "
            onClick={() => setHam(true)}
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </div>
      </div>

      {/* sidebar */}
      <div
        className={`fixed top-0 right-0 left-0 rounded-lg z-50 transition-all duration-800 pb-[1px] bg-border-gradient ease-in-out shadow-neon-blue shadow-[0_0_20px] ${ham ? "" : "invisible bottom-200"}`}
      ><div
          className={`w-full h-full bg-night/90 flex flex-col justify-between items-center pb-10 rounded-b-lg   w-full px-8 pt-8  inset-x-0  `}
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x-icon lucide-x "
          onClick={() => setHam(false)}
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
        
          <div className="w-full py-8 mt-4 flex flex-col justify-center item-center gap-10 flex justify-center items-center text-4xl gap-5 px-4">
            {header.map((e, index) => (
              <Link
                href={e.path}
                key={index}
                className=" hover:text-glow transition-colors duration-400"
                onClick={() => setHam(false)}
              >
                {e.name}{" "}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
