import "./App.css";
import { tasks as tasksData } from "./data";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState(tasksData);

  const handleToggle = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleDelete = (id) => {
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
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
