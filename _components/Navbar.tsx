"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full bg-gradient-to-r from-black via-[#0f0f0f] to-black shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              width={50}
              height={50}
              className="rounded-full border-2 border-dashed border-blue-400 hover:rotate-6 transition-transform duration-300 cursor-pointer"
              src="/Logo.jpg"
              alt="logo"
            />
          </Link>
          <span className="text-white text-xl font-bold hidden sm:inline ">
            Ulug'bek Dev
          </span>
        </div>

        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          {[
            { name: "Bosh sahifa", path: "/" },
            { name: "Haqida", path: "/about" },
            { name: "Loyihalar", path: "/projects" },
            { name: "Bog'lanish", path: "/contact" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className="relative text-gray-300 hover:text-blue-400 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-blue-400 hover:before:w-full before:transition-all before:duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-2xl hover:text-blue-400 transition-all duration-300"
        >
          <FaGithub />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
