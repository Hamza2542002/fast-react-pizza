import { useFetcher } from "react-router-dom";
import Button from "../../components/Button";
import { updateOrder } from "../../services/apiRestaurant";
function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="small">Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const orderId = params.orderId;
  const data = { priority: true };
  await updateOrder(orderId, data);
  return null;
}
