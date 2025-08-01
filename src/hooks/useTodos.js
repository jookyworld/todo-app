import { useRef, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Supabase에서 todos 로드
  const loadTodos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading todos:", error);
        return;
      }

      setTodos(data || []);
    } catch (error) {
      console.error("Error loading todos:", error);
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드
  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async (text, startTime) => {
    //빈 제출 검증
    if (!text) {
      return { success: false, message: "할 일을 입력해주세요!" };
    }
    //중복된 일 제출 검증
    if (todos.some((todo) => todo.text === text)) {
      return { success: false, message: "이미 추가된 일입니다!" };
    }

    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([
          {
            text,
            start_time: startTime,
            check: false,
          },
        ])
        .select();

      if (error) {
        console.error("Error adding todo:", error);
        return { success: false, message: "할일 추가 중 오류가 발생했습니다." };
      }

      // 로컬 상태 업데이트
      await loadTodos();
      return { success: true };
    } catch (error) {
      console.error("Error adding todo:", error);
      return { success: false, message: "할일 추가 중 오류가 발생했습니다." };
    }
  };

  //DELETE
  const removeTodo = async (deleteId) => {
    try {
      // 로컬 상태 먼저 업데이트 (즉시 반응)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deleteId));

      // Supabase에서 삭제
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", deleteId);

      if (error) {
        console.error("Error deleting todo:", error);
        // 에러 발생 시 원래 상태로 되돌리기
        await loadTodos();
        return;
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      // 에러 발생 시 원래 상태로 되돌리기
      await loadTodos();
    }
  };

  //UPDATE
  const toggleTodo = async (selectedId) => {
    try {
      const todo = todos.find((t) => t.id === selectedId);
      if (!todo) return;

      // 로컬 상태 먼저 업데이트 (즉시 반응)
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === selectedId ? { ...t, check: !t.check } : t
        )
      );

      // Supabase에 업데이트
      const { error } = await supabase
        .from("todos")
        .update({ check: !todo.check })
        .eq("id", selectedId);

      if (error) {
        console.error("Error toggling todo:", error);
        // 에러 발생 시 원래 상태로 되돌리기
        setTodos((prevTodos) =>
          prevTodos.map((t) =>
            t.id === selectedId ? { ...t, check: todo.check } : t
          )
        );
        return;
      }
    } catch (error) {
      console.error("Error toggling todo:", error);
      // 에러 발생 시 원래 상태로 되돌리기
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === selectedId ? { ...t, check: todo.check } : t
        )
      );
    }
  };

  //UPDATE - 할일 수정
  const updateTodo = async (todoId, newText, newStartTime) => {
    try {
      // 로컬 상태 먼저 업데이트 (즉시 반응)
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId
            ? { ...todo, text: newText, start_time: newStartTime }
            : todo
        )
      );

      // Supabase에 업데이트
      const { error } = await supabase
        .from("todos")
        .update({
          text: newText,
          start_time: newStartTime,
        })
        .eq("id", todoId);

      if (error) {
        console.error("Error updating todo:", error);
        // 에러 발생 시 원래 상태로 되돌리기
        await loadTodos();
        return;
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      // 에러 발생 시 원래 상태로 되돌리기
      await loadTodos();
    }
  };

  // 시작시간 순으로 정렬된 todos
  const sortedTodos = [...todos].sort((a, b) => {
    // 시작시간이 없는 할일을 가장 위로
    if (!a.start_time && !b.start_time) return 0;
    if (!a.start_time) return -1;
    if (!b.start_time) return 1;

    // 시작시간이 있는 할일들은 시간 순으로 정렬
    return a.start_time.localeCompare(b.start_time);
  });

  return {
    todos: sortedTodos,
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
    loading,
  };
}
