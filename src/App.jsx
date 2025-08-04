import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";
import { getTodoMessage } from "./utils/todoMessage";

function App() {
  const { todos, addTodo, removeTodo, toggleTodo, updateTodo, loading } =
    useTodos(); //useTodos 훅을 통해 todos 상태와 관련 함수들을 가져옴
  const [editingTodo, setEditingTodo] = useState(null);

  //하단 메시지
  const total = todos.length;
  const done = todos.filter((t) => t.check).length;

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleAddOrUpdate = (text, startTime) => {
    if (editingTodo) {
      // 수정 모드
      updateTodo(editingTodo.id, text, startTime);
      setEditingTodo(null);
      return { success: true };
    } else {
      // 추가 모드
      return addTodo(text, startTime);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    //UI 렌더링
    <>
      <div className="h-screen flex justify-center items-center bg-gradient-to-br from-slate-200 to-slate-400">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 text-center flex flex-col w-full max-w-xl max-h-[90vh] overflow-y-auto mx-2">
          {/* 고정 헤더 */}
          <header className="mb-6 p-4 pb-2 sm:p-8 sm:pb-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg tracking-tight">
              To Do
            </h1>
            <p className="mt-2 text-lg sm:text-xl font-extrabold italic bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg tracking-tight">
              Do What You Do
            </p>
          </header>

          {/* 할일 추가 폼 */}
          <div className="px-2 pb-2 sm:px-8 sm:pb-4">
            <TodoForm
              addTodo={handleAddOrUpdate}
              editingTodo={editingTodo}
              onCancel={handleCancelEdit}
            />
          </div>

          {/* 할일 리스트 */}
          <div className="px-2 sm:px-8">
            <div className="bg-gray-50 p-2 sm:p-4 rounded-lg shadow-inner">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="text-gray-500">로딩 중...</div>
                </div>
              ) : (
                <TodoList
                  todos={todos}
                  toggleTodo={toggleTodo}
                  removeTodo={removeTodo}
                  onEdit={handleEdit}
                />
              )}
            </div>
          </div>

          {/* 고정 푸터 */}
          <footer className="mt-2 text-xs text-gray-500 p-4 pt-2 sm:p-8 sm:pt-4">
            {todos.length === 0 ? (
              <span className="text-red-400 font-medium"></span>
            ) : (
              <>
                총 {todos.length}개의 할 일 중{" "}
                {todos.filter((t) => t.check).length}개 완료!
              </>
            )}
            <p className="mt-4 text-sm text-gray-500">
              {getTodoMessage(total, done)}
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
