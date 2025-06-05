console.log("answer-tracker.js loaded");

document.querySelector("button[type='submit']").addEventListener("click", function () {
  const selectedChoice = document.querySelector("label.choice.active");
  if (!selectedChoice) {
    console.warn("❌ 選択肢が選ばれていません");
    return;
  }

  const answer = selectedChoice.innerText.trim();
  const correct = selectedChoice.classList.contains("correct");
  const question = document.querySelector(".quiz .title.content > p")?.innerText.trim() ?? "Unknown question";

  console.log("✅ 送信準備", { question, answer, correct });

  // fetch またはフォーム送信など
});
