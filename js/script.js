"use strict";

// Buttons and outputs variable
var newGame = document.getElementById("new-game-button");
var paperButton = document.getElementById("paper");
var rockButton = document.getElementById("rock");
var scissorsButton = document.getElementById("scissors");
var roundsInfo = document.getElementById("number-of-rounds");
var result = document.getElementById("output-result");

// Functions

function getRounds() { // pobranie i zwrócenie ilości rund do rozegrania
    var rounds = parseFloat(window.prompt("Podaj liczbę rund, jaką chcesz rozegrać:"));
    return rounds;
};

function printRounds(rounds) { // wyświetlenie komunikatu z ilością zadeklarowanych rund
    roundsInfo.innerHTML = "Zadeklarowana ilość rund do wygrania to <strong>" + rounds + "</strong>.";
};

newGame.addEventListener("click", function() { // wywołanie funkcji
    var rounds = getRounds();
        if (!rounds || rounds === null || isNaN(rounds)) {
            roundsInfo.innerHTML = "Nie podano ilości rund";
        }   else {
            printRounds(rounds);
        }
});