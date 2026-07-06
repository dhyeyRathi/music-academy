"use client";
import Link from "next/link";
import React, { useState } from "react";

const NavBar = ({ className }: { className: string }) => {
  const [ham, setHam] = useState<boolean>(false);
  const header = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Post Blog", path: "/post-blog" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E2D5] bg-[#FAF7F2]/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-[#1C1917] hover:text-[#B89A6C] transition-colors duration-300">
          Blog <span className="font-light text-[#B89A6C]">App</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {header.map((e, index) => (
            <Link
              href={e.path}
              key={index}
              className="text-sm font-medium text-[#57534E] hover:text-[#1C1917] relative py-2 transition-colors duration-300 group"
            >
              {e.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B89A6C] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setHam(true)}
            className="p-2 text-[#1C1917] hover:text-[#B89A6C] transition-colors"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {ham && (
        <div className="fixed inset-0 z-50 bg-[#FAF7F2]/98 flex flex-col p-6 animate-fade-in md:hidden">
          <div className="flex justify-between items-center h-20 px-2">
            <Link href="/" className="text-2xl font-bold tracking-tight text-[#1C1917]" onClick={() => setHam(false)}>
              Blog <span className="font-light text-[#B89A6C]">App</span>
            </Link>
            <button
              onClick={() => setHam(false)}
              className="p-2 text-[#1C1917] hover:text-[#B89A6C] transition-colors"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center gap-8 pb-20">
            {header.map((e, index) => (
              <Link
                href={e.path}
                key={index}
                className="text-2xl font-semibold text-[#57534E] hover:text-[#B89A6C] transition-colors duration-300"
                onClick={() => setHam(false)}
              >
                {e.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
