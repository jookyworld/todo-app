function TodoForm({ addTodo }) {
  // form(등록버튼) 처리하는 핸들러
  const Submit = (e) => {
    e.preventDefault(); //새로고침 방지
    const form = e.target;
    const text = form.todo.value.trim(); // 입력값의 앞뒤 공백 제거

    const result = addTodo(text); //addTodo 함수 호출 해서
    if (!result.success) {
      //결과
      alert(result.message);
      return;
    }
    form.todo.value = ""; // 입력 후 입력창 비우기
  };

  return (
    <>
      <form onSubmit={Submit} className="flex justify-center gap-2 mt-4">
        <input
          className="border-2 border-gray-300 rounded p-2 flex-1"
          type="text"
          name="todo"
          placeholder="할 일을 입력해주세요"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow hover:brightness-110 transition"
        >
          추가
        </button>
      </form>
    </>
  );
}

export default TodoForm;
