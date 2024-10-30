const answers = ["Mpishi", "Seremala", "Hakimu", "Mkulima", "Rais", "Dereva", "Mwanariadha", "Mfinyanzi", "Kinyozi", "Askari"];
let totalQuestions = answers.length;

// Shuffle array function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Generate Possible Answers List
function generatePossibleAnswers() {
    const shuffledAnswers = shuffle([...answers]);
    const possibleAnswersContainer = document.getElementById('possible-answers');
    possibleAnswersContainer.innerHTML = '';

    shuffledAnswers.forEach(answer => {
        const span = document.createElement('span');
        span.className = 'border rounded-full px-3 py-1 m-1 bg-gray-300 hover:bg-gray-400 cursor-pointer';
        span.innerText = answer;
        span.id = `answer-${answer}`;
        possibleAnswersContainer.appendChild(span);
    });
}

// Handle next question and check answers
function nextQuestion(qNum) {
    const userAnswer = document.getElementById(`q${qNum}`).value.trim().toLowerCase();
    const correctAnswer = answers[qNum - 1].toLowerCase();

    if (userAnswer === correctAnswer) {
        document.getElementById(`q${qNum}`).classList.add('correct');
        document.getElementById(`answer-${answers[qNum - 1]}`).classList.add('line-through'); // Strike through correct answer
    } else {
        showModal();
        document.getElementById(`q${qNum}`).classList.add('wrong');
        return;
    }

    document.getElementById(`question-${qNum}`).classList.add('hidden');
    if (qNum < totalQuestions) {
        document.getElementById(`question-${qNum + 1}`).classList.remove('hidden');
        setTimeout(() => {
            const nextInput = document.getElementById(`q${qNum + 1}`);
            nextInput.classList.add('shadow-input'); // Add grey shadow
            nextInput.focus(); // Focus on the next input
        }, 500); // Delay to allow user to see the transition
    } else {
        endQuiz();
    }
}

function handleKeyPress(event, qNum) {
    if (event.key === "Enter") {
        nextQuestion(qNum);
    }
}

// Show custom modal for incorrect answer
function showModal() {
    const modal = document.getElementById("wrong-answer-modal");
    modal.classList.remove("hidden");

    // Automatically hide modal after 2 seconds
    setTimeout(() => {
        modal.classList.add("hidden");
    }, 2000);
}

// Close the incorrect answer modal (for manual close, if needed)
function closeModal() {
    document.getElementById("wrong-answer-modal").classList.add("hidden");
}

// End Quiz
function endQuiz() {
    document.getElementById(`quiz-container`).classList.add('hidden');
    document.getElementById(`final-screen`).classList.remove('hidden');
    document.getElementById('congratulations').style.display = 'block'; // Show congratulatory message
}

// Restart Quiz
function restartQuiz() {
    document.getElementById(`final-screen`).classList.add('hidden');
    document.getElementById(`quiz-container`).classList.remove('hidden');
    generatePossibleAnswers();
    for (let i = 1; i <= totalQuestions; i++) {
        document.getElementById(`q${i}`).value = '';
        document.getElementById(`q${i}`).classList.remove('correct', 'wrong');
        document.getElementById(`question-${i}`).classList.add('hidden');
        if (i === 1) document.getElementById(`question-${i}`).classList.remove('hidden');
    }
    document.getElementById('congratulations').style.display = 'none'; // Hide congratulatory message on restart
}

// Initialize Quiz on Page Load
document.addEventListener("DOMContentLoaded", function() {
    generatePossibleAnswers();
    document.getElementById(`question-1`).classList.remove('hidden');
});
