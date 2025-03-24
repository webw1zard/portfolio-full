"use client";

import { createClient } from "@/supabase/client";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  position: string;
  link: string;
  tools: Array<string>;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const supabase = createClient();

  const fetchProjects = useCallback(async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setProjects(data);
    }
  }, [supabase]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div
      className="bg-black text-white py-12 px-4 md:px-20 w-full h-full bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: "url('/Home.svg')",
      }}
    >
      <h2 className="text-3xl md:text-4xl text-blue-500 font-bold mb-4">
        Loyihalar
      </h2>
      <div className="w-48 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-8"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#0e0e0e] rounded-xl overflow-hidden border border-[#222] hover:scale-105 transition-transform duration-300 ease-in-out relative shadow-lg"
          >
            <div className="relative w-full h-48">
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-pink-500 text-white text-xs px-2 py-1 rounded shadow-md">
                {project.position}
              </div>
            </div>

            <div className="p-5 space-y-3">
              <h3 className="font-semibold text-xl">{project.title}</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs bg-gradient-to-br from-[#1e1e1e] to-[#333] px-2 py-1 rounded text-gray-300 border border-[#444]"
                  >
                    #{tool}
                  </span>
                ))}
              </div>

              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  className="text-sm text-blue-400 hover:underline inline-block mt-2"
                >
                  Loyihaga o‘tish →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-[#1f1f1f] to-[#2c2c2c] p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-5">
          <Image src="/tg.svg" alt="Telegram" width={100} height={100} />
          <div>
            <h4 className="font-semibold text-xl">Telegram kanal</h4>
            <p className="text-sm text-gray-400 max-w-xs">
              Barcha loyihalarimizni telegram kanalimizda ham kuzatib boring!
            </p>
          </div>
        </div>
        <button className="bg-green-500 hover:bg-green-400 transition px-5 py-3 rounded-lg text-black font-medium shadow-md">
          Kanalga o‘tish
        </button>
      </div>
    </div>
  );
}
