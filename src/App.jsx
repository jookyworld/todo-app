import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodos();

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-gradient-to-br from-slate-200 to-slate-400">
        <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 text-center">
          <header className="mb-6">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg tracking-tight">
              To Do
            </h1>
            <p className="mt-2 text-xl font-extrabold italic bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg tracking-tight">
              Do What You Do
            </p>
          </header>
          <TodoForm addTodo={addTodo} />
          {/* READ */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
            <TodoList
              todos={todos}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            />
          </div>
          <footer className="mt-6 text-sm text-gray-500">
            총 {todos.length}개의 할 일 중 {todos.filter((t) => t.check).length}
            개 완료!
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
