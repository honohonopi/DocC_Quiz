console.log("answer-tracker.js loaded");

document.addEventListener("click", function (event) {
  const choice = event.target.closest("label.choice");
  if (!choice) {
    console.log("❌ label.choice が見つかりません");
    return;
  }

  const questionEl = choice.closest(".quiz"); // .assessment ではなく .quiz に修正
  if (!questionEl) {
    console.log("❌ .quiz が見つかりません");
    return;
  }

  const question = questionEl.querySelector("h2")?.innerText ?? "Unknown question";
  const answer = choice.innerText.trim();

  // 正誤の判定がHTMLにない場合は「Submit」時に処理する or 不明としてfalse扱い
  const correct = null; // 正誤不明だが、送信だけはできるようにする

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
