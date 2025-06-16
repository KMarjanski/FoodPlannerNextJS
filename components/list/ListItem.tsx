"use client";

import { useState } from "react";

export default function ListItem({ name }: { name: string }) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      onClick={() => setSelected((prev) => !prev)}
      className={`badge w-full p-12 cursor-pointer transition-colors text-xl ${
        selected ? "bg-green-500" : "bg-success"
      }`}
    >
      {name}
    </div>
  );
}
