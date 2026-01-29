"use client";

import { useState } from "react";
import Text from "@shared/components/topography/Text";
import Badge from "@shared/components/Badge";
import { capitalize } from "@shared/lib/utils";

type ListItemProps = {
  name: string;
  checked?: boolean;
};

export default function ListItemComponent({ name, checked: initialChecked = false }: ListItemProps) {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <Badge
      forceButton={false}
      color={checked ? "bg-gray-500" : "bg-emerald-600"}
      textColor="text-white"
      className="w-full p-4 cursor-pointer transition-all text-lg font-semibold"
      style={{
        textDecoration: checked ? "line-through" : "none",
        opacity: checked ? 0.7 : 1,
      }}
    >
      <Text>{capitalize(name)}</Text>
    </Badge>
  );
}
