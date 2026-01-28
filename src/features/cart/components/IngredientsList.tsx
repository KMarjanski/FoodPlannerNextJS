import { useSearchParams } from "next/navigation";
import { Ingredient } from "@core/entities/ingredients/model";
import { capitalize, groupByCategory } from "@/src/shared/lib/utils";
import SearchBar from "@shared/components/SearchBar";
import Text from "@/src/shared/components/topography/Text";

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

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-bold text-emerald-700 mb-4 text-center">Dodaj składniki</h3>
      <div className="mb-4">
        <SearchBar />
      </div>
      {grouped.length === 0 ? (
        <Text className="text-gray-400 text-center">Brak dostępnych składników.</Text>
      ) : (
        grouped.map(([category, items]) => (
          <div key={category} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge bg-blue-200 text-blue-900 px-2 py-1 text-xs font-semibold">
                {capitalize(category)}
              </span>
              <span className="text-xs text-gray-500">{items.length} szt.</span>
            </div>
            <div className="space-y-1">
              {items.map((ing) => (
                <button
                  key={ing.name}
                  onClick={() => onAdd(ing.name)}
                  className="flex items-center w-full justify-between px-3 py-2 rounded bg-white shadow-sm mb-1 transition-colors border border-transparent hover:border-blue-300 hover:bg-blue-50"
                >
                  <Text>{capitalize(ing.name)}</Text>
                  <span className="ml-2 text-emerald-600 font-bold">+</span>
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default IngredientsList;
