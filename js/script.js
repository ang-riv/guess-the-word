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

// tester target word that user needs to guess
const word = "magnolia";

// fcn to create the placeholders for each letter in the target word
const placeholders = function(word) {
    // the tester word has 8 letters, which means we need to make 8 dots appear
    // initialize it to nothing first
    let placeholderSymbols = "";

    // use a for loop to make the symbols appear on the same line in the amount that we want
    for (let i = 0; i < word.length; i++) {
        placeholderSymbols += "●";
    }

    //update the innerText to show the placeholders
    wordToGuess.innerText = placeholderSymbols;
};

placeholders(word);

// event listener for the button
// has a parameter because we want to know the value of which letter they have in the input box when they click the button
guessButton.addEventListener("click", function (e) {
    // this to prevent the page from clicking the button, the form submitting, and the page reloading each time
    e.preventDefault();

    // variable that captures the value of the input
    const usersGuess = letterInput.value;
    //console.log(usersGuess);
    // clears the text input box each time the user clicks the button
    letterInput.value = "";

    // make sure that what the user guesses is a valid character
    const validatedGuess = (validate(usersGuess));
    console.log(validatedGuess);
});

// fcn that will validate the user's input
const validate = function(input){
    // regEx to make sure the user puts in a letter
    const acceptedLetter = /[a-zA-Z]/;

    // conditionals
    if(input === ""){
        // if the input is empty
        message.innerText = "Please enter a letter from A to Z.";
    } else if(input.length > 1) {
        // if they've entered more than one letter
        message.innerText = "Please enter only one letter.";
    } else if(!input.match(acceptedLetter)) {
        // if they've entered a chara that doesn't match the regEx/not part of the alphabet
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        // else return the input and clear the message away if they got a message from their last guess
        message.innerText = "";
        return input;
    }
};