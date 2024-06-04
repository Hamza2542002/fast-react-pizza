import ButtonLink from "../../components/ButtonLink";

function EmptyCart() {
  return (
    <div>
      <ButtonLink to="/menu">&larr; Back to menu</ButtonLink>

      <p className="mt-4">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
