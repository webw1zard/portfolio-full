import Image from "next/image";
import Link from "next/link";

export default function About() {
  const tools: string[] = [];
  const clients: string[] = [];

  return (
    <div className="relative bg-black text-white px-6 md:px-20 py-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Home.svg"
          alt="background"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-4xl font-extrabold text-blue-500">Men haqimda</h2>
        <p className="text-lg leading-relaxed text-gray-300">
          Men Nizomov Ulug'bek, veb dasturchiman. Yoshim 16 da va Buxoro
          viloyati Kogon shahrida tug‘ilganman. Qiziqarli, ko‘p funksionallikka
          ega va kuchli dizaynga ega bo‘lgan dasturlar yaratishga qiziqaman.
        </p>
        <p className="text-lg leading-relaxed text-gray-300">
          Mening vazifam - foydalanuvchilarga qulay, tezkor va jalb qiluvchi veb
          saytlar ishlab chiqish hamda ularni moslashuvchan kodlar bilan
          yaratishdir.
        </p>
        <p className="text-lg leading-relaxed text-gray-300">
          Agar loyihalarim sizga qiziq bo‘lsa,{" "}
          <Link
            href="/projects"
            className="text-blue-400 underline hover:text-blue-500"
          >
            Loyihalar
          </Link>{" "}
          sahifasiga tashrif buyurishingiz mumkin :)
        </p>
        <Link
          href="/contact"
          className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-md text-white font-semibold transition"
        >
          Bog‘lanish
        </Link>
      </div>

      <div className="max-w-5xl mx-auto mt-16 space-y-6">
        <h2 className="text-3xl font-bold text-blue-500">Asbob-uskunalar</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {tools.length > 0 ? (
            tools.map((tool, idx) => (
              <div
                key={idx}
                className="bg-[#0e0e0e] rounded-xl flex items-center justify-center p-4 hover:scale-105 transition shadow-md"
              >
                <Image src={tool} alt={`tool-${idx}`} width={50} height={50} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-400">
              Hozircha asbob-uskunalar yo‘q
            </p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-16 space-y-6">
        <h2 className="text-3xl font-bold text-blue-500">
          Men nimalar qila olaman
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "SEO",
              desc: "Qidiruv tizimining natijalarida sayt reytingini yaxshilash",
              icon: "/seo.svg",
            },
            {
              title: "Dizayn",
              desc: "Kuchli dizayn va kichik detallargacha e'tibor berish",
              icon: "/diz.svg",
            },
            {
              title: "Sifat",
              desc: "Yuqori darajada saytlarni sifatli ishlab chiqish",
              icon: "/quality.svg",
            },
            {
              title: "Tezkorlik",
              desc: "Qisqa muddat ichida tezkor sayt ishlab chiqish",
              icon: "/speed.svg",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0e0e0e] p-5 rounded-xl flex items-start gap-4 hover:scale-[1.02] transition shadow-md"
            >
              <Image src={item.icon} alt={item.title} width={50} height={50} />
              <div>
                <h4 className="font-semibold text-lg mb-1 text-white">
                  {item.title}
                </h4>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-16 space-y-6">
        <h2 className="text-3xl font-bold text-blue-500">Mijozlar</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clients.length > 0 ? (
            clients.map((client, idx) => (
              <div
                key={idx}
                className="bg-[#0e0e0e] p-4 flex items-center justify-center rounded-xl hover:scale-105 transition shadow-md"
              >
                <Image
                  src={client}
                  alt={`client-${idx}`}
                  width={100}
                  height={50}
                />
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-400">
              Hozircha mijozlar yo‘q
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
