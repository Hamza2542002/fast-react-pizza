import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../components/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

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

function CreateOrder() {
  const cart = fakeCart;
  const navigation = useNavigation();
  const errors = useActionData();
  const isSumbmitting = navigation.state === "submitting";

  return (
    <div className="mx-auto mt-5 max-w-3xl px-7 sm:px-0">
      <h2 className="mb-5 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST" className="">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <label>First Name</label>
          <div className="w-full sm:w-3/4">
            <input type="text" name="customer" required className="input" />
          </div>
        </div>
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <label>Phone number</label>
          <div className="w-full sm:w-3/4">
            <input type="tel" name="phone" required className="input" />
            {errors?.phone && (
              <span className="mt-3 block rounded-lg bg-red-200 p-2 text-sm text-red-700">
                {errors?.phone}
              </span>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <label>Address</label>
          <div className="relative z-0 w-full sm:w-3/4">
            <input type="text" name="address" required className="input" />
            <div className="absolute bottom-1/2 right-2 z-0 translate-y-1/2">
              <Button type="small">get position</Button>
            </div>
          </div>
        </div>

        <div className="mb-10 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 
            transition-all duration-300 focus:outline-none focus:ring
          focus:ring-yellow-300 focus:ring-offset-2"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <Button type="primary" disabled={isSumbmitting}>
            {isSumbmitting ? "Placing order...." : "Order Now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    priority: data.priority === "on" ? true : false,
    cart: JSON.parse(data.cart),
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us a correct phone number, we might need it to contact you";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
