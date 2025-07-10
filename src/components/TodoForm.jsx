function TodoForm({ addTodo }) {
  // form(등록버튼) 처리하는 핸들러
  const Submit = (e) => {
    e.preventDefault();
    const form = e.target;
    const text = form.todo.value.trim(); // 입력값의 앞뒤 공백 제거
    addTodo(form.todo.value);
    form.todo.value = ""; // 입력 후 입력창 비우기
  };

  return (
    <>
      <form onSubmit={Submit}>
        <input
          className="border-2 border-gray-300 rounded p-2"
          type="text"
          name="todo"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          type="submit"
        >
          추가
        </button>
      </form>
    </>
  );
}

export default TodoForm;
