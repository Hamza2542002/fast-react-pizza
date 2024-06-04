import { formatCurrency } from "../../utils/helpers";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCart } from "../cart/cartSlice";
import CartUtilities from "../../components/CartUtilities";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const item = cart.find((i) => i.id === id);
  function handleAddition() {
    const newItem = {
      id,
      name,
      quantity: 1,
      ingredients,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 border-b border-b-stone-300 py-3">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex w-full grow flex-col justify-between">
        <div>
          <p className="mb-1 font-medium">{name}</p>
          <p className="mb-2 text-sm capitalize italic">
            {ingredients.join(", ")}
          </p>
        </div>
        <div className="flex items-center justify-between">
          {!soldOut ? (
            <>
              <p className="text-sm">{formatCurrency(unitPrice)}</p>
              {item ? (
                <CartUtilities item={item} />
              ) : (
                <Button type="small" onClick={handleAddition}>
                  Add to cart
                </Button>
              )}
            </>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
