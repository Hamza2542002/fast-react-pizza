import { Navigate, useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
function Menu() {
  const menu = useLoaderData();
  const userName = useSelector((state) => state.user.name);
  if (!userName) return <Navigate to="/" />;
  return (
    <ul className="mx-auto w-full max-w-3xl px-7">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza?.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
