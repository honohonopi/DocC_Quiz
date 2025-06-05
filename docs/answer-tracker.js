console.log("answer-tracker.js loaded");

// Submitボタンのクリックを監視
document.addEventListener("click", function (event) {
  const submitBtn = event.target.closest("button[type='submit']");
  if (!submitBtn) return;

  // 対応するクイズブロック（.quiz）を取得
  const quizEl = submitBtn.closest(".quiz");
  if (!quizEl) {
    console.warn("❌ .quiz 要素が見つかりません");
    return;
  }

  // 選択された選択肢を取得
  const selectedChoice = quizEl.querySelector("label.choice.active");
  if (!selectedChoice) {
    console.warn("❌ 選択肢が選ばれていません");
    return;
  }

  // 問題文を取得
  const question = quizEl.querySelector(".title.content > p")?.innerText.trim() ?? "Unknown question";

  // 回答テキストを取得（改行込みで複数段になる場合に備え、1行にまとめる）
  const answer = selectedChoice.innerText.trim().replace(/\s+/g, " ");

  // 正誤判定（クラスで判断）
  const correct =
    selectedChoice.classList.contains("correct") ? true :
    selectedChoice.classList.contains("incorrect") ? false :
    null;

  console.log("✅ 送信準備OK:", { question, answer, correct });

  // ※ CORS制限があるため、fetchはブロックされます。以下は参考用。
  /*
  fetch("https://script.google.com/macros/s/AKfycbx.../exec", {
    method: "POST",
    body: JSON.stringify({ question, answer, correct }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => console.log("✅ 送信成功", res))
    .catch(err => console.error("❌ 送信失敗", err));
  */

  // ✨ Google Apps Script に送るなら <form> 経由推奨（CORS回避）
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://script.google.com/macros/s/AKfycbx3HLHZN33qkF18oP6Ln8p7yEbas4LSjZT2bZUQAGMPCXUo9FNUyV5BnTIRymXtxXxA/exec";
  [ ['question', question], ['answer', answer], ['correct', correct] ].forEach(([name, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit(); // ページ遷移が気になる場合は target="_blank" を設定
});
