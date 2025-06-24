import { CartEntry } from "@features/cart/model";
import { Ingredient, Ingredients } from "@core/entities/ingredients/model";

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function capitalize(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
}

export const groupByCategory = (
  ingredients: Ingredients
): Array<[string, Ingredients]> => {
  const grouped = ingredients.reduce<Record<string, Ingredients>>(
    (acc, ing) => {
      const cat = ing.category || "Inne";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(ing);
      return acc;
    },
    {}
  );
  Object.entries(grouped).map((group) =>
    group.map((value) => {
      if (typeof value === "string") {
        return value;
      } else {
        return value.sort((a, b) => a.name.localeCompare(b.name));
      }
    })
  );
  return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
};

export const sortListByCategory = (entry: CartEntry): CartEntry => {
  const { cart } = entry;

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
    "Mięsko",
    "Mrożonki",
    "Suche",
    "Napoje",
    "Słodycze",
    "Snacki",
    "Chemia",
  ];

  const getCategoryIndex = (category: string) => {
    const index = categoryOrder.indexOf(category);
    return index === -1 ? categoryOrder.length : index; // nieznane na końcu
  };

  const sortedCart = [...cart].sort(
    (a: Ingredient, b: Ingredient) =>
      getCategoryIndex(a.category) - getCategoryIndex(b.category)
  );

  return {
    ...entry,
    cart: sortedCart,
  };
};
