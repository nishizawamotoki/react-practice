import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button>追加</button>
    </form>
  );
}
