"use client";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import { useState } from "react";

const supabase = createClient();
type Project = {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  status: "Yuqori" | "Past" | "Boshqa";
  tags: string[];
  category: string;
  project_url: string;
};

const Page = () => {
  const [newProject, setNewProject] = useState<Partial<Project>>({ tags: [] });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== adminEmail || password !== adminPassword) {
      setError("Noto'g'ri email yoki parol.");
      return;
    }

    setIsLoggedIn(true);
    setError("");
  };

  const handleAddProject = async () => {
    if (
      !newProject.title ||
      !imageFile ||
      !newProject.project_url ||
      !newProject.category ||
      !newProject.status
    ) {
      alert("Iltimos, barcha kerakli maydonlarni to'ldiring!");
      return;
    }

    // Rasmni projects-images bucketiga yuklash
    const filePath = `projects-images/${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("projects-images")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Rasm yuklashda xatolik:", uploadError);
      alert("Rasm yuklab bo‘lmadi!");
      return;
    }

    // Rasmning public URL sini olish
    const { data: urlData } = supabase.storage
      .from("projects-images")
      .getPublicUrl(filePath);
    const imageUrl = urlData.publicUrl;

    // Ma'lumotlar bazasiga loyihani qo'shish
    const { error } = await supabase
      .from("projects")
      .insert([{ ...newProject, image_url: imageUrl }]);

    if (error) {
      console.error("Loyihani qo‘shishda xatolik:", error);
      alert("Loyihani qo‘shishda xatolik yuz berdi!");
    } else {
      setNewProject({ tags: [] });
      setImageFile(null);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  };

  if (isLoggedIn) {
    return (
      <div className="p-6 bg-black min-h-screen text-[#39FF14]">
        <h1 className="text-2xl font-bold bg-black p-4">Xush kelibsiz, Admin!</h1>
        <div className="flex flex-col gap-6">
          <div className="bg-[#111] rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-5">Loyiha qo‘shish 🚀</h2>
            <input type="text" placeholder="Sarlavha" value={newProject.title || ""} 
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="w-full p-2 bg-gray-800 text-white rounded"
            />
            <input type="text" placeholder="Loyiha URL" value={newProject.project_url || ""}
              onChange={(e) => setNewProject({ ...newProject, project_url: e.target.value })}
              className="w-full p-2 bg-gray-800 text-white rounded"
            />
            <select value={newProject.status || ""} 
              onChange={(e) => setNewProject({ ...newProject, status: e.target.value as "Yuqori" | "Past" | "Boshqa" })}
              className="w-full p-2 bg-gray-800 text-white rounded"
            >
              <option value="">Status tanlang</option>
              <option value="Yuqori">Yuqori</option>
              <option value="Past">Past</option>
              <option value="Boshqa">Boshqa</option>
            </select>
            <input type="file" onChange={handleImageUpload} className="w-full p-2 text-white" />
            <button onClick={handleAddProject} className="w-full bg-[#39FF14] text-black py-2 mt-4 rounded">
              Loyiha qo‘shish
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <form onSubmit={handleLogin} className="bg-[#121212] p-6 rounded-lg shadow-lg w-full max-w-md border border-[#39FF14]">
        <h2 className="text-2xl font-bold text-[#39FF14] mb-4">Admin Kirish</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md bg-[#1E1E1E] text-[#39FF14] border border-[#39FF14] focus:outline-none"
            required
          />
          <input type="password" placeholder="Parol" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-md bg-[#1E1E1E] text-[#39FF14] border border-[#39FF14] focus:outline-none"
            required
          />
          <button type="submit" className="w-full bg-[#39FF14] text-black py-2 rounded-md font-semibold hover:bg-[#2EDC12] transition">
            Kirish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
