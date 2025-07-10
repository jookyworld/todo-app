function TodoItem({ todo, toggleTodo, removeTodo }) {
  return (
    <li className="flex items-center justify-between px-4 py-2 border-b">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          onChange={() => toggleTodo(todo.id)}
          checked={todo.check}
          className="w-5 h-5"
        />
        <span className="text-xs text-gray-500 ml-2">
          {todo.check ? "완료" : "미완료"}
        </span>
        <span className={todo.check ? "line-through text-gray-400" : ""}>
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => removeTodo(todo.id)}
        className="ml-4 text-red-500 hover:underline"
      >
        삭제
      </button>
    </li>
  );
}

export default TodoItem;
