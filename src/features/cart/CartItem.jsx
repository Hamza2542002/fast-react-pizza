import { formatCurrency } from "../../utils/helpers";
import Button from "../../components/Button";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <div className="flex items-center justify-between">
          <p className="start me-2 text-sm font-semibold">
            {formatCurrency(totalPrice)}
          </p>
          <div className="mx-3 flex items-center space-x-2">
            <Button type="rounded">-</Button>
            <span>1</span>
            <Button type="rounded">+</Button>
            <Button type="small">Delete</Button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
