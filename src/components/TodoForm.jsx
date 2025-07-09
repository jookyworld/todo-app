function TodoForm({ addTodo }) {
  // form(등록버튼) 처리하는 핸들러
  const Submit = (e) => {
    e.preventDefault();
    const form = e.target;
    addTodo(form.todo.value);
  };

  return (
    <>
      <form onSubmit={Submit}>
        <input type="text" name="todo" />
        <button type="submit">등록</button>
      </form>
    </>
  );
}

export default TodoForm;
