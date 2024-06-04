import { useDispatch } from "react-redux";
import { deleteItem, updateItemQuantity } from "../features/cart/cartSlice";
import Button from "./Button";

function CartUtilities({ item }) {
  const dispatch = useDispatch();

  function handleUpdateQ(quantity) {
    if (item.quantity === 0 && quantity === -1) return;
    dispatch(updateItemQuantity({ pizzaId: item.id, quantity }));
  }

  function handleDelete() {
    dispatch(deleteItem(item.id));
  }

  return (
    <div className="mx-3 flex items-center space-x-3">
      <Button type="rounded" onClick={() => handleUpdateQ(-1)}>
        -
      </Button>
      <span>{item.quantity}</span>
      <Button type="rounded" onClick={() => handleUpdateQ(1)}>
        +
      </Button>
      <Button type="small" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}

export default CartUtilities;
