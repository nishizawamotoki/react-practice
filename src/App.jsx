import "./App.css";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { useContext, useEffect } from "react";
import { ThemeContext, ThemeProvider } from "./ThemeContext";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const [taskState, dispatch] = useLocalStorage();

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "tasks" && event.newValue) {
        dispatch({ type: "sync", tasks: JSON.parse(event.newValue) });
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleAdd = (title) => {
    if (title === "") {
      return;
    }

    const nextId =
      taskState.tasks.length === 0 ? 1 : taskState.tasks.at(-1).id + 1;
    dispatch({ type: "add", title, nextId });
  };

  const handleToggle = (id) => {
    dispatch({ type: "toggle", id });
  };

  const handleDelete = (id) => {
    dispatch({ type: "delete", id });
  };

  const handleUndo = () => {
    dispatch({ type: "undo" });
  };

  return (
    <div className={isDark ? "app dark" : "app"}>
      <label>
        <input
          type="checkbox"
          onChange={() => setIsDark(!isDark)}
          checked={isDark}
          className={isDark ? "dark" : undefined}
        />
        ダークモード
      </label>
      <TaskForm onAdd={handleAdd} />
      <TaskList
        tasks={taskState.tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
      <button onClick={handleUndo} disabled={taskState.history.length === 0}>
        元に戻す
      </button>
    </div>
  );
}
