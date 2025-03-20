import Image from "next/image";

export default function TelegramBanner() {
  return (
    <div className="flex items-center bg-[#1c1c1c] rounded-lg p-4 gap-4 max-w-xl shadow-lg">
      <div className="bg-[#2a3b4c] p-4 rounded-lg">
        <Image
          src="/tg.svg"
          alt="Telegram icon"
          width={40}
          height={40}
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <h3 className="text-white font-bold text-lg">Telegram kanal</h3>
        <p className="text-gray-300 text-sm mb-2">
          Barcha loyihalarimni telegram kanalımda ham kuzatib borishingiz
          mumkin!
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded">
          Taʼshrif buyurish
        </button>
      </div>

      <div className="hidden md:block">
        <Image src="/me.png" alt="Megaphone" width={70} height={70} />
      </div>
    </div>
  );
}
