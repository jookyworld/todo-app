import { useRef, useState, useEffect } from "react";
import { getItem, setItem } from "../utils/storage";

export function useTodos() {
  const nextId = useRef(5);

  const [todos, setTodos] = useState(() =>
    getItem("todos", [
      { id: 1, text: "공부하기", check: true },
      { id: 2, text: "운동하기", check: false },
      { id: 3, text: "샤워하기", check: false },
      { id: 4, text: "요리하기", check: false },
    ])
  );

  useEffect(() => {
    setItem("todos", todos);
  }, [todos]);

  //CREATE
  const addTodo = (text) => {
    //빈칸 등록
    if (!text) {
      alert("할일을 입력해주세요!");
      return;
    }
    //중복
    if (todos.some((todo) => todo.text === text)) {
      alert("이미 추가된 일입니다!");
      return;
    }

    const todo = { id: nextId.current, text, check: false }; //추가할 todo
    const updatedTodos = setTodos([todo, ...todos]); //setter 이용해 todo 추가
    setItem("todos", updatedTodos);
    nextId.current++; //다음 id 증가
  };

  //DELETE
  const removeTodo = (deleteId) => {
    const remainTodos = todos.filter((todo) => todo.id != deleteId);
    setTodos(remainTodos); //setter 이용해 제외된 todos로 업데이트
    setItem("todos", JSON.stringify(remainTodos));
  };

  //UPDATE
  const toggleTodo = (selectedId) => {
    const updateTodos = todos.map((todo) =>
      todo.id == selectedId ? { ...todo, check: !todo.check } : todo
    );
    setTodos(updateTodos);
    setItem("todos", JSON.stringify(updateTodos));
  };

  return { todos, addTodo, removeTodo, toggleTodo };
}
