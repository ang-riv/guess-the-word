// global dom variables
// unordered list
const guessedLetters = document.querySelector(".guessed-letters");
// button
const guessButton = document.querySelector(".guess");
// text input
const letterInput = document.querySelector(".letter");
// word to the user is trying to guess
const wordToGuess = document.querySelector(".word-in-progress");
// paragraph of guesses left
const remainingGuesses = document.querySelector(".remaining");
// specific number of guesses left, found in span element
const numOfGuessesLeft = document.querySelector("span");
// paragraph where the messages will appear when user guesses a letter
const message = document.querySelector(".message");
// play again button
const playAgain = document.querySelector(".play-again");

// tester word that user needs to guess
const word = "magnolia";

