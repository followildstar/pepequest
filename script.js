const screens = document.querySelectorAll(".screen");

const STORAGE_KEY = "pepeQuestCurrentScreen";

let currentScreen = Number(
  localStorage.getItem(STORAGE_KEY) || 0
);

function showScreen(index) {
  if (index < 0) {
    index = 0;
  }

  if (index >= screens.length) {
    index = screens.length - 1;
  }

  screens.forEach((screen, i) => {
    screen.classList.toggle(
      "is-active",
      i === index
    );
  });

  currentScreen = index;

  localStorage.setItem(
    STORAGE_KEY,
    String(currentScreen)
  );

  window.scrollTo(0, 0);
}
function nextScreen() {
  const nextIndex = currentScreen + 1;

  if (nextIndex < screens.length) {
    showScreen(nextIndex);
  }
}

function prevScreen() {
  const prevIndex = currentScreen - 1;

  if (prevIndex >= 0) {
    showScreen(prevIndex);
  }
}
document
  .querySelectorAll("[data-next]")
  .forEach((button) => {
    button.addEventListener("click", nextScreen);
  });

document
  .querySelectorAll("[data-prev]")
  .forEach((button) => {
    button.addEventListener("click", prevScreen);
  });

/* --------------------------------
   QUEST 02 정답
-------------------------------- */

const CORRECT_ANSWER = "354-B";

const wrongMessages = [
  "음... 다시 한번.",
  "글쎄...",
  "다시 한번 해볼래?"
];

let wrongCount = 0;

const answerInput =
  document.querySelector("#questAnswer");

const answerError =
  document.querySelector("#answerError");

const checkAnswerBtn =
  document.querySelector("#checkAnswerBtn");


function normalizeAnswer(value) {
  return String(value)
    .trim()
    .replace(/\s+/g, "")
    .toUpperCase();
}


function checkAnswer() {
  const userAnswer =
    normalizeAnswer(answerInput.value);

  const correctAnswer =
    normalizeAnswer(CORRECT_ANSWER);

  if (!userAnswer) {
    answerError.textContent = "뭔가 입력해줘.";
    answerError.hidden = false;
    return;
  }

  if (userAnswer === correctAnswer) {

    // 에러 초기화
    answerError.hidden = true;
    wrongCount = 0;

    // 다음 화면으로 이동
    showScreen(currentScreen + 1);

  } else {

    answerError.textContent =
      wrongMessages[
        wrongCount % wrongMessages.length
      ];

    answerError.hidden = false;

    wrongCount++;

    // 입력값 선택
    answerInput.focus();
    answerInput.select();
  }
}


if (checkAnswerBtn) {
  checkAnswerBtn.addEventListener(
    "click",
    checkAnswer
  );
}


if (answerInput) {
  answerInput.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {
        event.preventDefault();
        checkAnswer();
      }

    }
  );
}

/* --------------------------------
   QUEST 03 최종 인증번호
-------------------------------- */

const FINAL_CODE = "0503";

const finalCodeMessages = [
  "음... 번호가 다른 것 같은데?",
  "글쎄...",
  "다시 확인해볼래?"
];

let finalCodeWrongCount = 0;

const finalCodeInput =
  document.querySelector("#finalCodeInput");

const finalCodeError =
  document.querySelector("#finalCodeError");

const checkFinalCodeBtn =
  document.querySelector("#checkFinalCodeBtn");


function checkFinalCode() {
  const userCode =
    normalizeAnswer(finalCodeInput.value);

  const correctCode =
    normalizeAnswer(FINAL_CODE);

  if (!userCode) {
    finalCodeError.textContent =
      "번호를 입력해줘.";

    finalCodeError.hidden = false;
    return;
  }

  if (userCode === correctCode) {
    finalCodeError.hidden = true;
    finalCodeWrongCount = 0;

    showScreen(currentScreen + 1);

  } else {
    finalCodeError.textContent =
      finalCodeMessages[
        finalCodeWrongCount %
        finalCodeMessages.length
      ];

    finalCodeError.hidden = false;

    finalCodeWrongCount++;

    finalCodeInput.focus();
    finalCodeInput.select();
  }
}


if (checkFinalCodeBtn) {
  checkFinalCodeBtn.addEventListener(
    "click",
    checkFinalCode
  );
}


if (finalCodeInput) {
  finalCodeInput.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        checkFinalCode();
      }
    }
  );
}

/* --------------------------------
   RESET
-------------------------------- */

const resetBtn =
  document.querySelector("#resetBtn");

resetBtn.addEventListener(
  "click",
  () => {
    const result = confirm(
      "정말 처음부터 다시 볼까?"
    );

    if (!result) {
      return;
    }

    localStorage.removeItem(STORAGE_KEY);

    answerInput.value = "";
    answerError.hidden = true;

    showScreen(0);
  }
);


/* --------------------------------
   초기 화면 로드
-------------------------------- */

showScreen(currentScreen);
