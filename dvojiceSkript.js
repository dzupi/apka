const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const scoreTable = document.getElementById("score-table");
 
let cards;
let interval;
let firstCard = null;
let secondCard = null;
let firstCardValue = null;

// Score table data
let scoreData = [];

// Items array
const items = [
  { name: "hlava", image: "hlava.png" },
  { name: "jazyk", image: "jazyk.png" },
  { name: "noha", image: "noha.png" },
  { name: "oko", image: "oko.png" },
  { name: "prst", image: "prst.png" },
  { name: "pusa", image: "pusa.png" },
  { name: "ruka", image: "ruka.png" },
  { name: "sval", image: "sval.png" },
  { name: "ucho", image: "ucho.png" },
  { name: "vlasy", image: "vlasy.png" },
  { name: "zada", image: "zada.png" },
  { name: "zub", image: "zub.png" },
];

// Initial Time
let seconds = 0,
  minutes = 0;
// Initial moves and win count
let movesCount = 0,
  winCount = 0;

// For timer
const timeGenerator = () => {
  seconds += 1;
  // minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  // format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Čas: </span>${minutesValue}:${secondsValue}`;
};

// For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Otočených: </span>${movesCount}`;
};

// Pick random objects from the items array
const generateRandom = (size = 4) => {
  // temporary array
  let tempArray = [...items];
  // initializes cardValues array
  let cardValues = [];
  // size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  // Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    // once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  // simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    /*
        Create Cards
        before => front side (contains question mark)
        after => back side (contains actual image);
        data-card-values is a custom attribute which stores the names of the cards to match later
      */
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  // Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  // Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // If selected card is not matched yet, then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        // Flip the clicked card
        card.classList.add("flipped");
        // If it is the first card (!firstCard since firstCard is initially null)
        if (firstCard === null) {
          // So the current card will become the firstCard
          firstCard = card;
          // Current card's value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          // Increment moves since the user selected the second card
          movesCounter();
          // secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue === secondCardValue) {
            // If both cards match, add matched class so these cards would be ignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            // Set firstCard to null since the next card would be the first now
            firstCard = null;
            // winCount increment as the user found a correct match
            winCount += 1;
            // Check if winCount is equal to half of cardValues
            if (winCount === Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>ÚSPĚCH :)</h2>
            <h4>Kroků: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            // If the cards don't match
            // Flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = null;
            secondCard = null;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

// Initialize values and function calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};

// Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  // Controls and buttons visibility
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  // Start timer
  interval = setInterval(timeGenerator, 1000);
  // Initial moves
  moves.innerHTML = `<span>Otočených: </span>${movesCount}`;
  initializer();
});

// Stop game
stopButton.addEventListener("click", () => {
  controls.classList.remove("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
  clearInterval(interval);

  // Update score table
  const username = document.getElementById("username").value;
  const movesValue = movesCount;
  const timeValue = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

  scoreData.push({ username, moves: movesValue, time: timeValue });

  // Sort scoreData in descending order based on moves
  scoreData.sort((a, b) => b.moves - a.moves);

  // Trim scoreData to keep only the last 3 results
  if (scoreData.length > 7) {
    scoreData = scoreData.slice(0, 7);
  }

  // Clear score table
  scoreTable.innerHTML = "";

  // Add rows to the score table
  scoreData.forEach((score) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${score.username}</td>
      <td>${score.moves}</td>
      <td>${score.time}</td>
    `;
    scoreTable.appendChild(row);
  });

  // Reset username input
  document.getElementById("username").value = "";
});
