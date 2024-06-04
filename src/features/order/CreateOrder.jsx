import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../components/Button";
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import store from "../../../src/store";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const errors = useActionData();
  const isSumbmitting = navigation.state === "submitting";
  const [isPriority, setPriority] = useState(false);

  const userName = useSelector((state) => state.user.name);
  const address = useSelector((state) => state.user.address);

  const totalCartPrice = useSelector(getTotalPrice);

  const totalPrice = totalCartPrice + (isPriority ? 0.2 * totalCartPrice : 0);

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="mx-auto mt-5 max-w-3xl px-7 sm:px-7">
      <h2 className="mb-5 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST" className="">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <label>First Name</label>
          <div className="w-full sm:w-3/4">
            <input
              type="text"
              name="customer"
              defaultValue={userName}
              required
              className="input"
            />
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
            <input
              type="text"
              name="address"
              defaultValue={address}
              required
              className="input"
            />
            <div className="absolute bottom-1/2 right-2 z-0 translate-y-1/2">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get position
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-10 flex items-center gap-5">
          <input
            type="checkbox"
            onChange={(e) => {
              setPriority(e.target.checked);
            }}
            name="priority"
            id="priority"
            value={isPriority}
            className="h-6 w-6 accent-yellow-400 
            transition-all duration-300 focus:outline-none focus:ring
          focus:ring-yellow-300 focus:ring-offset-2"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <Button type="primary" disabled={isSumbmitting}>
            {isSumbmitting
              ? "Placing order...."
              : `Order Now For ${formatCurrency(totalPrice)}`}
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
    priority: data.priority === "true",
    cart: JSON.parse(data.cart).map((item) => {
      return { ...item, pizzaId: item.id };
    }),
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us a correct phone number, we might need it to contact you";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
