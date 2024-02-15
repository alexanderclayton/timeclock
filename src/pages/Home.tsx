import { useState } from "react";

export const Home = () => {
  const [id, setId] = useState("");

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(id);
  };

  return (
    <div>
      <form onSubmit={formSubmit}>
        <label htmlFor="volunteerId">ID:</label>
        <input
          type="text"
          id="volunteerId"
          onChange={(e) => setId(e.target.value)}
          value={id}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
