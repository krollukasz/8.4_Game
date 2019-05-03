"use strict";

// ::::: GLOBAL VARIABLES :::::

var newGame = document.getElementById("new-game-button");
var gameContent = document.getElementById("content");
var info = document.getElementById("info");
var roundsInfo = document.getElementById("number-of-rounds");
var roundsNumberFromInput = document.querySelector("rounds-number");
var buttons = document.getElementById("buttons");
var result = document.getElementById("output-result");
var gameResult = document.getElementById("game-result");
var scoreTable = document.getElementById("scoreTable");
var userNameFromInput = document.querySelector("#player-name");
var userPoints = document.getElementById("user-score");
var computerPoints = document.getElementById("computer-score");
var tableHeader = document.getElementById("modal-header");
var tableStats = document.getElementById("table-statistics");
//var gamePossible = false; // zmienna do zablokowania gry przed podaniem ilości rund

//  ::::: GAME PARAMETERS :::::

var params = {
  playerScore: 0,
  computerScore: 0,
  rounds: 0,
  currentRound: 1,
  playerName: "player",
  roundWinner: "",
  roundResult: "",
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
  roundsInfo.classList.remove("hidden");
  buttons.classList.remove("hidden");
  result.classList.remove("hidden");
  gameResult.classList.remove("hidden");
  scoreTable.classList.remove("hidden");
  // gamePossible = true;
}

// ::::: GAME PARAMS RESET :::::
// Reset parametrów gry

function gameReset() {
  params.playerScore = 0; // wyzerowanie liczby punktów gracza
  params.computerScore = 0;  // wyzerowanie liczby punktów komputera
  userPoints.innerHTML = "0"; // wyzerowanie wyniku
  computerPoints.innerHTML = "0";  // wyzerowanie wyniku
  params.rounds = 0; // wyzerowanie liczby rund
  params.currentRound = 1,
  result.innerHTML = "";  // usunięcie komunikatu
  gameResult.innerHTML = "";  // usunięcie komunikatu
  params.progress = []
}

// ::::: GET ROUND :::::

function getRounds() { // pobranie i zwrócenie ilości rund do rozegrania
  params.rounds = Number(window.prompt("Podaj liczbę rund, jaką chcesz rozegrać:")); // zapisanie do mniennej wartości typu liczbowego
  return params.rounds;
};

function printRounds(rounds) { // wyświetlenie komunikatu z ilością zadeklarowanych rund
  roundsInfo.innerHTML = "Zadeklarowana ilość rund do rozegrania to: <strong>" + rounds + "</strong>.";
};

// ::::: NEW GAME BUTTON :::::

newGame.addEventListener("click", function() { // wywołanie funkcji po kliknięciu przycisku Nowa gra
  gameReset();
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

// ::::: COMPUTER CHOICE :::::

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

// ::::: PLAYER CHOICE :::::

document.querySelectorAll('.player-move').forEach(function(element) {
  element.addEventListener('click', function() {
    playerMove(element.getAttribute('data-move'));
  });
});

// ::::: RESULT COMPARE :::::

function playerMove(playerChoice) {
  var computerChoice = getComputerChoice(); // Zapisanie do zmiennej "gotowego" wyboru komputera
  if (playerChoice === computerChoice) { // Porównaie wyników
    result.innerHTML = "<strong>Remis.</strong> Gracz wybrał " + playerChoice + " - Komputer wybrał " + computerChoice;
    params.roundResult = "Remis";
  } else if ((playerChoice === "papier" && computerChoice === "kamień") || (playerChoice === "kamień" && computerChoice === "nożyce") || (playerChoice === "nożyce" && computerChoice === "papier")) {
    result.innerHTML = "<strong>Wygrana!</strong> Gracz wybrał " + playerChoice + " - Komputer wybrał " + computerChoice;
    params.roundResult = "Wygrana";
    params.playerScore++;  // Zwiększenie liczby punktów gracza
    userPoints.innerHTML = params.playerScore; // Wyświetlenie liczby punktów w tabeli wyników
  } else {
    result.innerHTML = "<strong>Przegrana.</strong> Gracz wybrał " + playerChoice + " - Komputer wybrał " + computerChoice;
    params.roundResult = "Przegrana"
    params.computerScore++;    // Zwiększenie liczby punktów komputera
    computerPoints.innerHTML = params.computerScore;   // Wyświetlenie liczby punktów w tabeli wyników
  }
  
  // przesłanie wyników do tablicy
  params.progress.push({
    roundNumber: params.currentRound,
    eachRoundPlayerMove: playerChoice,
    eachRoundComputerMove: computerChoice,
    roundResult: params.roundResult,
    gameScore: params.playerScore + " : " + params.computerScore
  });
  // sprawdzenie czy ostatnia runda
    if (params.currentRound == params.rounds) {
    gameBlocked();
    roundsInfo.classList.add("hidden");
    displayModal("#end-modal");
    endGameTable();
  } else {
    params.currentRound++;
  }
};

// ::::: RESULT TABLE :::::
// Utworzenie tabeli z wynikami wyświetlanej w modalu

var endGameTable = function() {
  tableStats.innerHTML = 
    "<thead className='header-info'><tr class='modal-row'><th>Runda</th><th>Wybór gracza</th><th>Wybór komputera</th><th>Wynik rundy</th><th>Wynik gry</th></tr></thead>";
  for ( var i = 0; i < params.progress.length; i++ ) {
    tableStats.innerHTML +=
    "<tr><td>" +
    params.progress[i].roundNumber +
    "</td><td>" +
    params.progress[i].eachRoundPlayerMove +
    "</td><td>" +
    params.progress[i].eachRoundComputerMove +
    "</td><td>" +
    params.progress[i].roundResult +
    "</td><td>" +
    params.progress[i].gameScore +
    "</td><tr>";
  }
};

// ::::: GAME OVER :::::
// Funkcja kończąca grę

function gameOver() { 
  if (params.playerScore > params.computerScore) { // Porównanie liczby punktów gracza z ilością zadeklarowanych rund
    tableHeader.innerHTML = "Gracz wygrał tę rozgrywkę"; // Wyświetlenie komunikatu o wygranej gracza
    gameBlocked();
    roundsInfo.classList.add("hidden");
  } else if (params.computerScore > params.playerScore) {  // Porównanie liczby punktów komputera z ilością zadeklarowanych rund
    tableHeader.innerHTML = "Komputer wygrał tę rozgrywkę";  // Wyświetlenie komunikatu o wygranej komputera
    gameBlocked();
    roundsInfo.classList.add("hidden");
  } else {
    tableHeader.innerHTML = "Rozgrywka zakończyła się remisem";
    gameBlocked();
    roundsInfo.classList.add("hidden");
  }
};

// ::::: MODALS :::::
// Wyświetlenie modalu

var displayModal = function(modalToShow) {
  gameOver();
  document.querySelector("#modal-overlay").classList.add("visible");
  document.querySelector(modalToShow).classList.add("visible");
};

// Ukrycie overlay'a i wszystkich modali
var hideModal = function(event) {
  event.preventDefault();
  document.querySelector("#modal-overlay").classList.remove("visible");
  document.querySelectorAll(".modal").forEach(function(modal) {
    modal.classList.remove("visible");
  });
};

var closeButton = document.querySelectorAll(".modal-btn-close");
for (var i = 0; i < closeButton.length; i++) {
  closeButton[i].addEventListener("click", hideModal);
}
document.querySelector("#modal-overlay").addEventListener("click", hideModal);

// Zablokowanie propagacji
var modals = document.querySelectorAll(".modal");
for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener("click", function(e) {
    e.stopPropagation();
  });
}
