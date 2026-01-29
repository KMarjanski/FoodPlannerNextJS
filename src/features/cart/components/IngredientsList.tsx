import { useSearchParams } from "next/navigation";
import { Ingredient } from "@core/entities/ingredients/types";
import { capitalize, groupByCategory } from "@/src/shared/lib/utils";
import SearchBar from "@shared/components/SearchBar";
import Text from "@/src/shared/components/topography/Text";
import { useState } from "react";
import { createIngredient, getIngredients } from "@core/entities/ingredients/service";
import { ingredientsStore } from "@core/entities/ingredients/store";

const categoryOptions = [
  "Owoce", "Warzywa", "Zioła", "Pieczywo", "Pasty", "Słoiki", "Puszki", "Przyprawy", "Sosy", "Dania gotowe", "Nabiał", "Mięsko", "Mrożonki", "Suche", "Napoje", "Słodycze", "Snacki", "Chemia", "Inne"
];

type Props = {
  // usuń: ingredients: Ingredient[];
  cartItems: Ingredient[];
  onAdd: (id: string) => void;
  editMode?: boolean;
  setEditMode?: (v: boolean) => void;
  onDeleteIngredient?: (id: string) => void;
};

const IngredientsList = ({ cartItems, onAdd, editMode = false, setEditMode, onDeleteIngredient }: Props) => {
  const ingredients = ingredientsStore((state) => state.ingredients);
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
  const [showAdd, setShowAdd] = useState(false);
  const [newCategory, setNewCategory] = useState(categoryOptions[0]);
  const [adding, setAdding] = useState(false);

  const exists = ingredients.some((ing) => ing.name.toLowerCase() === search.trim().toLowerCase());
  const canAdd = search.trim().length > 0 && !exists && filtered.length === 0;

  const toggleCollapse = (category: string) => {
    setCollapsed((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-center mb-4 gap-2">
        <h3 className="text-lg font-bold text-emerald-700 text-center mb-0">Dodaj składniki</h3>
        {setEditMode && (
          <button
            className={`btn btn-xs ${editMode ? "btn-error" : "btn-outline"}`}
            onClick={() => setEditMode && setEditMode(!editMode)}
          >
            {editMode ? "Wyłącz edycję" : "Tryb edycji"}
          </button>
        )}
      </div>
      <div className="mb-4">
        <SearchBar />
      </div>
      {!editMode && canAdd && (
        <div className="flex flex-col items-center mb-4 gap-2">
          {!showAdd ? (
            <button
              className="px-4 py-2 text-base font-semibold rounded-lg shadow-sm border border-emerald-200 bg-emerald-100 text-emerald-900 hover:bg-emerald-200 transition-colors cursor-pointer"
              onClick={() => setShowAdd(true)}
            >
              Dodaj nowy składnik: {search.trim().charAt(0).toUpperCase() + search.trim().slice(1).toLowerCase()}
            </button>
          ) : (
            <>
              <div className="font-semibold">Wybierz kategorię dla <span className="text-emerald-700">{search.trim().charAt(0).toUpperCase() + search.trim().slice(1).toLowerCase()}</span>:</div>
              <select
                className="select select-bordered w-full max-w-xs"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                disabled={adding}
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button
                className="btn btn-success mt-2"
                disabled={adding}
                onClick={async () => {
                  setAdding(true);
                  // Capitalize first letter, lowercase the rest
                  const formattedName = search.trim().charAt(0).toUpperCase() + search.trim().slice(1).toLowerCase();
                  await createIngredient({ name: formattedName, category: newCategory, inRecipes: [] });
                  const fresh = await getIngredients();
                  ingredientsStore.getState().setIngredients(fresh);
                  setShowAdd(false);
                  setAdding(false);
                }}
              >
                Dodaj składnik
              </button>
              <button className="btn btn-xs btn-outline mt-1" onClick={() => setShowAdd(false)}>Anuluj</button>
            </>
          )}
        </div>
      )}
      {editMode && (
        <div className="mb-2 text-red-700 font-semibold text-center">Tryb edycji: kliknij składnik, aby usunąć z bazy</div>
      )}
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
                      onClick={() => editMode && onDeleteIngredient ? onDeleteIngredient(ing.name) : onAdd(ing.name)}
                      className={`inline-block px-4 py-2 text-base font-semibold rounded-lg transition-colors duration-150 m-1 border shadow-sm cursor-pointer ${editMode ? "bg-red-200 text-red-900 hover:bg-red-300 border-red-300" : "bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border-emerald-200"}`}
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
