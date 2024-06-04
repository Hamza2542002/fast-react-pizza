import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
function Home() {
  const userName = useSelector((state) => state.user.name);
  return (
    <div className="my-10 text-center">
      <h1 className="mb-8 px-5 text-center text-xl font-semibold sm:px-16 md:text-3xl">
        The best pizza.
        <br />
        <span className="font-semibold text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {userName ? (
        <Button to={"/menu"} type="primary">
          Continue ordring.. , {userName}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
