import TodoItem from "./TodoItem";

function TodoList({ todos, toggleTodo, removeTodo, onEdit }) {
  return (
    <ul className="min-w-[400px]">
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
