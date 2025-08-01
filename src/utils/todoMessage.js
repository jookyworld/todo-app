export function getTodoMessage(total, done) {
  if (total === 0) return "차근차근 ✍️";
  if (done === 0) return "할 일을 시작해 볼까요? 🔥";
  if (done < total * 0.5) return "조금 더 분발해볼까요? 💪";
  if (done < total) return "거의 다 왔어요! 🚀";
  return "대단해요! 모두 완료했어요! 🥳";
}
