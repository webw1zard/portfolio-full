import Image from "next/image";
import Link from "next/link";

export default function About() {
  const tools: string[] = [];
  const clients: string[] = [];

  return (
    <div className="bg-black/1000 text-white px-6 md:px-20 py-16 relative">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Home.svg"
          alt="background"
          layout="fill"
          objectFit="cover"
          className="opacity-100"
        />
      </div>

      <h2 className="text-3xl font-bold mb-4 text-blue-500">Men haqimda</h2>
      <p className="mb-4">
        Men Nizomov Ulug'bek veb dasturchisiman. Yoshim 16 da, Buxoro viloyati
        Kogon Shahrida tug‘ilganman. Qiziqarli, ko‘p funksionallikka ega bo‘lgan
        va kuchli dizaynga ega bo‘lgan dasturlar yaratishga qiziqaman.
      </p>
      <p className="mb-4">
        Mening vazifam veb saytni foydalanuvchilarga qulay, sayt dizayni
        foydalanuvchilarga jalb qiluvchi lekin ayni paytda tezkor bo‘lishini
        ta'minlashdir va saytni moslashuvchan kodlar bilan yaratishdir!
      </p>
      <p className="mb-6">
        Agar sizga men yaratgan loyihalarim qiziq bo‘lsa{" "}
        <Link
          href={"/projects"}
          className="text-blue-500 underline cursor-pointer"
        >
          Loyihalar
        </Link>{" "}
        sahifasiga tashrif buyurishingiz mumkin :)
      </p>
      <Link
        href={"/contact"}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white font-semibold transition "
      >
        Bog‘lanish
      </Link>

      <h2 className="text-2xl font-bold mb-4 text-blue-500 mt-6">
        Asbob-uskunalar
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-6 mb-16">
        {tools.length > 0 ? (
          tools.map((tool, idx) => (
            <div
              key={idx}
              className="bg-[#0e0e0e] rounded-lg flex items-center justify-center p-4 hover:scale-105 transition"
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

      <h2 className="text-2xl font-bold mb-4 text-blue-500">
        Men nimalar qila olaman
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="bg-[#0e0e0e] p-4 rounded-lg flex items-start gap-4">
          <Image src="/seo.svg" alt="seo" width={50} height={50} />
          <div>
            <h4 className="font-semibold text-lg mb-2 text-white">Seo</h4>
            <p className="text-gray-400">
              Qidiruv tizimining natijalarida sayt reytingini yaxshilash
            </p>
          </div>
        </div>

        <div className="bg-[#0e0e0e] p-4 rounded-lg flex items-start gap-4">
          <Image src="/diz.svg" alt="dizayn" width={50} height={50} />
          <div>
            <h4 className="font-semibold text-lg mb-2 text-white">Dizayn</h4>
            <p className="text-gray-400">
              Kuchli dizayn va kichik detallargacha e'tibor berish
            </p>
          </div>
        </div>

        <div className="bg-[#0e0e0e] p-4 rounded-lg flex items-start gap-4">
          <Image src="/quality.svg" alt="sifat" width={50} height={50} />
          <div>
            <h4 className="font-semibold text-lg mb-2 text-white">Sifat</h4>
            <p className="text-gray-400">
              Yuqori darajada saytlarni sifatli ishlab chiqish
            </p>
          </div>
        </div>

        <div className="bg-[#0e0e0e] p-4 rounded-lg flex items-start gap-4">
          <Image src="/speed.svg" alt="tezkorlik" width={50} height={50} />
          <div>
            <h4 className="font-semibold text-lg mb-2 text-white">Tezkorlik</h4>
            <p className="text-gray-400">
              Qisqa muddat ichida tezkor sayt ishlab chiqish
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-blue-500">Mijozlar</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {clients.length > 0 ? (
          clients.map((client, idx) => (
            <div
              key={idx}
              className="bg-[#0e0e0e] p-4 flex items-center justify-center rounded-lg hover:scale-105 transition"
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
          <p className="col-span-full text-gray-400">Hozircha mijozlar yo‘q</p>
        )}
      </div>
    </div>
  );
}
