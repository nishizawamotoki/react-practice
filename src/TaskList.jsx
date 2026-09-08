import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function TaskList({ tasks, onToggle, onDelete }) {
  const { isDark } = useContext(ThemeContext);
  const listTask = tasks.map((task) => (
    <li key={task.id}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className={isDark ? "dark" : undefined}
        />
        {task.completed ? <del>{task.title}</del> : task.title}
      </label>
      <button onClick={() => onDelete(task.id)}>削除</button>
    </li>
  ));

  return <ul>{listTask}</ul>;
}
