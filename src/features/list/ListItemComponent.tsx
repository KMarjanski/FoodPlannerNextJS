"use client";

import { useState } from "react";
import Text from "@shared/components/topography/Text";
import { capitalize } from "@shared/lib/utils";

type ListItemProps = {
  name: string;
  checked?: boolean;
};

export default function ListItemComponent({ name, checked: initialChecked = false }: ListItemProps) {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <div
      onClick={() => setChecked((prev) => !prev)}
      className="badge w-full p-4 cursor-pointer transition-all text-lg font-semibold text-white"
      style={{
        backgroundColor: checked ? "#6b7280" : "#059669",
        textDecoration: checked ? "line-through" : "none",
        opacity: checked ? 0.7 : 1,
      }}
    >
      <Text>{capitalize(name)}</Text>
    </div>
  );
}
