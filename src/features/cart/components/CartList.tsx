import Text from "@/src/shared/components/topography/Text";
import { Ingredient } from "@core/entities/ingredients/model";
import { capitalize, groupByCategory } from "@shared/lib/utils";
import { useState } from "react";

type Props = {
  cartItems: Ingredient[];
  // eslint-disable-next-line no-unused-vars
  onRemove: (_id: string) => void;
  editMode?: boolean;
  // eslint-disable-next-line no-unused-vars
  onDeleteIngredient?: (_id: string) => void;
};

const CartList = ({ cartItems, onRemove, editMode = false, onDeleteIngredient }: Props) => {
  const grouped = groupByCategory(cartItems);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (category: string) => {
    setCollapsed((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
      {editMode && (
        <div className="mb-2 text-red-700 font-semibold text-center">Tryb edycji: kliknij składnik, aby usunąć z bazy</div>
      )}
      <h3 className="text-lg font-bold text-emerald-700 mb-4 text-center">Twój koszyk</h3>
      {cartItems.length === 0 ? (
        <Text className="text-gray-400 text-center">Koszyk jest pusty.</Text>
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
                aria-controls={`cart-category-${category}`}
              >
                <span className="badge bg-emerald-600 text-white px-2 py-1 text-xs font-semibold">
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
                <div id={`cart-category-${category}`} className="space-y-1">
                  {items.map((ing) => (
                    <button
                      key={ing.name}
                      onClick={() => editMode && onDeleteIngredient ? onDeleteIngredient(ing.name) : onRemove(ing.name)}
                      className={`inline-block px-4 py-2 text-base font-semibold rounded-lg transition-colors duration-150 m-1 border shadow-sm cursor-pointer ${editMode ? "bg-red-200 text-red-900 hover:bg-red-300 border-red-300" : "bg-emerald-200 text-emerald-900 hover:bg-emerald-300 border-emerald-300"}`}
                      style={{ display: 'inline-flex', alignItems: 'center' }}
                      aria-label={editMode ? `Usuń ${capitalize(ing.name)} z bazy` : `Odłóż ${capitalize(ing.name)} z koszyka`}
                      type="button"
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

export default CartList;
