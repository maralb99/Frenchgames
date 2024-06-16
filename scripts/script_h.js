const keyboardDiv = document.querySelector(".keyboard");

const getRandomWord = () => {
    // Wähle ein zufälliges Wort und einen Hinweis aus der Wortliste aus
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    // Setze den Hinweis im HTML
    document.querySelector(".hint-text b").innerText = hint;

    // Lösche den vorherigen Wortanzeige
    const wordDisplay = document.querySelector(".word-display");
    wordDisplay.innerHTML = "";

    // Zeige jedes Zeichen des Wortes als Unterstrich an
    for (let i = 0; i < word.length; i++) {
        const li = document.createElement("li");
        li.textContent = "_";
        wordDisplay.appendChild(li);
    }
}

// Erstelle Tastaturbuttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
}

// Rufe getRandomWord() auf, um das Spiel zu starten
getRandomWord();