console.log("answer-tracker.js loaded");

document.addEventListener("click", function (event) {
  console.log("クリックされた要素:", event.target);

  // 選択肢（data-correct 属性を持つ最も近い要素）
  const choice = event.target.closest("[data-correct]");
  if (!choice) {
    console.log("❌ data-correct を持つ選択肢が見つかりません");
    return;
  }

  // 問題全体の親要素
  const questionEl = choice.closest(".assessment");
  if (!questionEl) {
    console.log("❌ .assessment が見つかりません");
    return;
  }

  const question = questionEl.querySelector("h2")?.innerText ?? "Unknown question";
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
