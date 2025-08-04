import TodoItem from "./TodoItem";

function TodoList({ todos, toggleTodo, removeTodo, onEdit }) {
  return (
    <ul className="h-full w-full min-w-0 break-words">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;
