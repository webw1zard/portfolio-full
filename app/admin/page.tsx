"use client";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const supabase = createClient();
interface Project {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  status: "Yuqori" | "Past" | "Boshqa";
  tags: string[];
  category: string;
  project_url: string;
}

const Page = () => {
  const [newProject, setNewProject] = useState<Partial<Project>>({ tags: [] });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [selected, setSelected] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const route = e.target.value;
    setSelected(route);
    if (route) {
      router.push(route);
    }
  };

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

    const filePath = `projects-images/${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("projects-images")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Rasm yuklashda xatolik:", uploadError);
      alert("Rasm yuklab bo‘lmadi!");
      return;
    }

    const { data: urlData } = supabase.storage
      .from("projects-images")
      .getPublicUrl(filePath);
    const imageUrl = urlData.publicUrl;

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
      <div className="w-full p-4 bg-blue-800">
        <select
          value={selected}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-blue-700 text-white focus:outline-none appearance-none"
        >
          <option value="" disabled hidden>
            Bo'limni tanlang
          </option>
          <option value="/admin/projects">Loyiha qo‘shish</option>
          <option value="/admin/clients">Mijoz qo‘shish</option>
          <option value="/admin/tools">Asbob-uskuna qo‘shish</option>
        </select>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <form
        onSubmit={handleLogin}
        className="bg-blue-500 p-6 rounded-lg shadow-lg w-full max-w-md border border-e-white"
      >
        <h2 className="text-2xl font-bold text-black mb-4">Admin Kirish</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md bg-white text-black border border-e-white focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-md bg-white text-black border border-e-white focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-black py-2 rounded-md font-semibold hover:bg-blue-900 transition"
          >
            Kirish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
