import { formatCurrency } from "../../utils/helpers";
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  return (
    <li className="px-3 py-3">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {name}
          <span className="mt-2 block text-sm capitalize italic text-stone-500">
            {isLoadingIngredients ? "Loading .." : ingredients?.join(", ")}
          </span>
        </p>
        <p className="start me-2 text-sm font-bold">
          {formatCurrency(totalPrice)}
        </p>
      </div>
    </li>
  );
}

export default OrderItem;
