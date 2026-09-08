import "./App.css";
import { tasks as tasksData } from "./data";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { useReducer } from "react";

export default function App() {
  const [taskState, dispatch] = useReducer(tasksReducer, {
    history: [],
    tasks: tasksData,
  });

  const handleAdd = (title) => {
    if (title === "") {
      return;
    }

    dispatch({ type: "add", title });
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
    <>
      <TaskForm onAdd={handleAdd} />
      <TaskList
        tasks={taskState.tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
      <button onClick={handleUndo} disabled={taskState.history.length === 0}>
        元に戻す
      </button>
    </>
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
            id: state.tasks.length === 0 ? 1 : state.tasks.at(-1) + 1,
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
