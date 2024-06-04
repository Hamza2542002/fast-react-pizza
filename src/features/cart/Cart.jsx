import ButtonLink from "../../components/ButtonLink";
import Button from "../../components/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name);
  const cart = useSelector(getCart);
  function handleClear() {
    dispatch(clearCart());
  }
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="mx-auto w-full max-w-3xl px-7 py-3">
      <ButtonLink to="/menu">&larr; Back to menu</ButtonLink>
      <h2 className="my-4 text-xl font-semibold">Your cart, {userName}</h2>
      <ul className="divide-y divide-stone-200 border-y">
        {cart.map((order, index) => {
          return <CartItem item={order} key={index} />;
        })}
      </ul>
      <div className="mt-10 space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="clear" onClick={handleClear}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
