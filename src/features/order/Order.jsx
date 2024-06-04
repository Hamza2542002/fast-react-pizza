// Test ID: IIDSAT
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "./OrderItem";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  const fetcher = useFetcher();
  useEffect(
    function () {
      if (fetcher.state === "idle" && !fetcher.data) fetcher.load("/menu");
    },
    [fetcher],
  );
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="mx-auto mt-10 max-w-3xl px-7 sm:p-0">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-3">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase text-white">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase text-white">
            {status} order
          </span>
        </div>
      </div>

      <div className="my-4 flex flex-wrap items-center justify-between gap-4 bg-stone-200 px-4 py-3 ">
        <p className="font-semibold text-stone-700">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="dive-stone-200 divide-y border-y py-2">
        {cart.map((order, index) => {
          return (
            <OrderItem
              item={order}
              key={index}
              isLoadingIngredients={fetcher.state === "loading"}
              ingredients={
                fetcher.data?.find((item) => item.id === order.pizzaId)
                  .ingredients ?? []
              }
            />
          );
        })}
      </ul>
      <div className="text-semibold my-4 space-y-2 bg-stone-200 px-4 py-3 ">
        <p className="text-sm">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p className="text-sm">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const id = params?.orderId;
  const order = await getOrder(id);
  return order;
}

export default Order;
