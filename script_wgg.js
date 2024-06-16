// Array of words to choose from 
const words = [ 
    "canard", 
    "poule", 
    "vache", 
    "souris", 
    "cheval", 
    "cochon", 
    "chat", 
    "chien", 
]; 

let selectedWord;
let guessedlist;
let displayWord;
let score = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    initializeGame();
    document.getElementById("score").textContent = `Score: ${score}`;

    // Add event listener to input field for Enter key press
    document.getElementById("letter-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default form submission
            guessLetter(); // Call guessLetter function when Enter key is pressed
        }
    });
});

function initializeGame() {
    // Get a random word from the list 
    let randomIndex = Math.floor(Math.random() * words.length); 
    selectedWord = words[randomIndex]; 

    // Reset the guessed letters list 
    guessedlist = []; 

    // For initial display word 
    displayWord = ""; 
    for (let i = 0; i < selectedWord.length; i++) { 
        displayWord += "_ "; 
    } 
    document.getElementById("displayWord").textContent = displayWord; 
}

// Function to check guessed letter 
function guessLetter() { 
    let inputElement = document.getElementById("letter-input"); 

    // Check for empty input 
    if (!inputElement.value) { 
        alert("Empty Input box. Please add input letter"); 
        return; 
    } 

    let letter = inputElement.value.toLowerCase(); 

    // Clear the input field 
    inputElement.value = ""; 

    // Check if the letter has already been guessed 
    if (guessedlist.includes(letter)) { 
        alert("You have already guessed that letter!"); 
        return; 
    } 

    // Add the letter to the guessed letters array 
    guessedlist.push(letter); 

    // Update the word display based on the guessed letters 
    let updatedDisplay = ""; 
    let correctGuess = false;
    let allLettersGuessed = true; 
    for (let i = 0; i < selectedWord.length; i++) { 
        if (guessedlist.includes(selectedWord[i])) { 
            updatedDisplay += selectedWord[i] + " "; 
            if (selectedWord[i] === letter) {
                correctGuess = true;
            }
        } else { 
            updatedDisplay += "_ "; 
            allLettersGuessed = false; 
        } 
    } 
    document.getElementById("displayWord").textContent = updatedDisplay; 

    // Update the score
    if (correctGuess) {
        score++;
    }
    document.getElementById("score").textContent = `Score: ${score}`;

    // Check if score is a multiple of 10
    if (score % 10 === 0 && correctGuess) {
        alert("Bravo! Keep up the good work!");
    }

    // Check if all letters have been guessed 
    if (allLettersGuessed) { 
        alert("Congratulations! You guessed the word correctly!"); 
        initializeGame(); // Start a new game with a new word
    } 
}

