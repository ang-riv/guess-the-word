//* global dom variables
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

//* other global variables
// the number of remaining guesses
let remainingGuessesNum = 8;
// array that holds the letters that the user has already guessed
let usersGuesses = [];
// target word that user needs to guess, gets changed by API
let word = "";

//* async fcn
const getWord = async function() {
    // fetch the data
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    // convert to text file
    const words = await request.text();
    // turn the words into an array, gets rid of the line breaks and white space
    const wordArray = words.split("\n");
    // test to see if received
    //console.log(wordArray);

    // pick a random word and reassign it to the global word variable
    word = randomWord(wordArray);
    
    // pass the new word into placeholder to make it show up on the screen with the correct amount of letters
    placeholders(word);
};

//* randomly select a word from the word text file
const randomWord = function(wordArray) {
    // picks the random index in the array
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    // assign the value of that random index
    const randomWord = wordArray[randomIndex].trim();
    //console.log(randomWord);
    return randomWord;
};

//* fcn to create the placeholders for each letter in the target word
const placeholders = function(word) {
    // ex. word has 8 letters, which means we need to make 8 dots appear
    // initialize it to nothing first
    let placeholderSymbols = "";

    // use a for loop to make the symbols appear on the same line in the amount that we want
    for (let i = 0; i < word.length; i++) {
        placeholderSymbols += "●";
    }

    //update the innerText to show the placeholders
    wordToGuess.innerText = placeholderSymbols;
};

getWord();

//* event listener for the guess button
guessButton.addEventListener("click", function (e) {
    // this to prevent the page from clicking the button, the form submitting, and the page reloading each time
    e.preventDefault();

    // variable that captures the value of the input
    const usersGuess = letterInput.value;

    // clears the text input box each time the user clicks the button
    letterInput.value = "";

    // make sure that what the user guesses is a valid character
    const validatedGuess = (validate(usersGuess));

    // adding the guessed letters into the array so long as validatedGuess is not undefined
    // gets rid of the error in console if undefined is returned
    if(validatedGuess !== undefined){
        makeGuess(validatedGuess);
    }
    
    // log out the array
    //console.log(usersGuesses);
});

//* event listener for play again button
playAgain.addEventListener("click", function () {
    // resetting everything
    message.classList.remove("win");
    message.innerText = "";
    guessedLetters.innerText = "";
    remainingGuessesNum = 8;
    usersGuesses = [];
    numOfGuessesLeft.innerText = `${remainingGuessesNum} guesses`;

    // show guess button, remaining guesses, guessed letters
    guessButton.classList.remove("hide");
    remainingGuesses.classList.remove("hide");
    guessedLetters.classList.remove("hide");

    // show the play again button
    playAgain.classList.add("hide");

    // get a new word to play with
    getWord();
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
        // else return the letter and clear the message away if they got a message from their last guess
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
    // splits the word into it's letters in the array
    const wordArray = wordUpper.split("");
    const showWord = [];
    // loop over the values of the array, in this case the letters
    for(const letter of wordArray) {
        // if any of the user's guesses has that letter
        if(usersGuesses.includes(letter)) {
            // put it into the array
            showWord.push(letter.toUpperCase());
        } else {
            // if not, add the placeholder
            showWord.push("●");
        }
    }
    // then join together the word again
    const newWord = showWord.join('');
    // check if the player has successfully guessed the word
    userWin();
    return newWord;
};

//* fcn to count how many guesses are left
const countGuesses = function(guess) {
    const targetWord = word.toUpperCase();
    // if the word the user is trying to guess contains the letter that they just guessed then let the player know the letter is in the word
    //console.log(targetWord);
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
        startOver();
    } else if(remainingGuessesNum === 1) {
        numOfGuessesLeft.innerText = `1 guess`;
    } else {
        numOfGuessesLeft.innerHTML = `${remainingGuessesNum} guesses`;
    }
};

//* fcn to check if the player has won
const userWin = function () {
    // verify if the word in progress matches the word they should guess
    // need to split the target word into an array
    const targetWord = word.toUpperCase();
    const targetArr = targetWord.split('');

    // filter out duplicate letters
    const newArr = removeDuplicates(targetArr);
    // tests
    //console.log(newArr);
    //console.log(usersGuesses);

     // if the target word is a subset of the user's guesses then they win
    if(newArr.every(letter => usersGuesses.includes(letter))){
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
        message.classList.add("win");
        startOver();
    }
};

// * fcn that removes duplicate letters
const removeDuplicates = function(arr) {
    return arr.filter((value, index) => arr.indexOf(value) === index);
};

//* fcn to start the game over after user wins or loses
const startOver = function() {
    guessButton.classList.add("hide");
    remainingGuesses.classList.add("hide");
    guessedLetters.classList.add("hide");

    playAgain.classList.remove("hide");
}

