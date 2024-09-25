const foodImages = [
    { name: "Dumplings", src: "dumplings.jpg" },
    { name: "Fried Rice", src: "fried_rice.jpg" },
    { name: "Spring Rolls", src: "spring_rolls.jpg" },
    { name: "Sweet and Sour Chicken", src: "sweet_sour_chicken.jpg" },
    { name: "Kung Pao Chicken", src: "kung_pao_chicken.jpg" },
];

let sequence = [];
let userInput = [];
let level = 0;

const foodImagesDiv = document.getElementById("food-images");
const messageDiv = document.getElementById("message");
const startButton = document.getElementById("start-button");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const clickSound = document.getElementById("click-sound");

function playSound(sound) {
    sound.currentTime = 0; // Reset sound to allow for replay
    sound.play();
}

function showSequence() {
    let index = 0;
    const interval = setInterval(() => {
        if (index >= sequence.length) {
            clearInterval(interval);
            return;
        }
        const food = document.getElementById(sequence[index]);
        food.classList.add("active");
        playSound(clickSound); // Play sound for the sequence
        setTimeout(() => {
            food.classList.remove("active");
        }, 1000);
        index++;
    }, 1500);
}

function checkInput() {
    return JSON.stringify(userInput) === JSON.stringify(sequence);
}

function startGame() {
    sequence = [];
    userInput = [];
    level = 0;
    messageDiv.innerText = '';
    nextLevel();
}

function nextLevel() {
    level++;
    userInput = [];
    sequence.push(foodImages[Math.floor(Math.random() * foodImages.length)].name);
    messageDiv.innerText = `Level ${level}`;
    showSequence();
}

function handleFoodClick(name) {
    userInput.push(name);
    playSound(clickSound); // Play sound when button is clicked
    if (userInput.length === sequence.length) {
        if (checkInput()) {
            playSound(correctSound); // Play correct sound
            messageDiv.innerText = 'Correct! Next Level!';
            setTimeout(nextLevel, 2000);
        } else {
            playSound(wrongSound); // Play wrong sound
            messageDiv.innerText = 'Wrong! Game Over!';
            setTimeout(startGame, 2000);
        }
    }
}

// Create food image elements
foodImages.forEach(food => {
    const img = document.createElement("img");
    img.src = food.src;
    img.id = food.name;
    img.className = "food-image";
    img.onclick = () => handleFoodClick(food.name);
    foodImagesDiv.appendChild(img);
});

startButton.onclick = startGame;

