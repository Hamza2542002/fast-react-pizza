import { useSelector } from "react-redux";

function UserName() {
  const userName = useSelector((state) => state.user.name);

  return (
    <div className="hidden text-sm font-semibold sm:block">{userName}</div>
  );
}

export default UserName;
