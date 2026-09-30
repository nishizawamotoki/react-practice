import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export default function TaskForm({ onAdd }) {
  const { isDark } = useContext(ThemeContext);
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
        className={isDark ? "dark" : undefined}
      />
      <button>追加</button>
    </form>
  );
}
