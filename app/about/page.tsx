"use client";

import { createClient } from "@/supabase/client";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

export default function About() {
  const [tools, setTools] = useState<string[]>([]);
  const [clients, setClients] = useState<string[]>([]);
  const supabase = createClient();

  const fetchData = useCallback(async () => {
    try {
      const { data: toolsData, error: toolsError } = await supabase
        .from("tools")
        .select("image_url");

      const { data: clientsData, error: clientsError } = await supabase
        .from("clients")
        .select("image_url");

      if (toolsError) console.error(toolsError);
      if (clientsError) console.error(clientsError);

      if (toolsData) setTools(toolsData.map((t) => t.image_url));
      if (clientsData) setClients(clientsData.map((c) => c.image_url));
    } catch (error) {
      console.error(error);
    }
  }, [supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="bg-black/1000 text-white px-6 md:px-20 py-16 relative">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Home.svg"
          alt="background"
          fill
          className="object-cover "
        />
      </div>

      <h2 className="text-3xl font-bold mb-4 text-blue-500">Men haqimda</h2>
      <div className="w-48 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-6"></div>

      <p className="mb-4">
        Men Nizomov Ulug'bek, tajribali veb dasturchiman. Mening maqsadim –
        zamonaviy va samarali veb yechimlar yaratish orqali biznes va shaxsiy
        loyihalarga qo‘shimcha qiymat qo‘shishdir. Frontend va backend
        sohalarida tajribam katta va men har doim o‘sishga va yangiliklarni
        o‘rganishga tayyorman.
      </p>
      <p className="mb-4">
        Ish jarayonida doimo mijozlarim ehtiyojlarini tinglab, ularga
        moslashgan, innovatsion va estetik jihatdan mukammal mahsulotlar taqdim
        etaman.
      </p>

      <h2 className="text-2xl font-bold mb-4 text-blue-500 mt-6">
        Asbob-uskunalar
      </h2>
      <div className="w-48 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-6"></div>
      <p className="mb-4">
        Quyida men faoliyatimda muntazam qo‘llaydigan texnologiyalar va
        asbob-uskunalar ro‘yxati keltirilgan:
      </p>
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
      <div className="w-48 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="bg-[#0e0e0e] p-6 rounded-lg hover:scale-105 transition flex gap-4 items-center">
          <Image src="/seo.svg" alt="Seo" width={50} height={50} />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-400">Seo</h3>
            <p>Qidiruv tizimining natijalarida sayt reytingini yaxshilash.</p>
          </div>
        </div>

        <div className="bg-[#0e0e0e] p-6 rounded-lg hover:scale-105 transition flex gap-4 items-center">
          <Image src="/diz.svg" alt="Design" width={50} height={50} />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-400">Dizayn</h3>
            <p>Kuchli dizayn va kichik detallarga e’tibor berish.</p>
          </div>
        </div>

        <div className="bg-[#0e0e0e] p-6 rounded-lg hover:scale-105 transition flex gap-4 items-center">
          <Image src="/quality.svg" alt="Sifat" width={50} height={50} />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-400">Sifat</h3>
            <p>Yuqori darajada saytlarni sifatli ishlab chiqish.</p>
          </div>
        </div>

        <div className="bg-[#0e0e0e] p-6 rounded-lg hover:scale-105 transition flex gap-4 items-center">
          <Image src="/speed.svg" alt="Tezkorlik" width={50} height={50} />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-400">
              Tezkorlik
            </h3>
            <p>Qisqa muddat ichida tezkor sayt ishlab chiqish.</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-blue-500">Mijozlar</h2>
      <div className="w-48 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-6"></div>
      <p className="mb-4">
        Mening xizmatlarimdan mamnun bo‘lgan va hamkorlik qilgan mijozlarim:
      </p>
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
