import "./App.css";
import { tasks as tasksData } from "./data";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState(tasksData);

  const handleToggle = (id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTasks(newTasks);
  };

  const handleDelete = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const handleAdd = (title) => {
    if (title === "") {
      return;
    }

    const lastTask = tasks.at(-1);
    const newTask = {
      id: (lastTask?.id ?? 0) + 1,
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <>
      <TaskForm onAdd={handleAdd} />
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </>
  );
}
