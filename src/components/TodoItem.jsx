import { useState, useEffect, useRef } from "react";

function TodoItem({ todo, toggleTodo, removeTodo, onEdit }) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  const handleEdit = () => {
    onEdit(todo);
    setShowOptions(false);
  };

  const handleDelete = () => {
    removeTodo(todo.id);
    setShowOptions(false);
  };

  return (
    <li className="flex flex-wrap sm:flex-nowrap items-center justify-between px-4 py-3 border-b break-words w-full">
      {/* 완료 체크 - 맨 왼쪽 */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          onChange={() => toggleTodo(todo.id)}
          checked={todo.check}
          className="w-5 h-5 accent-purple-500 rounded focus:ring-2 focus:ring-purple-300"
        />
      </div>

      {/* 시작시간 */}
      {todo.start_time && (
        <div className="flex items-center gap-2 text-sm min-w-[100px] ml-4">
          <span className="text-blue-500 text-base">🕐</span>
          <span className="text-gray-700 font-semibold text-sm">
            {todo.start_time}
          </span>
        </div>
      )}

      {/* 할일 텍스트 - 중앙 */}
      <div className="flex-1 px-2 break-words min-w-0">
        <span className={todo.check ? "line-through text-gray-400" : ""}>
          {todo.text}
        </span>
      </div>

      {/* 완료 상태 - 오른쪽 */}
      {todo.check && (
        <span className="text-xs text-green-600 font-medium mr-4">완료</span>
      )}

      {/* 설정 버튼 - 맨 오른쪽 */}
      <div className="relative" ref={optionsRef}>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="text-gray-400 hover:text-gray-600 text-lg transition-colors"
          title="설정"
        >
          ⋮
        </button>

        {/* 수정/삭제 옵션 */}
        {showOptions && (
          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[120px] z-10">
            <button
              onClick={handleEdit}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              ✏️ 수정
            </button>
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              🗑️ 삭제
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
