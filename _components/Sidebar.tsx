"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaEnvelope,
  FaGithub,
  FaTelegram,
  FaPhone,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

type ContactItemProps = {
  icon: React.ReactNode;
  title: string;
  info: string;
};

const ContactItem: React.FC<ContactItemProps> = ({ icon, title, info }) => {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800 transition-colors duration-300 cursor-pointer group">
      <div className="text-xl">{icon}</div>
      <div className="flex-1">
        <p className="text-xs text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </p>
        <p className="text-sm break-words">{info}</p>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`${
        isOpen ? "w-80" : "w-16"
      } transition-all duration-500 bg-[#111111] relative overflow-hidden border-r border-gray-800 flex flex-col pt-20 pb-4 text-white`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-6 -right-4 z-50 bg-[#111111] p-2 rounded-full shadow-xl border border-gray-700 hover:bg-[#222222] transition-all duration-300"
      >
        {isOpen ? <FaChevronLeft size={16} /> : <FaChevronRight size={16} />}
      </button>

      <div
        className={`flex flex-col items-center ${
          isOpen ? "p-6" : "p-3"
        } space-y-4`}
      >
        <Image
          src="/logo.jpg"
          alt="logo"
          width={isOpen ? 100 : 40}
          height={isOpen ? 100 : 40}
          className="rounded-full border-4 border-blue-400 transition-all duration-300"
        />

        {isOpen && (
          <>
            <h2 className="text-xl font-bold tracking-wide text-center">
              Nizomov U.
            </h2>

            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Web dasturchi",
                "Dizayner",
                "Junior",
                "AI bot",
                "Web333",
                "Manager",
              ].map((tag, i) => (
                <span
                  key={i}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-xs rounded-full shadow hover:scale-105 cursor-pointer transition-transform duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 w-full space-y-3">
              <ContactItem
                icon={<FaEnvelope className="text-red-500" />}
                title="E-pochta"
                info="ulugbeknizomov999@gmail.com"
              />
              <ContactItem
                icon={<FaGithub className="text-gray-300" />}
                title="Github"
                info="https://github.com/webw1zard"
              />
              <ContactItem
                icon={<FaTelegram className="text-blue-400" />}
                title="Telegram"
                info="https://t.me/nizomov_official"
              />
              <ContactItem
                icon={<FaPhone className="text-green-500" />}
                title="Telefon raqam"
                info="+998 (91) 911 91 91"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
