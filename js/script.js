"use strict";

// GLOBAL VARIABLES
var newGame = document.getElementById("new-game-button");
// var paperButton = document.getElementById("paper");
// var rockButton = document.getElementById("rock");
// var scissorsButton = document.getElementById("scissors");

var userPoints = document.getElementById("user-score");
var computerPoints = document.getElementById("computer-score");
var gamePossible = false; // zmienna do zablokowania gry przed podaniem ilości rund

var roundsInfo = document.getElementById("number-of-rounds");
var result = document.getElementById("output-result");
var gameResult = document.getElementById("game-result");

//  GAME PARAMETERS OBJECT
var params = {
  playerScore: 0,
  computerScore: 0,
  rounds: 0,
  gamePossible: false,
};

// SHOW CONTENT FUNCTION
var showContent = function() {
  document.querySelector("#content").classList.remove("hidden");
}

// GET ROUND FUNCTION

function getRounds() { // pobranie i zwrócenie ilości rund do rozegrania
  params.rounds = Number(window.prompt("Podaj liczbę rund, jaką chcesz rozegrać:")); // zapisanie do mniennej wartości typu liczbowego
  return params.rounds;
};

function printRounds(rounds) { // wyświetlenie komunikatu z ilością zadeklarowanych rund
  roundsInfo.innerHTML = "Zadeklarowana ilość rund do wygrania to <strong>" + rounds + "</strong>.";
};

// NEW BUTTON

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
  } else if (isNaN(params.rounds)) {
    roundsInfo.innerHTML = "Podana wartość nie jest liczbą";
  } else {
    printRounds(params.rounds);
    params.gamePossible = true; // odblokowanie możliwości gry po podaniu ilości rund
  }
  showContent();
});

// COMPUTER CHOICE FUNCTION

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


var gameButtons = document.querySelectorAll(".player-move");

for ( var i = 0; i < gameButtons.length; i++) {
  var choosedButton = gameButtons[i].getAttribute("data-move");
  gameButtons[i].addEventListener("click", function() {
    console.log(choosedButton);
    // playerMove(this.choosedButton);
  });
};

// PLAYER CHOICE FUNCTION
function playerMove(playerChoice) {
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

// GAME OVER FUNCTION

function gameOver() { // Funkcja kończąca grę
  if (params.playerScore === params.rounds) { // Porównanie liczby punktów gracza z ilością zadeklarowanych rund
    roundsInfo.innerHTML = "<strong>Naciśnij przycisk nowa gra</strong>"
    gameResult.innerHTML = "Gracz wygrał tę rozgrywkę"; // Wyświetlenie komunikatu o wygranej gracza
    gamePossible = false; // zablokowanie dalszej rozgrywki
  } else if (params.computerScore === params.rounds) {  // Porównanie liczby punktów komputera z ilością zadeklarowanych rund
    roundsInfo.innerHTML = "<strong>Naciśnij przycisk nowa gra</strong>"
    gameResult.innerHTML = "Komputer wygrał tę rozgrywkę";  // Wyświetlenie komunikatu o wygranej komputera
    gamePossible = false; // zablokowanie dalszej rozgrywki
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