import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getQuantity, getTotalPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalPrice = useSelector(getTotalPrice);
  const quantity = useSelector(getQuantity);
  if (!quantity) return;
  return (
    <div className="flex justify-between bg-stone-800 px-7 py-3 text-sm uppercase text-stone-200 sm:px-7 sm:py-4 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300">
        <span>{quantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to={"/cart"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
