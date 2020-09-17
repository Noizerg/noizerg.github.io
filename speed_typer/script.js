const difficultySelect = document.getElementById("difficulty");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endGameEl = document.getElementById("end-game-container");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("header");
const word = document.getElementById("word");

let randomWord = "";

let score = 0;

let time = 10;
let wordLength = 5;
let incTime = 3;
let scoreInc = 1;

let difficulty =
  localStorage.getItem("difficulty") != null
    ? localStorage.getItem("difficulty")
    : "easy";

difficultySelect.value = difficulty;

if (difficulty == "easy") {
  wordLength = 5;
  incTime = 3;
  scoreInc = 1;
} else if (difficulty == "medium") {
  wordLength = 7;
  incTime = 2;
  scoreInc = 2;
} else if (difficulty == "hard") {
  wordLength = 10;
  incTime = 1;
  scoreInc = 3;
}

text.focus();

const timeInterval = setInterval(updateTime, 1000);

function updateTime() {
  time--;
  timeEl.innerHTML = time + " s";
  if (time == 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endGameEl.innerHTML = `
<h1>Game Over Son!</h1>
<p>Your final score is ${score}</p>
<button onclick="location.reload()">Reload</button>
`;
  endGameEl.style.display = "flex";
}
function updateScore() {
  score += scoreInc;
  scoreEl.innerHTML = score;
}

async function getRandomWord() {
  fetch("https://random-word-api.herokuapp.com/word?number=100")
    .then((resp) => resp.json())
    .then(function result(res) {
      for (let i in res) {
        if (res[i].length == wordLength) {
          word.innerText = res[i];
        }
      }
    });
}
getRandomWord();

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText == word.innerText) {
    time += incTime;
    timeEl.innerHTML = time + " s";
    getRandomWord();
    updateScore();
    text.value = "";
  }
});

settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
