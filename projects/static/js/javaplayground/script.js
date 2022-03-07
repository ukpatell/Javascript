// #1 - Age in Days
function ageInDays() {
  currentYear = new Date().getFullYear(); // Returns the current year
  var birthYear = prompt("What year were you born?"); // Input
  if (birthYear <= 0 || birthYear > currentYear) {
    reset();
  }
  var age = (currentYear - birthYear) * 365;
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode("You are " + age + " days old");
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}

// #1 - Resets the Age
function reset() {
  document.getElementById("ageInDays").remove();
}

// #2 - Resets the Images
function resetImage() {
  document.getElementById("flex-animal-gen").innerHTML = "";
}

// #2 - Cat Images Generator
function generateAnimal() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-animal-gen");
  image.src = "http://thecatapi.com/api/images/get?format=src&type=gif";
  div.appendChild(image);
}

// #3 - Rock, Paper, Scissors
function rpsGame(choice) {
  userChoice = choice.id;
  botChoice = botChoiceFunc();
  result = winCalculation(userChoice, botChoice);
  message = finalMessage(result);
  finalFront(userChoice, botChoice, message);
}

// #3 - Bot Choice Randomizer
function botChoiceFunc() {
  return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
}

// #3 - Winner Calculation
function winCalculation(human, robot) {
  let rpsCalculator = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };
  var userScore = rpsCalculator[human][robot];
  var botScore = rpsCalculator[robot][human];

  return [userScore, botScore];
}

// #3 - Final Decision User vs Computer
function finalMessage([humanScore, robotScore]) {
  if (humanScore === 0) {
    return { message: "You Lost!", color: "red" };
  } else if (humanScore === 0.5) {
    return { message: "  Tie!  ", color: "orange" };
  } else {
    return { message: "You Won!", color: "green" };
  }
}

// #3 - Final Front
function finalFront(userImage, botImage, message) {
  // Stores the Images that we only need
  var imageStore = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };
  // Remove the Original Scene
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  var userDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");

  // There's an extra quote in here....
  userDiv.innerHTML =
    "<img src='" +
    imageStore[userImage] +
    "' height=150 width=150 style= 'box-shadow: 0px 10px 50px rgba(37,50,233,1);'>";
  messageDiv.innerHTML =
    "<h1 style='color: " +
    message["color"] +
    "; font-size: 50px; padding:30px; '>" +
    message["message"] +
    "</h1>";
  botDiv.innerHTML =
    "<img src='" +
    imageStore[botImage] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(194,35,67,1);'>";

  document.getElementById("flex-box-rps-div").appendChild(userDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

// #4 - Button Color Changer
var all_buttons = document.getElementsByTagName("button");

var buttonCopy = []; // Important to remember the original colors of buttons
for (let i = 0; i < all_buttons.length; i++) {
  buttonCopy.push(all_buttons[i].classList[1]);
}

function buttonColorChange(colorOption) {
  if (colorOption.value === "red") {
    buttonsRed();
  } else if (colorOption.value === "green") {
    buttonsGreen();
  } else if (colorOption.value === "random") {
    buttonsRandom();
  } else if (colorOption.value === "reset") {
    buttonsReset();
  }
}

function buttonsRed() {
  for (i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}
function buttonsGreen() {
  for (i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}
function buttonsRandom() {
  var options = ["btn-primary", "btn-success", "btn-warning", "btn-danger"];
  for (i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(options[Math.floor(Math.random() * 4)]);
  }
}
function buttonsReset() {
  for (i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(buttonCopy[i]);
  }
}

// #5 Black Jack
let blackjackGame = {
  you: { scoreSpan: "#your-score", div: "#your-box", score: 0 },
  dealer: { scoreSpan: "#dealer-score", div: "#dealer-box", score: 0 },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
  cardMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    J: 10,
    Q: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  userHit: false,
  isStand: false,
  turnsOver: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("static/sounds/javaplayground/swish.m4a");
const winSound = new Audio("static/sounds/javaplayground/cash.mp3");
const lossSound = new Audio("static/sounds/javaplayground/aww.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);
document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);
document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);
document
  .querySelector("#reset-score")
  .addEventListener("click", resetScoreTable);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    blackjackGame["userHit"] = true;
  }
}
function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13); // Random #'s from 0-12
  return blackjackGame["cards"][randomIndex];
}
function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `static/images/javaplayground/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}
function blackjackDeal() {
  if (blackjackGame["turnsOver"] === true) {
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }
    for (let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }
    YOU["score"] = 0;
    DEALER["score"] = 0;
    document.querySelector("#your-score").textContent = 0;
    document.querySelector("#your-score").style.color = "white";
    document.querySelector("#dealer-score").textContent = 0;
    document.querySelector("#dealer-score").style.color = "white";
    document.querySelector("#blackjack-result").textContent = "Let's Play";
    document.querySelector("#blackjack-result").style.color = "black";

    blackjackGame["userHit"] = false;
    blackjackGame["turnsOver"] = false;
    blackjackGame["isStand"] = false;
  }
}
function updateScore(card, activePlayer) {
  if (card === "A") {
    // If total less than 21, add 11 else add 1
    if (activePlayer["score"] + blackjackGame["cardMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardMap"][card];
  }
}
function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "Red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function dealerLogic() {
  if (blackjackGame["userHit"] === true) {
    blackjackGame["isStand"] = true;
    while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
      let card = randomCard();
      showCard(card, DEALER);
      updateScore(card, DEALER);
      showScore(DEALER);
      await sleep(1000);
    }
    blackjackGame["turnsOver"] = true;
    let win = winnerCalculation();
    showResults(win);
  }
}
// Winner Calculation
function winnerCalculation() {
  let winner;
  // User doesn't BUST
  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      blackjackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      blackjackGame["losses"]++;
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      blackjackGame["draws"]++;
    }
  } // USE busts and Dealer busts
  else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackjackGame["draws"]++;
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    blackjackGame["losses"]++;
    winner = DEALER;
  }
  return winner;
}
function showResults(winner) {
  let message, messageColor;
  if (blackjackGame["turnsOver"] === true) {
    if (winner === YOU) {
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "You WON!";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      message = "You LOST!";
      messageColor = "red";
      lossSound.play();
    } else {
      document.querySelector("#draws").textContent = blackjackGame["draws"];
      message = "DRAW";
      messageColor = "yellow";
    }

    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
    blackjackGame["userHit"] = false;
  }
}
// Reset Score table
function resetScoreTable() {
  document.querySelector("#wins").textContent = 0;
  document.querySelector("#losses").textContent = 0;
  document.querySelector("#draws").textContent = 0;
}
