import React from "react";
import { getList } from "@features/list/service";
import ListCategory from "@features/list/ListCategory";
import { Cart, CartEntry } from "@features/cart/model";
import { Ingredients } from "@core/entities/ingredients/model";
import { sortListByCategory } from "@/src/shared/lib/utils";

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
    return (
      <>
        {Object.entries(groupedByCategory).map(([category, ingredients]) => (
          <ListCategory
            key={category}
            category={category}
            ingredients={ingredients}
            categoryOrder={categoryOrder}
          />
        ))}
      </>
    );
          items={grouped[category]}
        />
      ))}
    </div>
  );
};

export default List;
