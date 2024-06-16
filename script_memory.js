const cards = document.getElementsByClassName('card'); 
let movesDisplay = document.querySelector('.move-counter'); 
let toggledCardsArray = []; 
let move = 0; 
let winCount = 0; 
const restart = document.getElementById('restart'); 
let timer;
const timeDisplay = document.getElementById('timer');
const maxTime = 60;
let currentTime = maxTime;

const cardPairs = [
    [1, 7], 
    [2, 8],
    [3, 9], 
    [4, 10], 
    [5, 11], 
    [6, 12], 
];

// Initialize the timer
const initTimer = () => {
    clearInterval(timer);
    currentTime = maxTime;
    timeDisplay.innerText = currentTime;
    timer = setInterval(() => {
        if (currentTime > 0) {
            currentTime--;
            timeDisplay.innerText = currentTime;
        } else {
            clearInterval(timer); // Stop the timer
            alert('Time off!');
            initGame(); // Restart the game
        }
    }, 1000);
}

// Initialize the game
const initGame = () => {
    clearInterval(timer);
    currentTime = maxTime;
    movesDisplay.innerText = `Moves: 0`;
    timeDisplay.innerText = maxTime;
    move = 0;
    winCount = 0;
    toggledCardsArray = [];
    resetCards();
    initTimer();
}

// Function to reset cards
const resetCards = () => {
    const allCards = document.getElementsByClassName('card');
    Object.values(allCards).forEach(card => {
        card.classList.remove('toggled');
    });
}

// Function to shuffle card pairs
const shufflePairs = () => {
    for (let i = cardPairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }
}

// Restart button event listener
restart.addEventListener('click', initGame);

// Card click event listener
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        if (!this.classList.contains('toggled')) {
            this.classList.add("toggled"); 
            toggledCardsArray.push(this); 
            if (toggledCardsArray.length === 2) {
                const card1 = toggledCardsArray[0].id;
                const card2 = toggledCardsArray[1].id;
                if (isPair(card1, card2)) {
                    toggledCardsArray = [];
                    winCount++;
                } else {
                    setTimeout(() => {
                        toggledCardsArray.forEach(el => el.classList.remove("toggled"));
                        toggledCardsArray = [];
                    }, 500);
                }
                move++;
                movesDisplay.innerText = `Moves: ${move}`; 
                if (winCount === cardPairs.length) {
                    setTimeout(() => {
                        alert(`Congratulations!!! You won the game in ${move} moves.`);
                    }, 300);
                }
            }
        }
    });
}

// Function to check if two cards form a pair
function isPair(card1, card2) {
    for (let pair of cardPairs) {
        if ((pair[0] === parseInt(card1) && pair[1] === parseInt(card2)) || 
            (pair[0] === parseInt(card2) && pair[1] === parseInt(card1))) {
            return true; // The flipped cards form a pair
        }
    }
    return false; // The flipped cards do not form a pair
}

// Start the game initially
initGame();
