document.querySelector("#guessBtn").addEventListener("click", guess);
document.querySelector("#resetBtn").addEventListener("click", resetGame);

let randomNumber = Math.floor(Math.random() * 99) + 1;

let count = 0;
let gameOver = false;

let wins = 0;
let losses = 0;

function updateAttemptsUI() {
  document.querySelector("#attempts").textContent = String(count);
}

function updateScoreUI() {
  document.querySelector("#wins").textContent = String(wins);
  document.querySelector("#losses").textContent = String(losses);
}

function endGame() {
  gameOver = true;
  document.querySelector("#guessBtn").disabled = true;
  document.querySelector("#resetBtn").style.display = "inline-block";
}

function guess() {
  if (gameOver) return;

  const inputEl = document.querySelector("#userGuess");
  const messageEl = document.querySelector("#message");
  const guessesEl = document.querySelector("#userGuesses");

  const raw = inputEl.value.trim();
  const userGuess = Number(raw);

  messageEl.style.color = "#111827";

  if (raw === "" || Number.isNaN(userGuess)) {
    messageEl.style.color = "red";
    messageEl.textContent = "Please enter a valid number.";
    return;
  }

  if (userGuess > 99) {
    messageEl.style.color = "red";
    messageEl.textContent = "Error: number must be 0–99.";
    return;
  }

  if (userGuess < 0) {
    messageEl.style.color = "red";
    messageEl.textContent = "Error: number must be 0–99.";
    return;
  }

  count += 1;
  updateAttemptsUI();
  guessesEl.textContent += `${userGuess} `;

  if (userGuess > randomNumber) {
    messageEl.style.color = "#111827";
    messageEl.textContent = "Too high!";
  } else if (userGuess < randomNumber) {
    messageEl.style.color = "#111827";
    messageEl.textContent = "Too low!";
  } else {
    messageEl.style.color = "green";
    messageEl.textContent = "🎉 Correct! You guessed the number!";
    wins += 1;
    updateScoreUI();
    endGame();
    return;
  }

  if (count >= 7) {
    messageEl.style.color = "red";
    messageEl.textContent = `You Lost! The number was ${randomNumber}.`;
    losses += 1;
    updateScoreUI();
    endGame();
    return;
  }

  inputEl.value = "";
  inputEl.focus();
}

function resetGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  count = 0;
  gameOver = false;

  document.querySelector("#userGuesses").textContent = "";
  const messageEl = document.querySelector("#message");
  messageEl.textContent = "";
  messageEl.style.color = "#111827";

  document.querySelector("#userGuess").value = "";
  document.querySelector("#guessBtn").disabled = false;
  document.querySelector("#resetBtn").style.display = "none";

  updateAttemptsUI();
}

updateScoreUI();
updateAttemptsUI();