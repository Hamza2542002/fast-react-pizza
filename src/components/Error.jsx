import { useRouteError } from "react-router-dom";
import ButtonLink from "./ButtonLink";

function Error() {
  const error = useRouteError();
  return (
    <div className="mt-5">
      <h1>Something went wrong 😢</h1>
      <p>{error?.data || error.message}</p>
      <ButtonLink to={"-1"}>&larr; Go back</ButtonLink>
    </div>
  );
}

export default Error;
