"use strict";

// ::::: GLOBAL VARIABLES :::::

var newGame = document.getElementById("new-game-button");
var gameContent = document.getElementById("content");
var info = document.getElementById("info");
var roundsInfo = document.getElementById("number-of-rounds");
var buttons = document.getElementById("buttons");
var result = document.getElementById("output-result");
var gameResult = document.getElementById("game-result");
var scoreTable = document.getElementById("scoreTable");
var userPoints = document.getElementById("user-score");
var computerPoints = document.getElementById("computer-score");
var gamePossible = false; // zmienna do zablokowania gry przed podaniem ilości rund

//  ::::: GAME PARAMETERS :::::

var params = {
  playerScore: 0,
  computerScore: 0,
  rounds: 0,
  progress: [],
};

// ::::: START GAME :::::

function gameBlocked() {
  gameContent.classList.remove("hidden");
  info.classList.add("hidden");
  roundsInfo.classList.remove("hidden");
  buttons.classList.add("hidden");
  result.classList.add("hidden");
  gameResult.classList.add("hidden");
  scoreTable.classList.add("hidden");
}

function gameUnblocked() {
  gameContent.classList.remove("hidden");
  info.classList.remove("hidden");
  buttons.classList.remove("hidden");
  result.classList.remove("hidden");
  gameResult.classList.remove("hidden");
  scoreTable.classList.remove("hidden");
  gamePossible = true;
}


// SHOW CONTENT FUNCTION
// var showContent = function() {
//   document.querySelector("#content").classList.remove("hidden");
// }

// ::::: GET ROUND :::::

function getRounds() { // pobranie i zwrócenie ilości rund do rozegrania
  params.rounds = Number(window.prompt("Podaj liczbę rund, jaką chcesz rozegrać:")); // zapisanie do mniennej wartości typu liczbowego
  return params.rounds;
};

function printRounds(rounds) { // wyświetlenie komunikatu z ilością zadeklarowanych rund
  roundsInfo.innerHTML = "Zadeklarowana ilość rund do wygrania to <strong>" + rounds + "</strong>.";
};

// ::::: NEW GAME BUTTON :::::

newGame.addEventListener("click", function() { // wywołanie funkcji
  params.playerScore = 0; // wyzerowanie liczby punktów gracza
  params.computerScore = 0;  // wyzerowanie liczby punktów komputera
  userPoints.innerHTML = "0"; // wyzerowanie wyniku
  computerPoints.innerHTML = "0";  // wyzerowanie wyniku
  params.rounds = 0; // wyzerowanie liczby rund
  result.innerHTML = "";  // usunięcie komunikatu
  gameResult.innerHTML = "";  // usunięcie komunikatu
  params.rounds = getRounds();
  if (params.rounds == "" || params.rounds == null) {
    roundsInfo.innerHTML = "Nie podano ilości rund";
    gameBlocked();
  } else if (isNaN(params.rounds)) {
    roundsInfo.innerHTML = "Podana wartość nie jest liczbą";
    gameBlocked();
  } else {
    printRounds(params.rounds);
    gameUnblocked();
  }
});

// ::::: COMPUTER CHOICE
function getComputerChoice() { // Funkcja losowania "przycisku" przez komputer
  var result = Math.floor(Math.random() * 3); // Funkcja losująca liczbę, mnożenie przez 3, zaokrąglenie w dół i zapis do zmiennej
  if (result === 0) { // zamiana liczby na tekst
    return "papier";
  } else if (result === 1) {  // zamiana liczby na tekst
    return "kamień";
  } else if (result === 2) {    // zamiana liczby na tekst
    return "nożyce";
  }
};

// ::::: PLAYER CHOICE
var gameButtons = document.querySelectorAll(".player-move");
for (var i = 0; i < gameButtons.length; i++) {
  gameButtons[i].addEventListener("click", playerMove);
}

// ::::: RESULT COMPARE
function playerMove(playerChoice) {
  var playerChoice = this.getAttribute("data-move");
  var computerChoice = getComputerChoice(); // Zapisanie do zmiennej "gotowego" wyboru komputera
  if (playerChoice === computerChoice) { // Porównaie wyników
    result.innerHTML = "<strong>Remis.</strong> Gracz wybrał" + playerChoice + " - Komputer wybrał " + computerChoice;
  } else if ((playerChoice === "papier" && computerChoice === "kamień") || (playerChoice === "kamień" && computerChoice === "nożyce") || (playerChoice === "nożyce" && computerChoice === "papier")) {
    result.innerHTML = "<strong>Wygrana!</strong> Gracz wybrał " + playerChoice + " - Komputer wybrał " + computerChoice;
    params.playerScore++;  // Zwiększenie liczby punktów gracza
    userPoints.innerHTML = params.playerScore; // Wyświetlenie liczby punktów w tabeli wyników
  } else {
    result.innerHTML = "<strong>Przegrana.</strong> Gracz wybrał " + playerChoice + " - Komputer wybrał " + computerChoice;
    params.computerScore++;    // Zwiększenie liczby punktów komputera
    computerPoints.innerHTML = params.computerScore;   // Wyświetlenie liczby punktów w tabeli wyników
  }
  gameOver();
};

// ::::: GAME OVER
function gameOver() { // Funkcja kończąca grę
  if (params.playerScore === params.rounds) { // Porównanie liczby punktów gracza z ilością zadeklarowanych rund
    roundsInfo.innerHTML = "<strong>Naciśnij przycisk nowa gra</strong>"
    gameResult.innerHTML = "Gracz wygrał tę rozgrywkę"; // Wyświetlenie komunikatu o wygranej gracza
    gameBlocked();
    params.gamePossible = false; // zablokowanie dalszej rozgrywki
  } else if (params.computerScore === params.rounds) {  // Porównanie liczby punktów komputera z ilością zadeklarowanych rund
    roundsInfo.innerHTML = "<strong>Naciśnij przycisk nowa gra</strong>"
    gameResult.innerHTML = "Komputer wygrał tę rozgrywkę";  // Wyświetlenie komunikatu o wygranej komputera
    gameBlocked();
    params.gamePossible = false; // zablokowanie dalszej rozgrywki
  }
};

// BUTTONS

// paperButton.addEventListener("click", function() {
//   if (gamePossible) {
//     playerMove("papier");
//   } else {
//     roundsInfo.innerHTML = "<strong>Naciśnij przycisk nowa gra</strong>"
//   }
// });

// rockButton.addEventListener("click", function() {
//   if (gamePossible) {
//     playerMove("kamień");
//   } else {
//     roundsInfo.innerHTML = "<strong>Naciśnij przycisk nowa gra</strong>"
//   }
// });

// scissorsButton.addEventListener("click", function() {
//   if (gamePossible) {
//     playerMove("nożyce");
//   } else {
//     roundsInfo.innerHTML = "<strong>Naciśnij przycisk nowa gra</strong>"
//   }
// });