"use client";

import { useState } from "react";
import ListItemComponent from "./ListItemComponent";
import { Ingredients } from "@core/entities/ingredients/model";

type ListCategoryProps = {
  categoryName: string;
  items: Ingredients;
};

export default function ListCategory({ categoryName, items }: ListCategoryProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const handleItemToggle = (name: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(name)) {
      newChecked.delete(name);
    } else {
      newChecked.add(name);
    }
    setCheckedItems(newChecked);
  };

  const uncheckedItems = items.filter((item) => !checkedItems.has(item.name));
  const checkedItemsList = items.filter((item) => checkedItems.has(item.name));
  const progress = `${checkedItems.size}/${items.length}`;

  return (
    <div>
      {/* Category Header */}
      <div className="w-full flex items-center justify-between p-4 mt-6 first:mt-0 bg-gray-300 text-gray-800 font-bold text-lg">
        <span>{categoryName}</span>
        <span className="badge badge-neutral text-white font-bold">
          {progress}
        </span>
      </div>

      {/* Items */}
      <div className="space-y-0 bg-white/90 backdrop-blur-sm">
        {/* Unchecked items first */}
        {uncheckedItems.length > 0 && (
          <div className="space-y-0">
            {uncheckedItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleItemToggle(item.name)}
                className="w-full text-left p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <ListItemComponent name={item.name} checked={false} />
              </button>
            ))}
          </div>
        )}

        {/* Checked items at the bottom */}
        {checkedItemsList.length > 0 && (
          <div className="space-y-0 bg-gray-50 border-t-2 border-gray-300">
            {checkedItemsList.map((item) => (
              <button
                key={item.name}
                onClick={() => handleItemToggle(item.name)}
                className="w-full text-left p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-colors"
              >
                <ListItemComponent name={item.name} checked={true} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
