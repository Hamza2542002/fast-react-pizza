import { formatCurrency } from "../../utils/helpers";
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="start me-2 text-sm font-bold">
          {formatCurrency(totalPrice)}
        </p>
      </div>
    </li>
  );
}

export default OrderItem;
