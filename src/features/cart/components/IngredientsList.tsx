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

  const filtered = ingredients.filter((ing) =>
    ing.name.toLowerCase().includes(search)
  );

  const grouped = groupByCategory(filtered);

  return (
    <div>
      <h3 className="mb-2">
        <center>Ingredients</center>
      </h3>
      <SearchBar />
      {grouped.map(([category, items]) => (
        <div key={category} className="mb-4">
          <h4 className="text-md font-semibold mb-1">{capitalize(category)}</h4>
          {items.map((ing) => (
            <button
              key={ing.name}
              onClick={() => onAdd(ing.name)}
              disabled={disabledIds.has(ing.name)}
              className={`block w-full text-left mb-1 px-2 py-1 rounded ${
                disabledIds.has(ing.name)
                  ? "bg-gray-200 text-gray-400"
                  : "bg-blue-100 hover:bg-blue-200"
              }`}
            >
              <Text>{capitalize(ing.name)}</Text>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default IngredientsList;
