console.log("answer-tracker.js loaded");

document.addEventListener("click", function (event) {
  const choice = event.target.closest("label.choice.active.disabled");
  if (!choice) {
    console.log("❌ label.choice が見つかりません");
    return;
  }

  const questionEl = choice.closest(".quiz");
  if (!questionEl) {
    console.log("❌ .quiz が見つかりません");
    return;
  }

  const question = questionEl?.querySelector(".title.content > p")?.innerText.trim() ?? "Unknown question";
  const answer = choice.innerText.trim();

  // 選択された要素に "correct" または "incorrect" クラスが含まれているか
  const correct =
    choice.classList.contains("correct") ? true :
    choice.classList.contains("incorrect") ? false :
    null;

  console.log("✅ 送信準備OK:", { question, answer, correct });

  fetch("https://script.google.com/macros/s/AKfycbx3HLHZN33qkF18oP6Ln8p7yEbas4LSjZT2bZUQAGMPCXUo9FNUyV5BnTIRymXtxXxA/exec", {
    method: "POST",
    body: JSON.stringify({ question, answer, correct }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => console.log("✅ 送信成功", res))
    .catch(err => console.error("❌ 送信失敗", err));
});
