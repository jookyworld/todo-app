function TodoItem({ todo, toggleTodo, removeTodo }) {
  return (
    <li key={todo.id}>
      <input
        type="checkbox"
        onChange={() => {
          toggleTodo(todo.id);
        }}
        checked={todo.check}
      />
      {todo.check ? "완료" : "미완료"} | {todo.id} | {todo.text}{" "}
      <button onClick={() => removeTodo(todo.id)}>삭제</button>
    </li>
  );
}

export default TodoItem;
