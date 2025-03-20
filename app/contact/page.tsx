"use client";
import Image from "next/image";
import { useRef, FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";

const ContactSection = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    if (form.current) {
      emailjs
        .sendForm(
          "hacker_darknet",
          "template_o9h0ciu",
          form.current,
          "v_7iqYodBjsySy5nq"
        )
        .then(
          () => {
            setMessage("Xabaringiz muvaffaqiyatli yuborildi!");
            setIsSending(false);
            form.current?.reset();
          },
          () => {
            setMessage("Xatolik yuz berdi. Iltimos qayta urinib ko‘ring.");
            setIsSending(false);
          }
        );
    }
  };

  return (
    <section className="bg-[url('/Home.svg')] w-full min-h-screen bg-center py-16 px-4 md:px-16">
      <h2 className="text-3xl font-bold mb-2 text-white text-center md:text-left">Bog'lanish</h2>
      <div className="w-24 border-b-4 border-blue-600 mb-10 mx-auto md:mx-0"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          {
            icon: "/gmail.svg",
            title: "E-pochta",
            content: "ulugbeknizomov999@gmail.com",
          },
          {
            icon: "/telegram.svg",
            title: "Telegram",
            content: <Link href="https://t.me/nizomov_official" className="hover:text-blue-400 underline">t.me/nizomov_official</Link>,
          },
          {
            icon: "/phone.svg",
            title: "Telefon raqam",
            content: "+998 (91) 911-91-91",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-[#111] to-[#0e0e0e] p-10 rounded-2xl text-center shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={40}
              height={40}
              className="mx-auto mb-4"
            />
            <h4 className="font-semibold text-white text-lg mb-1">{item.title}</h4>
            <p className="text-gray-400">{item.content}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-2 text-white text-center md:text-left">So‘rov yuborish</h2>
      <div className="w-24 border-b-4 border-blue-600 mb-8 mx-auto md:mx-0"></div>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="bg-gradient-to-br from-[#111] to-[#0e0e0e] p-8 rounded-2xl space-y-6 shadow-2xl"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="user_name"
            placeholder="Ismingiz"
            className="flex-1 bg-transparent border border-gray-600 px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="Email manzil"
            className="flex-1 bg-transparent border border-gray-600 px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            required
          />
          <select
            name="contact_method"
            className="bg-transparent border border-gray-600 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          >
            <option className="bg-black">E-pochta</option>
            <option className="bg-black">Telefon</option>
            <option className="bg-black">Telegram</option>
          </select>
        </div>
        <textarea
          name="message"
          placeholder="Xabaringizni yozing..."
          className="w-full bg-transparent border border-gray-600 px-4 py-3 rounded-lg text-white placeholder-gray-400 h-32 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
          disabled={isSending}
        >
          {isSending ? "Yuborilmoqda..." : "Yuborish"}
        </button>
        {message && (
          <p className="text-green-400 mt-4 text-center">{message}</p>
        )}
      </form>
    </section>
  );
};

export default ContactSection;
