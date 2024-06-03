import { formatCurrency } from "../../utils/helpers";
import Button from "../../components/Button";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

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
          <p className="text-sm capitalize italic">{ingredients.join(", ")}</p>
        </div>
        <div className="flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && <Button type="small">Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
