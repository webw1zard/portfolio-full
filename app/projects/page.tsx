import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Home.svg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </div>
  );
}
