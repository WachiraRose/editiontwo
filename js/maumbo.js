const shapes = [
    { image: "img/shapes/oval.jpg", answer: "duara dufu", answerId: "answer1-right" },
    { image: "img/shapes/rectangular.jpg", answer: "mche mstatili", answerId: "answer2-right" },
    { image: "img/shapes/pentagon.jpg", answer: "pembe tano", answerId: "answer3-right" },
    { image: "img/shapes/cube.jpg", answer: "mche mraba", answerId: "answer4-right" },
    { image: "img/shapes/circle.jpg", answer: "duara", answerId: "answer1-left" },
    { image: "img/shapes/triangle.jpg", answer: "pembe tatu", answerId: "answer2-left" },
    { image: "img/shapes/square.jpg", answer: "mraba", answerId: "answer3-left" },
    { image: "img/shapes/rectangle.jpg", answer: "mstatili", answerId: "answer4-left" }
];

let currentShapeIndex = 0;
let attempts = 0;
let shownShapes = [];

function getRandomShapeIndex() {
    let index;
    do {
        index = Math.floor(Math.random() * shapes.length);
    } while (shownShapes.includes(index) && shownShapes.length < shapes.length);
    return index;
}

function loadShape(index) {
    document.getElementById("shapeImage").src = shapes[index].image;
    document.getElementById("shapeAnswer").value = "";
    document.getElementById("message").textContent = "";
    document.getElementById("message").classList.remove("correct", "incorrect");
    document.getElementById("shapeAnswer").focus();
    attempts = 0;
}

function nextShape() {
    if (shownShapes.length === shapes.length) {
        document.getElementById("message").textContent = "Quiz complete! Refresh to try again.";
        document.getElementById("refresh").style.display = "block";
        document.getElementById("submit").style.display = "none";
    } else {
        currentShapeIndex = getRandomShapeIndex();
        shownShapes.push(currentShapeIndex);
        loadShape(currentShapeIndex);
    }
}

window.onload = function() {
    shownShapes = [];
    nextShape();
};

document.getElementById("submit").addEventListener("click", checkAnswer);

document.getElementById("shapeAnswer").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

function checkAnswer() {
    let userAnswer = document.getElementById("shapeAnswer").value.toLowerCase();
    let correctAnswer = shapes[currentShapeIndex].answer;

    if (userAnswer === correctAnswer) {
        document.getElementById("message").textContent = "Sahihi! ✓";
        document.getElementById("message").classList.add("correct");
        document.getElementById(shapes[currentShapeIndex].answerId).classList.add("strike-through");
        setTimeout(nextShape, 1000);
    } else {
        attempts++;
        document.getElementById("message").classList.add("incorrect");
        document.getElementById("message").textContent = attempts === 1 ? "Jaribu tena!" : `Correct answer: ${correctAnswer}`;
        if (attempts === 2) setTimeout(nextShape, 1500);
    }
}

document.getElementById("refresh").addEventListener("click", function() {
    location.reload();
});