"use client";
import { useState } from "react";
import { createClient } from "@/supabase/client";
import Image from "next/image";

const supabase = createClient();

type Tool = {
  id: string;
  name: string;
  description?: string;
  image_url: string;
  tool_url: string;
};

const ToolsPage = () => {
  const [newTool, setNewTool] = useState<Partial<Tool>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleAddTool = async () => {
    if (!newTool.name || !newTool.tool_url || !imageFile) {
      alert("Iltimos, barcha kerakli maydonlarni to'ldiring!");
      return;
    }

    const filePath = `tools-images/${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("tools-images")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Rasm yuklashda xatolik:", uploadError);
      alert("Rasm yuklab bo‘lmadi!");
      return;
    }

    const { data: urlData } = supabase.storage
      .from("tools-images")
      .getPublicUrl(filePath);
    const imageUrl = urlData.publicUrl;

    const { error } = await supabase
      .from("tools")
      .insert([{ ...newTool, image_url: imageUrl }]);

    if (error) {
      console.error("Asbob qo‘shishda xatolik:", error);
      alert("Asbob qo‘shishda xatolik yuz berdi!");
    } else {
      setNewTool({});
      setImageFile(null);
      alert("Asbob muvaffaqiyatli qo‘shildi!");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  };

  return (
    <div className="bg-black/1000 text-white px-6 md:px-20 py-48 relative">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Home.svg"
          alt="background"
          fill
          className="object-cover "
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">Asbob-uskuna qo‘shish</h1>
        <div className="bg-blue-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Nomi"
            value={newTool.name || ""}
            onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
            className="w-full p-2 mb-4 bg-blue-700 rounded text-white placeholder-blue-200"
          />
          <input
            type="text"
            placeholder="Asbob URL"
            value={newTool.tool_url || ""}
            onChange={(e) =>
              setNewTool({ ...newTool, tool_url: e.target.value })
            }
            className="w-full p-2 mb-4 bg-blue-700 rounded text-white placeholder-blue-200"
          />
          <textarea
            placeholder="Tavsif"
            value={newTool.description || ""}
            onChange={(e) =>
              setNewTool({ ...newTool, description: e.target.value })
            }
            className="w-full p-2 mb-4 bg-blue-700 rounded text-white placeholder-blue-200"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full p-2 mb-4 text-white"
          />
          <button
            onClick={handleAddTool}
            className="w-full bg-blue-500 hover:bg-blue-400 text-white py-2 rounded"
          >
            Asbob qo‘shish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
