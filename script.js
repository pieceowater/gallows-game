const words = ["apple", "banana", "cherry", "grape", "kiwi", "lemon", "orange", "pear", "pineapple", "strawberry", "watermelon", "blueberry", "blackberry", "raspberry", "peach", "mango", "pomegranate", "apricot", "avocado", "coconut", "fig", "guava", "lime", "lychee", "melon", "plum", "tangerine", "nectarine", "passionfruit", "persimmon", "dragonfruit", "starfruit"];
let word = words[Math.floor(Math.random() * words.length)].toLowerCase();
let wordArr = [...word];
let guessedLetters = [];
let numGuesses = 0;
const maxGuesses = 5;

const wordElement = document.querySelector(".word");
const guessElement = document.querySelector("#guess");
const guessBtn = document.querySelector("#guess-btn");
const resultElement = document.querySelector(".result");
const imageElement = document.querySelector(".gallows-img img");

const updateDisplayWord = () => {
    let displayWord = wordArr.map(letter => guessedLetters.includes(letter) ? letter.toUpperCase() : '_').join(' ');
    wordElement.innerText = displayWord;
};

const handleGuess = () => {
    let guess = guessElement.value.toLowerCase();
    if (!guess || guessedLetters.includes(guess)) {
        return;
    }
    guessedLetters.push(guess);
    if (wordArr.includes(guess)) {
        updateDisplayWord();
        resultElement.classList.add('good-result')
        resultElement.innerText = `Correct!`;
        if (!wordElement.innerText.includes("_")) {
            resultElement.classList.add('good-result')
            resultElement.innerText = "You Win!";
            guessBtn.innerText = "Refresh";
            guessBtn.setAttribute('onclick', 'window.location.reload()');
        }
    } else {
        numGuesses++;
        if (numGuesses === maxGuesses) {
            resultElement.classList.remove('good-result')
            resultElement.innerText = "You Lose!";
            wordElement.innerText = word.toUpperCase();
            guessBtn.innerText = "Refresh";
            guessBtn.setAttribute('onclick', 'window.location.reload()');
            updateGallowsImage();
        } else {
            resultElement.classList.remove('good-result')
            resultElement.innerText = `Incorrect Guess.\n${maxGuesses - numGuesses} guesses remaining.`;
            updateGallowsImage();
        }
    }
    guessElement.value = "";
};

guessBtn.setAttribute("onclick", 'handleGuess()');

const updateGallowsImage = () => {
    imageElement.setAttribute("src", `img/gallows/${numGuesses}.png`);
};

updateDisplayWord();
