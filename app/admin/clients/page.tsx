"use client";
import { useState } from "react";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supabase = createClient();

type Client = {
  id: string;
  name: string;
  email: string;
  logo_url: string;
  website: string;
};

const ClientsPage = () => {
  const [newClient, setNewClient] = useState<Partial<Client>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleAddClient = async () => {
    if (
      !newClient.name ||
      !newClient.email ||
      !newClient.website ||
      !logoFile
    ) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const filePath = `clients-logos/${Date.now()}-${logoFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("clients-logos")
      .upload(filePath, logoFile);

    if (uploadError) {
      console.error("Logo yuklashda xatolik:", uploadError);
      toast.error("Logo yuklab bo‘lmadi!");
      return;
    }

    const { data: urlData } = supabase.storage
      .from("clients-logos")
      .getPublicUrl(filePath);
    const logoUrl = urlData.publicUrl;

    const { error } = await supabase
      .from("clients")
      .insert([{ ...newClient, logo_url: logoUrl }]);

    if (error) {
      console.error("Mijoz qo‘shishda xatolik:", error);
      toast.error("Mijoz qo‘shishda xatolik yuz berdi!");
    } else {
      setNewClient({});
      setLogoFile(null);
      toast.success("✅ Mijoz muvaffaqiyatli qo‘shildi!");
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
  };

  return (
    <div className="bg-black/1000 text-white px-6 md:px-20 py-48 relative">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Home.svg"
          alt="background"
          fill
          className="object-cover "
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">Mijoz qo‘shish</h1>
        <div className="bg-blue-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Ism"
            value={newClient.name || ""}
            onChange={(e) =>
              setNewClient({ ...newClient, name: e.target.value })
            }
            className="w-full p-2 mb-4 bg-blue-700 rounded text-white placeholder-blue-200"
          />
          <input
            type="email"
            placeholder="Email"
            value={newClient.email || ""}
            onChange={(e) =>
              setNewClient({ ...newClient, email: e.target.value })
            }
            className="w-full p-2 mb-4 bg-blue-700 rounded text-white placeholder-blue-200"
          />
          <input
            type="text"
            placeholder="Veb-sayt"
            value={newClient.website || ""}
            onChange={(e) =>
              setNewClient({ ...newClient, website: e.target.value })
            }
            className="w-full p-2 mb-4 bg-blue-700 rounded text-white placeholder-blue-200"
          />
          <input
            type="file"
            onChange={handleLogoUpload}
            className="w-full p-2 mb-4 text-white"
          />
          <button
            onClick={handleAddClient}
            className="w-full bg-blue-500 hover:bg-blue-400 text-white py-2 rounded"
          >
            Mijoz qo‘shish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
