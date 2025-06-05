console.log("answer-tracker.js loaded");
document.addEventListener("click", function (event) {
  console.log("クリックされた要素:", event.target);

  const choice = event.target.closest(".multiple-choice-option");
  if (!choice) {
    console.log("❌ .multiple-choice-option が見つかりません");
    return;
  }

  const questionEl = choice.closest(".multiple-choice");
  if (!questionEl) {
    console.log("❌ .multiple-choice が見つかりません");
    return;
  }

  const question = questionEl.querySelector(".multiple-choice-question")?.innerText ?? "Unknown question";
  const answer = choice.innerText.trim();
  const correct = choice.getAttribute("data-correct") === "true";

  console.log("✅ 送信準備OK:", { question, answer, correct });

  fetch("https://script.google.com/macros/s/AKfycbzbnLTbinjMT5rYM-YjNHyfoJ0Y2JG7UhfrBIxZ2bGPJFHSTfIZrw5_DEaUTcf4ejBW/exec", {
    method: "POST",
    body: JSON.stringify({ question, answer, correct }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => console.log("✅ 送信成功", res))
    .catch(err => console.error("❌ 送信失敗", err));
});
