export default function TaskList({ tasks, onToggle, onDelete }) {
  const listTask = tasks.map((task) => (
    <li key={task.id}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        {task.completed ? <del>{task.title}</del> : task.title}
      </label>
      <button onClick={() => onDelete(task.id)}>削除</button>
    </li>
  ));

  return <ul>{listTask}</ul>;
}
