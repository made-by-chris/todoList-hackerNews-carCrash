export default function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.num_comments}
      <a target="_blank" href={todo.url}>
        {todo.text}
      </a>
      <div>
        <button onClick={() => completeTodo(index)}>finished reading</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}
