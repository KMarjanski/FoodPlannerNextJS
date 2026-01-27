"use client";

import { useState } from "react";
import Text from "@shared/components/topography/Text";
import { capitalize } from "@shared/lib/utils";

export default function ListItem({ name }: { name: string }) {
  const [selected, setSelected] = useState(false);
  return (
    <div
      onClick={() => setSelected((prev) => !selected)}
      className={`badge w-full p-4 cursor-pointer transition-all text-lg font-semibold ${
        selected ? "bg-gray-500 text-white line-through opacity-70" : "bg-emerald-600 text-white"
      }`}
    >
      <Text>{capitalize(name)}</Text>
    </div>
  );
}
