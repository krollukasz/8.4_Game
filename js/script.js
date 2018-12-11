"use strict";

// Buttons and outputs variable
var newGame = document.getElementById("new-game-button");
var paperButton = document.getElementById("paper");
var rockButton = document.getElementById("rock");
var scissorsButton = document.getElementById("scissors");

var userPoints = document.getElementById("user-score");
var computerPoints = document.getElementById("computer-score");
var playerScore = 0;
var computerScore = 0;
var rounds;

var roundsInfo = document.getElementById("number-of-rounds");
var result = document.getElementById("output-result");
var gameResult = document.getElementById("game-result");

// GET ROUND FUNCTION

function getRounds() { // pobranie i zwrócenie ilości rund do rozegrania
    return rounds = (window.prompt("Podaj liczbę rund, jaką chcesz rozegrać:"));
};

function printRounds(rounds) { // wyświetlenie komunikatu z ilością zadeklarowanych rund
    roundsInfo.innerHTML = "Zadeklarowana ilość rund do wygrania to <strong>" + rounds + "</strong>.";
};

// NEW BUTTON

newGame.addEventListener("click", function() { // wywołanie funkcji
    var rounds = getRounds();
        if (!rounds || rounds === null) {
            roundsInfo.innerHTML = "Nie podano ilości rund";
        }   else if (isNaN(rounds)) {
            roundsInfo.innerHTML = "Podana wartość nie jest liczbą";
        }   else {
            printRounds(rounds);
        }
});

// COMPUTER CHOICE FUNCTION

function getComputerChoice() { // Funkcja losowania "przycisku" przez komputer
    var result = Math.floor(Math.random() * 3); // Funkcja losująca liczbę, mnożenie przez 3, zaokrąglenie w dół i zapis do zmiennej
    if (result === 0) { // zamiana liczby na tekst
        return "papier";
    } else if (result === 1) {  // zamiana liczby na tekst
        return "kamień";
    }   else if (result === 2) {    // zamiana liczby na tekst
        return "nożyce";
    }
};

// PLAYER CHOICE FUNCTION

function playerMove(playerChoice) {
    var computerChoice = getComputerChoice(); // Zapisanie do zmiennej "gotowego" wyboru komputera

    if (playerChoice === computerChoice) { // Porównaie wyników
        result.innerHTML = "<strong>Remis.</strong> Gracz wybrał" + playerChoice + " - Komputer wybrał " + computerChoice;
    } else if ((playerChoice === "papier" && computerChoice === "kamień") || (playerChoice === "kamień" && computerChoice === "nożyce") || (playerChoice === "nożyce" && computerChoice === "papier")) {
            result.innerHTML = "<strong>Wygrana!</strong> Gracz wybrał " + playerChoice + " - Komputer wybrał " + computerChoice;
            playerScore++;  // Zwiększenie liczby punktów gracza
            userPoints.innerHTML = playerScore; // Wyświetlenie liczby punktów w tabeli wyników
            // gameOver(); // Wywołanie funkcji kończącej grę
            // console.log("player score:" + playerScore);
        }   else {
            result.innerHTML = "<strong>Przegrana.</strong> Gracz wybrał " + playerChoice + " - Komputer wybrał " + computerChoice;
            computerScore++;    // Zwiększenie liczby punktów komputera
            computerPoints.innerHTML = computerScore;   // Wyświetlenie liczby punktów w tabeli wyników
            // gameOver(); // Wywołanie funkcji kończącej grę
            // console.log("computer score:" + computerScore);
        }
        gameOver();
};

// GAME OVER FUNCTION

function gameOver() { // Funkcja kończąca grę
    if (userScore === rounds) { // Porównanie liczby punktów gracza z ilością zadeklarowanych rund
        gameResult.innerHTML = "Gracz wygrał tą rozgrywkę"; // Wyświetlenie komunikatu o wygranej gracza
    }   else if (computerScore === rounds) {  // Porównanie liczby punktów komputera z ilością zadeklarowanych rund
        gameResult.innerHTML = "Komputer wygrał tą rozgrywkę";  // Wyświetlenie komunikatu o wygranej komputera
    }
};

// BUTTONS

paperButton.addEventListener("click", function() {
    playerMove("papier");
});

rockButton.addEventListener("click", function() {
    playerMove("kamień");
});

scissorsButton.addEventListener("click", function() {
    playerMove("nożyce");
});