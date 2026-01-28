import { useSearchParams } from "next/navigation";
import { Ingredient } from "@core/entities/ingredients/model";
import { capitalize, groupByCategory } from "@/src/shared/lib/utils";
import SearchBar from "@shared/components/SearchBar";
import Text from "@/src/shared/components/topography/Text";
import { useState } from "react";

type Props = {
  ingredients: Ingredient[];
  cartItems: Ingredient[];
  onAdd: (id: string) => void;
};

const IngredientsList = ({ ingredients, cartItems, onAdd }: Props) => {
  const disabledIds = new Set(cartItems.map((i) => i.name));
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() ?? "";

  const filtered = ingredients.filter(
    (ing) =>
      ing.name.toLowerCase().includes(search) &&
      !disabledIds.has(ing.name)
  );

  const grouped = groupByCategory(filtered);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (category: string) => {
    setCollapsed((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-bold text-emerald-700 mb-4 text-center">Dodaj składniki</h3>
      <div className="mb-4">
        <SearchBar />
      </div>
      {grouped.length === 0 ? (
        <Text className="text-gray-400 text-center">Brak dostępnych składników.</Text>
      ) : (
        grouped.map(([category, items]) => {
          const isCollapsed = collapsed[category];
          return (
            <div key={category} className="mb-4">
              <button
                type="button"
                className="flex items-center gap-2 mb-2 w-full group select-none"
                onClick={() => toggleCollapse(category)}
                aria-expanded={!isCollapsed}
                aria-controls={`ingredients-category-${category}`}
              >
                <span className="badge bg-blue-200 text-blue-900 px-2 py-1 text-xs font-semibold">
                  {capitalize(category)}
                </span>
                <span className="text-xs text-gray-500">{items.length} szt.</span>
                <span className="ml-auto text-gray-500 group-hover:text-emerald-700 transition-transform">
                  {isCollapsed ? (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
              </button>
              {!isCollapsed && (
                <div id={`ingredients-category-${category}`} className="space-y-1">
                  {items.map((ing) => (
                    <button
                      key={ing.name}
                      onClick={() => onAdd(ing.name)}
                      className="inline-block px-4 py-2 text-base font-semibold rounded-lg transition-colors duration-150 m-1 bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border border-emerald-200 shadow-sm cursor-pointer"
                      style={{ display: 'inline-flex', alignItems: 'center' }}
                    >
                      {capitalize(ing.name)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default IngredientsList;
