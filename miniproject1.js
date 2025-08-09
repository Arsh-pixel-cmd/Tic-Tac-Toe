const boxes = document.querySelectorAll(".box");
const msgContainer = document.getElementById("msg");
const resetBtn = document.getElementById("reset-btn");

let turn = true; // true = X, false = O
let gameOver = false;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText);
      gameOver = true;
      return;
    }
  }

  // Check for Draw
  const allFilled = [...boxes].every((box) => box.innerText !== "");
  if (allFilled && !gameOver) {
    showWinner("It's a Draw!");
  }
};

const showWinner = (winner) => {
  msgContainer.innerText =
    winner === "X" || winner === "O"
      ? `🎉 ${winner} Wins!`
      : "😬 It's a Draw!";
  msgContainer.classList.add("show");

  // Auto-hide popup after 2.5 seconds and reset
  setTimeout(resetGame, 2500);
};


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || gameOver) return;

    box.innerText = turn ? "X" : "O";
    turn = !turn;

    checkWinner();
  });
});

const resetGame = () => {
  boxes.forEach((box) => (box.innerText = ""));
  turn = true;
  gameOver = false;
  msgContainer.classList.remove("show");
  msgContainer.innerText = "";
};

resetBtn.addEventListener("click", resetGame);

// Optional: Hide pop-up on click
msgContainer.addEventListener("click", resetGame);
