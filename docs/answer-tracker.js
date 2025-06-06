console.log("answer-tracker.js loaded");

// Submitボタンが押されたときの処理
document.addEventListener("click", function (event) {
  const submitBtn = event.target.closest("button[type='submit']");
  if (!submitBtn) return;

  // 対応するクイズ全体を取得
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

  // 回答内容を取得（改行などをまとめて1行に）
  const answer = selectedChoice.innerText.trim().replace(/\s+/g, " ");

  // 正誤をクラスで判定
  const correct =
    selectedChoice.classList.contains("correct") ? true :
    selectedChoice.classList.contains("incorrect") ? false :
    null;

  console.log("✅ 送信準備OK:", { question, answer, correct });

  // Google Apps Script にフォーム送信
  sendViaForm(question, answer, correct);
});

// CORSを回避してGASにデータ送信する関数
function sendViaForm(question, answer, correct) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://script.google.com/macros/s/AKfycbyAhsEUSnstTwXTzOH2UTGxkg6Ydikz-Npr_Qi-VaUGhAlp2nDqWawnxt4_J6PJpUMG/exec';

  // 各データをhiddenフィールドとして追加
  const addInput = (name, value) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };

  addInput('question', question);
  addInput('answer', answer);
  addInput('correct', correct);

  // ページ遷移を避けたい場合は target="_blank" をつけてもよい
  form.style.display = 'none';
  document.body.appendChild(form);
  form.submit();
}
