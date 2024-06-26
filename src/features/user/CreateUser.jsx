import { useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "./userSlice";

function CreateUser() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(createUser(username));
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm font-medium text-stone-600 sm:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8 w-72"
      />

      {username !== "" && (
        <div>
          <Button onClick={() => navigate("/menu")} type="primary">
            Start ordering
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
