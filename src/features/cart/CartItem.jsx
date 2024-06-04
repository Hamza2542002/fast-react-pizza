import { formatCurrency } from "../../utils/helpers";
import CartUtilities from "../../components/CartUtilities";

function CartItem({ item }) {
  const { name, quantity, totalPrice, ingredients } = item;

  return (
    <li className="py-3">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {name}
          <span className="mt-2 block text-sm capitalize italic">
            {ingredients?.join(", ")}
          </span>
        </p>
        <div className="flex items-center justify-between">
          <p className="start me-2 text-sm font-semibold">
            {formatCurrency(totalPrice)}
          </p>
          <CartUtilities item={item} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
