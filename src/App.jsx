import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodos(); //useTodos 훅을 통해 todos 상태와 관련 함수들을 가져옴

  //하단 메시지
  const getTodoMessage = () => {
    const total = todos.length;
    const done = todos.filter((t) => t.check).length;
    if (total === 0) return "차근차근 ✍️";
    if (done === 0) return "할 일을 시작해 볼까요? 🔥";
    if (done < total * 0.5) return "조금 더 분발해볼까요? 💪";
    if (done < total) return "거의 다 왔어요! 🚀";
    return "대단해요! 모두 완료했어요! 🥳";
  };

  return (
    //UI 렌더링
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
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
            <TodoList
              todos={todos}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            />
          </div>
          <footer className="mt-2 text-xs text-gray-500">
            {todos.length === 0 ? (
              <span className="text-red-400 font-medium"></span>
            ) : (
              <>
                총 {todos.length}개의 할 일 중{" "}
                {todos.filter((t) => t.check).length}개 완료!
              </>
            )}
            <p className="mt-4 text-sm text-gray-500">{getTodoMessage()}</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
