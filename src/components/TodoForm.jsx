import { useState, useEffect } from "react";

function TodoForm({ addTodo, editingTodo, onCancel }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState({
    hour: "00",
    minute: "00",
  });

  // 수정 모드일 때 기존 데이터로 초기화
  useEffect(() => {
    if (editingTodo) {
      setIsModalOpen(true);
      if (editingTodo.startTime) {
        const [hour, minute] = editingTodo.startTime.split(":");
        setStartTime({
          hour: hour,
          minute: minute,
        });
      } else {
        setStartTime({ hour: "00", minute: "00" });
      }
    }
  }, [editingTodo]);

  // 시간을 24시간 형식으로 변환하는 함수
  const convertTo24Hour = (timeObj) => {
    if (!timeObj.hour || !timeObj.minute) return "00:00";

    return `${timeObj.hour.toString().padStart(2, "0")}:${timeObj.minute}`;
  };

  // form(등록버튼) 처리하는 핸들러
  const Submit = (e) => {
    e.preventDefault(); //새로고침 방지
    const form = e.target;
    const text = form.todo.value.trim(); // 입력값의 앞뒤 공백 제거

    const startTime24 = convertTo24Hour(startTime);

    const result = addTodo(text, startTime24, ""); //addTodo 함수 호출 해서
    if (!result.success) {
      //결과
      alert(result.message);
      return;
    }
    form.todo.value = ""; // 입력 후 입력창 비우기
    setStartTime({ hour: "00", minute: "00" });
    setIsModalOpen(false); // 모달 닫기
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStartTime({ hour: "00", minute: "00" });
    if (editingTodo) {
      onCancel();
    }
  };

  return (
    <>
      {/* 할일 추가 버튼 */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
        >
          + 할일 추가
        </button>
      </div>

      {/* 모달 오버레이 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingTodo ? "할일 수정" : "새 할일 추가"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={Submit}>
              {/* 할일 입력 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  할 일
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors placeholder-gray-400"
                  type="text"
                  name="todo"
                  placeholder="할 일을 입력해주세요"
                  defaultValue={editingTodo ? editingTodo.text : ""}
                  autoFocus
                />
              </div>

              {/* 시간 입력 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  시작시간
                </label>
                <div className="flex gap-2">
                  <select
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-gray-50"
                    value={startTime.hour}
                    onChange={(e) =>
                      setStartTime({ ...startTime, hour: e.target.value })
                    }
                  >
                    {[
                      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                      17, 18, 19, 20, 21, 22, 23,
                    ].map((hour) => (
                      <option
                        key={hour}
                        value={hour.toString().padStart(2, "0")}
                      >
                        {hour.toString().padStart(2, "0")} 시
                      </option>
                    ))}
                  </select>
                  <select
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-gray-50"
                    value={startTime.minute}
                    onChange={(e) =>
                      setStartTime({ ...startTime, minute: e.target.value })
                    }
                  >
                    {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(
                      (minute) => (
                        <option
                          key={minute}
                          value={minute.toString().padStart(2, "0")}
                        >
                          {minute.toString().padStart(2, "0")} 분
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* 버튼 영역 */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow hover:shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200"
                >
                  {editingTodo ? "수정" : "추가"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoForm;
