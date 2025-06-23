import { Ingredient } from "@core/entities/ingredients/model";

type Props = {
  cartItems: Ingredient[];
  onRemove: (id: string) => void;
};

const CartList = ({ cartItems, onRemove }: Props) => (
  <div>
    <h3 className="text-lg font-bold mb-2">Koszyk</h3>
    {cartItems.map((item) => (
      <div key={item.name} className="flex justify-between items-center">
        <span>{item.name}</span>
        <button onClick={() => onRemove(item.name)}>🗑️</button>
      </div>
    ))}
  </div>
);

export default CartList;
