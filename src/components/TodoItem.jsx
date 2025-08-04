import { useState, useEffect, useRef } from "react";

function getTimeBgClass(startTime) {
  if (!startTime) return "bg-white";
  const hour = parseInt(startTime.slice(0, 2), 10);
  if (hour >= 6 && hour < 12) return "bg-yellow-50 bg-opacity-50"; // 06~11시
  if (hour >= 12 && hour < 18) return "bg-red-50 bg-opacity-50"; // 12~17시
  // 18~23시 또는 0~5시
  return "bg-blue-50 bg-opacity-50";
}

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
    <li
      className={
        `flex flex-wrap sm:flex-nowrap items-center justify-between px-4 py-1.5 border-b break-words w-full ` +
        getTimeBgClass(todo.start_time)
      }
    >
      {/* 완료 체크 - 맨 왼쪽 */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          onChange={() => toggleTodo(todo.id)}
          checked={todo.check}
          className="w-5 h-5 accent-purple-500 rounded focus:ring-2 focus:ring-purple-300"
        />
      </div>

      {/* 시간 */}
      {todo.start_time && (
        <div className="flex flex-col items-center justify-center min-w-[40px] mx-1">
          <span className="text-[11px] text-gray-600 font-semibold leading-tight">
            {todo.start_time}
          </span>
          <span className="text-[10px] text-gray-500 leading-none">~</span>
          <span className="text-[11px] text-gray-600 font-semibold leading-tight">
            {todo.end_time}
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
