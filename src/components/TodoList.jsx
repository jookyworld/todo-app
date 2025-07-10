import TodoItem from "./TodoItem";

function TodoList({ todos, toggleTodo, removeTodo }) {
  return (
    <ul>
      {todos
        // .sort((a, b) => a.check - b.check) // check가 false(0)인 것이 위로, true(1)인 것이 아래로
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        ))}
    </ul>
  );
}

export default TodoList;
