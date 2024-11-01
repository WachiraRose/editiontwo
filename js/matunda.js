const questions = [
    { fruit: "pesheni", image: "img/matunda/passion.jpg" },
    { fruit: "ndizi", image: "img/matunda/banana.jpg" },
    { fruit: "zabibu", image: "img/matunda/grapes.jpg" },
    { fruit: "tikiti maji", image: "img/matunda/watermelon.jpg" },
    { fruit: "ndimu", image: "img/matunda/lemon.jpg" },
    { fruit: "embe", image: "img/matunda/mango.jpg" },
    { fruit: "chungwa", image: "img/matunda/orange.png" }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("fruitImage").src = currentQuestion.image;
    document.getElementById("feedback").innerHTML = ""; // Reset feedback
    generateOptions(currentQuestion.fruit);
}

function generateOptions(correctFruit) {
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = ""; // Clear previous options

    const fruits = ["pesheni", "ndizi", "zabibu", "tikiti maji", "ndimu", "maembe", "chungwa"];
    const options = [correctFruit, ...fruits.filter(c => c !== correctFruit)];
    const shuffledOptions = options.sort(() => Math.random() - 0.5).slice(0, 4);

    if (!shuffledOptions.includes(correctFruit)) {
        shuffledOptions.pop();
        shuffledOptions.push(correctFruit);
    }

    shuffledOptions.forEach(fruit => {
        const button = document.createElement("button");
        button.textContent = fruit;
        button.className = "btn btn-secondary btn-block my-2";
        button.onclick = () => checkAnswer(fruit, correctFruit);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedFruit, correctFruit) {
    const feedbackElement = document.getElementById("feedback");
    if (selectedFruit === correctFruit) {
        feedbackElement.innerHTML = "Sahihi!";
        feedbackElement.classList.replace("text-muted", "text-success");
    } else {
        feedbackElement.innerHTML = `Sio Sahihi. <br>Jibu sahihi ni: <span class="correct-answer">${correctFruit}</span>`;
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