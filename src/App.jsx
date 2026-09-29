import "./App.css";
import { tasks as tasksData } from "./data";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { useContext, useReducer } from "react";
import { ThemeContext, ThemeProvider } from "./ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const [taskState, dispatch] = useReducer(tasksReducer, {
    history: [],
    tasks: tasksData,
  });

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

function tasksReducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        history: [...state.history, state.tasks],
        tasks: [
          ...state.tasks,
          {
            id: action.nextId,
            title: action.title,
            completed: false,
          },
        ],
      };
    case "toggle":
      return {
        history: [...state.history, state.tasks],
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? { ...task, completed: !task.completed }
            : task,
        ),
      };
    case "delete":
      return {
        history: [...state.history, state.tasks],
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case "undo":
      return {
        history: [...state.history.slice(0, -1)],
        tasks: state.history.at(-1),
      };
    default:
      return state.tasks;
  }
}
