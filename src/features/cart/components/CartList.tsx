import Text from "@/src/shared/components/topography/Text";
import { Ingredient } from "@core/entities/ingredients/model";
import { capitalize, groupByCategory } from "@shared/lib/utils";

type Props = {
  cartItems: Ingredient[];
  onRemove: (id: string) => void;
};

const CartList = ({ cartItems, onRemove }: Props) => {
  const grouped = groupByCategory(cartItems);
  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-bold text-emerald-700 mb-4 text-center">Twój koszyk</h3>
      {cartItems.length === 0 ? (
        <Text className="text-gray-400 text-center">Koszyk jest pusty.</Text>
      ) : (
        grouped.map(([category, items]) => (
          <div key={category} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge bg-emerald-600 text-white px-2 py-1 text-xs font-semibold">
                {capitalize(category)}
              </span>
              <span className="text-xs text-gray-500">{items.length} szt.</span>
            </div>
            <div className="space-y-1">
              {items.map((ing) => (
                <div key={ing.name} className="flex items-center justify-between bg-white rounded px-3 py-2 shadow-sm">
                  <Text>{capitalize(ing.name)}</Text>
                  <button
                    onClick={() => onRemove(ing.name)}
                    className="ml-2 text-emerald-600 hover:text-emerald-800 transition-colors p-1 rounded"
                    aria-label={`Odłóż ${capitalize(ing.name)} z koszyka`}
                  >
                    <span role="img" aria-label="Odłóż">↩️</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartList;
