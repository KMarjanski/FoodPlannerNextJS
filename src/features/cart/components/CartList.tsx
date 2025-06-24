import { Ingredient } from "@core/entities/ingredients/model";
import { capitalize, groupByCategory } from "@shared/lib/utils";

type Props = {
  cartItems: Ingredient[];
  onRemove: (id: string) => void;
};

const CartList = ({ cartItems, onRemove }: Props) => {
  const grouped = groupByCategory(cartItems);
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Koszyk</h3>
      {grouped.map(([category, items]) => (
        <div key={category} className="mb-4">
          <h4 className="text-md font-semibold mb-1">{capitalize(category)}</h4>
          {items.map((ing) => (
            <div key={ing.name} className="flex justify-between">
              <span>{capitalize(ing.name)}</span>
              <button onClick={() => onRemove(ing.name)}>🗑️</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CartList;
