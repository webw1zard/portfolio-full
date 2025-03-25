"use client";
import { useState } from "react";
import { createClient } from "@/supabase/client";
import Image from "next/image";

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

const ProjectsPage = () => {
  const [newProject, setNewProject] = useState<Partial<Project>>({ tags: [] });
  const [imageFile, setImageFile] = useState<File | null>(null);

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
      alert("Loyiha muvaffaqiyatli qo‘shildi!");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  };

  return (
    <div className="bg-black/1000 text-white px-6 md:px-20 py-32 relative">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Home.svg"
          alt="background"
          fill
          className="object-cover "
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">Loyiha Qo'shish </h1>
        <div className="bg-blue-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Sarlavha"
            value={newProject.title || ""}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            className="w-full p-2 mb-4 bg-blue-700 rounded text-white placeholder-blue-200"
          />
          <input
            type="text"
            placeholder="Loyiha URL"
            value={newProject.project_url || ""}
            onChange={(e) =>
              setNewProject({ ...newProject, project_url: e.target.value })
            }
            className="w-full p-2 mb-4 bg-blue-700 rounded text-white placeholder-blue-200"
          />
          <input
            type="text"
            placeholder="Kategoriya"
            value={newProject.category || ""}
            onChange={(e) =>
              setNewProject({ ...newProject, category: e.target.value })
            }
            className="w-full p-2 mb-4 bg-blue-700 rounded text-white placeholder-blue-200"
          />
          <select
            value={newProject.status || ""}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                status: e.target.value as "Yuqori" | "Past" | "Boshqa",
              })
            }
            className="w-full p-2 mb-4 bg-blue-700 rounded text-white"
          >
            <option value="">Status tanlang</option>
            <option value="Yuqori">Yuqori</option>
            <option value="Past">Past</option>
            <option value="Boshqa">Boshqa</option>
          </select>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full p-2 mb-4 text-white"
          />
          <button
            onClick={handleAddProject}
            className="w-full bg-blue-500 hover:bg-blue-400 text-white py-2 rounded"
          >
            Loyiha qo‘shish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
