"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [check, setCheck] = useState(0);
  return (
    <main className="bg-black flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={() => {
          console.log("check before SET", check);
          setCheck(() => {
            console.log("I am Executed after value set")
            return check + 1;
          });
          console.log("check after SET", check);
        }}
        className="px-4 py-2 rounded text-white border-white border-2 hover:bg-amber-600 duration-1000"
      >
        Click me & Check it
      </button>
    </main>
  );
}
