import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [querry, setQuerry] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!querry) return;
    navigate(`/order/${querry}`);
    setQuerry("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400  focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 sm:w-64 sm:focus:w-72"
        type="text"
        placeholder="search Oreder #"
        onChange={(e) => setQuerry(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
