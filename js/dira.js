// Swahili names for compass directions
const correctAnswers = {
    north: "kaskazini",
    south: "kusini",
    east: "mashariki",
    west: "magharibi"
};

function checkAnswers() {
    const result = document.getElementById('result');
    let score = 0;
    const total = Object.keys(correctAnswers).length;

    // Check each input value and populate compass points with user input
    Object.keys(correctAnswers).forEach(direction => {
        const userInput = document.getElementById(direction).value.toLowerCase();
        const point = document.querySelector(`.point[data-direction="${direction}"]`);
        
        if (userInput === correctAnswers[direction]) {
            score++;
            point.style.color = "green";
        } else {
            point.style.color = "red";
        }

        // Update compass point label with user input
        point.textContent = userInput.charAt(0).toUpperCase() + userInput.slice(1);
    });

    // Show result message
    if (score === total) {
        result.textContent = "Congratulations! You named all directions correctly!";
        result.style.color = "green";
    } else {
        result.textContent = `You got ${score} out of ${total} correct. Try again!`;
        result.style.color = "red";
    }
}

// Add event listener to submit answers on Enter key press
document.querySelectorAll('.input-container input').forEach(input => {
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkAnswers();
        }
    });
});
