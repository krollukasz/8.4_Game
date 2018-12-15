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
var gamePossible = false;

var roundsInfo = document.getElementById("number-of-rounds");
var result = document.getElementById("output-result");
var gameResult = document.getElementById("game-result");

// GET ROUND FUNCTION

function getRounds() { // pobranie i zwrócenie ilości rund do rozegrania
    rounds = Number(window.prompt("Podaj liczbę rund, jaką chcesz rozegrać:")); // zwraca do mniennej wartość typu liczbowego
    return rounds;
};

function printRounds(rounds) { // wyświetlenie komunikatu z ilością zadeklarowanych rund
    roundsInfo.innerHTML = "Zadeklarowana ilość rund do wygrania to <strong>" + rounds + "</strong>.";
};

// NEW BUTTON

newGame.addEventListener("click", function() { // wywołanie funkcji
    rounds = getRounds();
        if (!rounds || rounds === null) {
            roundsInfo.innerHTML = "Nie podano ilości rund";
        }   else if (isNaN(rounds)) {
            roundsInfo.innerHTML = "Podana wartość nie jest liczbą";
        }   else {
            printRounds(rounds);
            gamePossible = true; // odblokowanie możliwości gry po podaniu ilości rund
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
        }   else {
            result.innerHTML = "<strong>Przegrana.</strong> Gracz wybrał " + playerChoice + " - Komputer wybrał " + computerChoice;
            computerScore++;    // Zwiększenie liczby punktów komputera
            computerPoints.innerHTML = computerScore;   // Wyświetlenie liczby punktów w tabeli wyników
        }
        gameOver();
};

// GAME OVER FUNCTION

function gameOver() { // Funkcja kończąca grę
    // console.log("playerScore: " + playerScore);
    // console.log("rounds " + rounds);
    if (playerScore === rounds) { // Porównanie liczby punktów gracza z ilością zadeklarowanych rund
        gameResult.innerHTML = "Gracz wygrał tą rozgrywkę"; // Wyświetlenie komunikatu o wygranej gracza
        gamePossible = false; // zablokowanie dalszej rozgrywki
    }   else if (computerScore === rounds) {  // Porównanie liczby punktów komputera z ilością zadeklarowanych rund
        gameResult.innerHTML = "Komputer wygrał tą rozgrywkę";  // Wyświetlenie komunikatu o wygranej komputera
        gamePossible = false; // zablokowanie dalszej rozgrywki
    }
};

// BUTTONS

paperButton.addEventListener("click", function() {
    if (gamePossible) {
        playerMove("papier");
    } else {
        roundsInfo.innerHTML = "<strong>Naciśnij przycisk nowa gra</strong>"
    }
});

rockButton.addEventListener("click", function() {
    if (gamePossible) {
        playerMove("kamień");
    } else {
        roundsInfo.innerHTML = "<strong>Naciśnij przycisk nowa gra</strong>"
    }
});

scissorsButton.addEventListener("click", function() {
    if (gamePossible) {
        playerMove("nożyce");
    } else {
        roundsInfo.innerHTML = "<strong>Naciśnij przycisk nowa gra</strong>"
    }
});