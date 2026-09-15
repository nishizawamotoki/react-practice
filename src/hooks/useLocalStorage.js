import { useEffect, useReducer } from "react";
import { tasks as tasksData } from "../data";

export default function useLocalStorage() {
  const [state, dispatch] = useReducer(tasksReducer, undefined, () => {
    const saved = localStorage.getItem("tasks");
    return {
      tasks: saved ? JSON.parse(saved) : tasksData,
      history: [],
    };
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  return [state, dispatch];
}

function tasksReducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        history: [...state.history, state.tasks],
        tasks: [
          ...state.tasks,
          {
            id: state.tasks.length === 0 ? 1 : state.tasks.at(-1).id + 1,
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
