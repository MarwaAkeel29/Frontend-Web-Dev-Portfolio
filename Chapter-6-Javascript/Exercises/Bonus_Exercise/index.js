// Get important elements from HTML using their IDs
const rgbCode = document.getElementById("rgbCode");
const messageOutput = document.getElementById("messageOutput");
const traceLevel = document.getElementById("traceLevel");
const scoreDisplay = document.getElementById("score");
const colorBoxes = document.querySelectorAll(".color-box");
const gameOverScreen = document.getElementById("gameOverScreen");
const restartBtn = document.getElementById("restartBtn");

// Setup game state
let correctColor = "";      // Will store the actual RGB answer
let trace = 0;              // Like lives - increases when wrong
let score = 0;              // Increases when right
const maxTrace = 100;       // Game over at 100% trace level

// Start the game right away
initializeGame();

// Function to start or reset the game
function initializeGame() {
  trace = 0;
  score = 0;
  gameOverScreen.classList.add("hidden");
  updateStats();
  loadNewRound();
}

// This updates the score and trace level display
function updateStats() {
  traceLevel.textContent = `Trace Level: ${trace}%`;
  scoreDisplay.textContent = `Access Score: ${score.toString().padStart(2, '0')}`;
}

// Generates a random RGB string like "rgb(123, 45, 67)"
function generateRandomRGB() {
  const r = Math.floor(Math.random() * 256); // Red value: 0–255
  const g = Math.floor(Math.random() * 256); // Green
  const b = Math.floor(Math.random() * 256); // Blue
  return `rgb(${r}, ${g}, ${b})`;
}

// Loads a new set of color choices
function loadNewRound() {
  // Pick a random color as the correct one
  correctColor = generateRandomRGB();
  rgbCode.textContent = correctColor;

  // Choose a random index (0–2) to hold the correct color
  const correctIndex = Math.floor(Math.random() * colorBoxes.length);

  // Loop through each box and assign a color
  colorBoxes.forEach((box, index) => {
    if (index === correctIndex) {
      box.style.backgroundColor = correctColor;
      box.dataset.correct = "true"; // Mark as the right one
    } else {
      const fakeColor = generateRandomRGB();
      box.style.backgroundColor = fakeColor;
      box.dataset.correct = "false"; // Mark as wrong
    }

    // Reset styles just in case
    box.style.opacity = "1";
    box.style.pointerEvents = "auto";
  });

  // Reset message
  messageOutput.textContent = "Awaiting input...";
}

// Handle user clicking a color box
colorBoxes.forEach((box) => {
  box.addEventListener("click", function () {
    const isCorrect = box.dataset.correct === "true";

    if (isCorrect) {
      messageOutput.textContent = "✔ Access Granted!";
      messageOutput.style.color = "#00FF99"; // Bright green for success
      messageOutput.style.textShadow = "0 0 8px #00FF99"; // Glowing effect
      score += 10;
      updateStats();

      // Delay next round slightly to let player see success
      setTimeout(() => {
        messageOutput.style.color = "#FFDBE8"; // Reset to default
        messageOutput.style.textShadow = "none";
        loadNewRound();
      }, 800); // 0.9 seconds delay
    } else {
      messageOutput.textContent = "✖ Intrusion Detected!";
      messageOutput.style.color = "#F24455"; // Red for danger
      trace += 25;
      updateStats();
      box.style.opacity = "0.2";
      box.style.pointerEvents = "none";

      if (trace >= maxTrace) {
        endGame();
      }
    }
  });
});


// Show game over screen
function endGame() {
  messageOutput.textContent = "⚠ System Breach Level Critical!";
  gameOverScreen.classList.remove("hidden");

  // Disable clicking on color boxes
  colorBoxes.forEach((box) => {
    box.style.pointerEvents = "none";
  });
}

// Restart button event
restartBtn.addEventListener("click", initializeGame);

