"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Home.svg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="animate-zoom"
        />
      </div>

      <div className="absolute before:absolute before:w-72 before:h-72 before:bg-gradient-to-br before:from-blue-500 before:to-purple-600 before:rounded-full before:blur-3xl before:opacity-30 before:-top-20 before:-left-20 after:absolute after:w-72 after:h-72 after:bg-gradient-to-tr after:from-indigo-500 after:to-pink-500 after:rounded-full after:blur-3xl after:opacity-30 after:-bottom-20 after:-right-20 z-0"></div>

      <div className="relative z-10 text-white px-4 animate-fade-up">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 relative inline-block">
          Assalomu alaykum, Men <br />
          <span className="text-blue-500 relative animate-glow">
            Nizomov Ulug'bek
            <span className="absolute left-0 top-0 w-full h-full animate-shine"></span>
          </span>
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto mb-8 animate-fade-up delay-200">
          Veb dasturchi va dizayner sifatida natijaga yo‘naltirilgan ishchi.
          Veb-saytlar va veb-ilovalarni yaratish va boshqarish orqali umumiy
          mahsulot muvaffaqiyatiga erishish maqsadimdir.
        </p>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-transform duration-300 px-8 py-3 rounded-xl text-white font-semibold shadow-lg animate-fade-up delay-400">
          Loyihalarimni ko‘rish
        </button>
      </div>

      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <style jsx>{`
        .animate-zoom {
          animation: zoomIn 20s ease-in-out infinite alternate;
        }

        @keyframes zoomIn {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.05);
          }
        }

        .animate-fade-up {
          animation: fadeUp 1s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        .animate-fade-up.delay-200 {
          animation-delay: 0.2s;
        }
        .animate-fade-up.delay-400 {
          animation-delay: 0.4s;
        }
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-glow {
          text-shadow: 0 0 8px rgba(59, 130, 246, 0.8);
          position: relative;
          overflow: hidden;
        }

        .animate-shine {
          content: "";
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          animation: shine 2.5s infinite;
        }

        @keyframes shine {
          to {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
