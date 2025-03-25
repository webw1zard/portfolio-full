"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-30 bg-gradient-to-r from-black via-[#0f0f0f] to-black shadow-lg backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full border-2 border-dashed border-blue-400 hover:rotate-6 transition-transform duration-300 cursor-pointer"
            />
          </Link>
          <span className="text-white text-xl font-bold hidden sm:inline">
            Ulug'bek Dev
          </span>
        </div>
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
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
        </nav>
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-blue-400 transition-all duration-300"
          >
            <FaGithub />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <FaChevronLeft size={24} />
            ) : (
              <FaChevronRight size={24} />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur fixed inset-0 flex flex-col items-center justify-center space-y-8 text-white text-xl z-40 animate-fade-in">
          {[
            { name: "Bosh sahifa", path: "/" },
            { name: "Haqida", path: "/about" },
            { name: "Loyihalar", path: "/projects" },
            { name: "Bog'lanish", path: "/contact" },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-400 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
