import ButtonLink from "../../components/ButtonLink";
import Button from "../../components/Button";
import CartItem from "./CartItem";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;
  return (
    <div className="mx-auto w-full max-w-3xl px-7 py-3">
      <ButtonLink to="/menu">&larr; Back to menu</ButtonLink>
      <h2 className="my-4 text-xl font-semibold">Your cart, Hamza</h2>
      <ul className="divide-y divide-stone-200 border-b">
        {cart.map((order, index) => {
          return <CartItem item={order} key={index} />;
        })}
      </ul>
      <div className="mt-10 space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="clear">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
