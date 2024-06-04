import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";
import { useSelector } from "react-redux";

function Header() {
  const userName = useSelector((state) => state.user.name);
  return (
    <header className="flex items-center justify-between bg-yellow-400 px-7 py-3 uppercase sm:px-7 sm:py-3">
      <Link to={userName ? "/menu" : "/"} className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      {userName && <UserName />}
    </header>
  );
}

export default Header;
