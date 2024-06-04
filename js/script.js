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

// the number of remaining guesses
// must be let so that we can change it in countGuesses
let remainingGuessesNum = 8;
// array that holds the letters that the user has already guessed
const usersGuesses = [];
// tester target word that user needs to guess
const word = "are";

//* fcn to create the placeholders for each letter in the target word
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

//* event listener for the button
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
    //console.log(validatedGuess);

    // adding the guessed letters into the array so long as validatedGuess is not undefined
    // gets rid of the error in console if undefined is returned
    if(validatedGuess !== undefined){
        makeGuess(validatedGuess);
    }
    
    // log out the array
    console.log(usersGuesses);
});

//* fcn that will validate the user's input
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

//* fcn that adds the user's guessed letter to an array to keep track of what they've already guessed
const makeGuess = function(letter){
    // convert all user's guesses to uppercase to make it easier to match
    const guessedLetter = letter.toUpperCase();
    if(usersGuesses.includes(guessedLetter) === true){
        // if the letter is already in the array, tell the user and do not add it to the array again
        message.innerText = "You already guessed that, silly. Pick a different letter.";
    } else {
        // if the letter is not in the array, add it to the array
        usersGuesses.push(guessedLetter);
        // then show the guesses to the user!
        showGuesses();
        // update the remaining number of guesses
        countGuesses(guessedLetter);
        // then update the paragraph with the letters
        wordToGuess.innerText = updateTargetWord(usersGuesses);
    }
};

//* fcn to show the guessed letters
const showGuesses = function () {
    // empty the ul
    guessedLetters.innerHTML = "";
    // create a new list item for each letter inside the usersGuesses array, the value of each list item will be the contents of the array
    for (let i = 0; i < usersGuesses.length; i++) {
        // make the list element
        let letters = document.createElement("li");
        // update the list element to be the letters
        letters.innerText = usersGuesses[i];
        // add it to the ul
        guessedLetters.append(letters);
    }
};

//* fcn to update the word in progress
const updateTargetWord = function(usersGuesses){
    // changes word to uppercase
    const wordUpper = word.toUpperCase();
    // splits the word into it's letter in the array
    const wordArray = wordUpper.split("");

    // check if the wordArray is working
    //console.log(wordArray);

    // make new array with the same length as the first array with the placeholders inside
    const newArr = new Array(wordArray.length).fill("●");

    // check each letter in the usersGuesses
    //!DOESN'T WORK FOR DOUBLE LETTERS!
    usersGuesses.forEach(letter => {
        // go through the wordArray and check if any of the letters match the one in the usersGuesses array and what if it does, then give back the index of where it is
        const index = wordArray.indexOf(letter);
        // if it DOES exist, then place the element at the SAME index in the newArr as it is in the wordArray!
        if(index !== -1) {
            newArr[index] = letter;
        }
    });

    // then join together the word again
    const newWord = newArr.join('');
    // check if the player has successfully guessed the word
    userWin();
    return newWord;
};

//* fcn to count how many guesses are left
const countGuesses = function(guess) {
    const targetWord = word.toUpperCase();
    // if the word the user is trying to guess contains the letter that they just guessed then let the player know the letter is in the word
    console.log(targetWord);
    //TODO: FIX CONTAINS SO THAT IT WORKS
    if(targetWord.includes(guess.toUpperCase()) === true){
        message.innerText = "That letter is in the word!";
    } else {
        // if not, then 
        message.innerText = "That letter is not in the word.";
        // subtract one of their guesses
        remainingGuessesNum--;
    }
    // check to see if their guesses are at zero
    if(remainingGuessesNum === 0){
        message.innerText = `Game Over! The word was: ${targetWord}`;
    } else if(remainingGuessesNum === 1) {
        // if they have only 1 guess left
        numOfGuessesLeft.innerText = `1 guess`;
    } else {
        // if they have more than one guess
        numOfGuessesLeft.innerHTML = `${remainingGuessesNum} guesses`;
    }
};

//countGuesses("a");

//* fcn to check if the player has won
const userWin = function () {
    // verify if the word in progress matches the word they should guess
    // use the arrays
    //  join the array so that you can match it to the word
    const joinedGuess = usersGuesses.join('');
    const targetWord = word.toUpperCase();
    console.log(joinedGuess);
    if(joinedGuess === targetWord) {
        console.log("you won!");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
        message.classList.add("win");
    }
    // if they've won/if matches the word in progress, then add the 'win' class to message

    // then add update the paragraphs contents
};
