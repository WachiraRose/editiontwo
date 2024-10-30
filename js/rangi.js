const questions = [
    { color: "nyekundu", image: "img/rangi/red.jpg"},
    { color: "nyeusi", image: "img/rangi/black.jpg" },
    { color: "kijivu", image: "img/rangi/grey.jpg" },
    { color: "manjano", image: "img/rangi/yellow.jpg" },
    { color: "buluu", image: "img/rangi/blue.jpg" },
    { color: "kijani", image: "img/rangi/green.jpg" },
    { color: "nyeupe", image: "img/rangi/white.jpg" },
    { color: "kahawia", image: "img/rangi/brown.jpg" },
    { color: "rangi ya chungwa", image: "img/rangi/orange.jpg" },
    { color: "zambarau", image: "img/rangi/purple.jpg" }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("colorImage").src = currentQuestion.image;
    document.getElementById("feedback").innerHTML = ""; // Reset feedback
    generateOptions(currentQuestion.color);
}

function generateOptions(correctColor) {
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = ""; // Clear previous options

    const colors = ["nyekundu", "nyeusi", "kijivu", "manjano", "buluu", "kijani", "nyeupe", "kahawia", "rangi ya chungwa", "zambarau",];
    const options = [correctColor, ...colors.filter(c => c !== correctColor)];
    const shuffledOptions = options.sort(() => Math.random() - 0.5).slice(0, 4);

    if (!shuffledOptions.includes(correctColor)) {
        shuffledOptions.pop();
        shuffledOptions.push(correctColor);
    }

    shuffledOptions.forEach(color => {
        const button = document.createElement("button");
        button.textContent = color;
        button.className = "btn btn-secondary btn-block my-2";
        button.onclick = () => checkAnswer(color, correctColor);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedColor, correctColor) {
    const feedbackElement = document.getElementById("feedback");
    if (selectedColor === correctColor) {
        feedbackElement.innerHTML = "Sahihi!";
        feedbackElement.classList.replace("text-muted", "text-success");
    } else {
        feedbackElement.innerHTML = `Sio Sahihi. <br>Jibu sahihi ni: <span class="correct-answer">${correctColor}</span>`;
        feedbackElement.classList.replace("text-muted", "text-danger");
    }
    setTimeout(() => {
        feedbackElement.classList.replace("text-danger", "text-muted");
        feedbackElement.classList.replace("text-success", "text-muted");
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            feedbackElement.textContent = "Quiz complete!";
            document.getElementById("restartButton").style.display = "inline-block";
        }
    }, 1500);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    document.getElementById("restartButton").style.display = "none";
    loadQuestion();
}

loadQuestion();