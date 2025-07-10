import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodos();

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-gradient-to-br from-slate-200 to-slate-400">
        <div className="bg-white p-8 rounded shadow text-center">
          <header className="mb-6">
            <h1 className="text-4xl font-extrabold italic bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg tracking-tight">
              Do What You Do
            </h1>
          </header>
          <TodoForm addTodo={addTodo} />
          {/* READ */}
          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        </div>
      </div>
    </>
  );
}

export default App;
