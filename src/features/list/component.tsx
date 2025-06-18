"use client";

import { useState } from "react";
import Text from "@shared/components/topography/Text";

export default function ListItem({ name }: { name: string }) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      onClick={() => setSelected((prev) => !prev)}
      className={`badge w-full p-12 cursor-pointer transition-colors text-xl ${
        selected ? "bg-green-500" : "bg-success"
      }`}
    >
      <Text retro>
        {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
      </Text>
    </div>
  );
}
