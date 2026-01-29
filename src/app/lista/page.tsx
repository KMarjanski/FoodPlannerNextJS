import React from "react";
import { getList } from "@features/list/service";
import ListCategory from "@features/list/ListCategory";
import { Cart, CartEntry } from "@features/cart/model";
import { Ingredient, Ingredients } from "@core/entities/ingredients/model";
import { sortListByCategory } from "@/src/shared/lib/utils";
import Heading from "@/src/shared/components/topography/Heading";

export const dynamic = 'force-dynamic';

const List = async () => {
  const listRAW = await getList();
  const listData = JSON.parse(JSON.stringify(listRAW)) as Cart;
  const listEntry = listData[0] as CartEntry;
  const listSorted = sortListByCategory(listEntry).cart as Ingredients;

  // Get the category order
  const categoryOrder = [
    "Owoce",
    "Warzywa",
    "Zioła",
    "Pieczywo",
    "Pasty",
    "Słoiki",
    "Puszki",
    "Przyprawy",
    "Sosy",
    "Dania gotowe",
    "Nabiał",
    "Mrożonki",
    "Suche",
    "Napoje",
    "Słodycze",
    "Snacki",
    "Chemia",
  ];

  // Group by category
  const grouped = listSorted.reduce<Record<string, Ingredients>>((acc, ing) => {
    const cat = ing.category || "Inne";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(ing);
    return acc;
  }, {});

  // Sort categories by categoryOrder
  const sortedCategories = categoryOrder.filter(cat => grouped[cat]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {sortedCategories.map((category) => (
        <ListCategory
          key={category}
          categoryName={category}
          items={grouped[category]}
        />
      ))}
    </div>
  );
};

export default List;
