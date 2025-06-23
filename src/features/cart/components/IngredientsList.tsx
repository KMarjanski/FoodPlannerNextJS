import { Ingredient } from "@core/entities/ingredients/model";

type Props = {
  ingredients: Ingredient[];
  cartItems: Ingredient[];
  onAdd: (id: string) => void;
};

const IngredientsList = ({ ingredients, cartItems, onAdd }: Props) => {
  const disabledIds = new Set(cartItems.map((item) => item.name));

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Składniki</h3>
      {ingredients.map((ing) => (
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
          {ing.name}
        </button>
      ))}
    </div>
  );
};

export default IngredientsList;
