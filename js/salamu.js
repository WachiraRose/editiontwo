const draggables = [
    { text: "Habari", answer: "Habari" },
    { text: "nani", answer: "nani" },
    { text: "shikamoo", answer: "shikamoo" },
    { text: "usiku", answer: "usiku" },
    { text: "pole", answer: "pole" }
];

const answerContainer = document.getElementById('answer-items');
const dropZones = document.querySelectorAll('.drop-zone');
const popupMessageA = document.getElementById('popup-message-a');
const confettiCanvas = document.getElementById('confetti');
const refreshButton = document.getElementById('refresh-button');
let confettiCtx = confettiCanvas.getContext('2d');
let confettiActive = false;

// Shuffle answers function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Add draggable items to the answer container
function addDraggables() {
    shuffle(draggables);
    draggables.forEach(item => {
        const draggableElement = document.createElement('div');
        draggableElement.className = 'draggable';
        draggableElement.draggable = true;
        draggableElement.dataset.answer = item.answer;
        draggableElement.textContent = item.text;

        // Set drag event
        draggableElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.answer);
        });

        answerContainer.appendChild(draggableElement);
    });
}

// Allow dropping on drop zones
dropZones.forEach(dropZone => {
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    dropZone.addEventListener('drop', (e) => {
        const answer = e.dataTransfer.getData('text/plain');
        const correctAnswer = dropZone.dataset.answer;

        // Check if answer is correct
        if (answer === correctAnswer) {
            dropZone.textContent = answer;
            dropZone.style.color = "green";
            playConfetti();
            dropZone.classList.add('filled');

            // Remove the draggable item from the answer container
            const draggable = document.querySelector(`.draggable[data-answer='${answer}']`);
            if (draggable) {
                draggable.remove();
            }

            // Check if all answers are filled
            if (Array.from(dropZones).every(zone => zone.classList.contains('filled'))) {
                refreshButton.style.display = 'block';
            }
        } else {
            // Return to answer container if wrong
            const draggable = document.querySelector(`.draggable[data-answer='${answer}']`);
            if (draggable) {
                draggable.style.color = "red";
                answerContainer.appendChild(draggable);
            }
        }
    });
});

 // Confetti function
 function playConfetti() {
    if (!confettiActive) {
        confettiActive = true;
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        let particles = [];

        for (let i = 0; i < 300; i++) {
            particles.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height,
                radius: Math.random() * 5 + 2,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                speed: Math.random() * 3 + 1,
                angle: Math.random() * Math.PI * 2
            });
        }

        function animateConfetti() {
            const confettiCtx = confettiCanvas.getContext('2d');
            confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            particles.forEach((particle, index) => {
                confettiCtx.beginPath();
                confettiCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                confettiCtx.fillStyle = particle.color;
                confettiCtx.fill();
                particle.x += Math.cos(particle.angle) * particle.speed;
                particle.y += Math.sin(particle.angle) * particle.speed;

                // Reset particles that go out of bounds
                if (particle.x < 0 || particle.x > confettiCanvas.width || particle.y < 0 || particle.y > confettiCanvas.height) {
                    particles.splice(index, 1);
                }
            });

            if (particles.length > 0) {
                requestAnimationFrame(animateConfetti);
            }
        }

        confettiCanvas.style.display = 'block'; // Show the canvas
        animateConfetti();

        // Hide confetti after 3 seconds
        setTimeout(() => {
            confettiCanvas.style.display = 'none'; // Hide confetti after 3 sec
            confettiActive = false; // Reset flag for next correct answer
        }, 3000);
    }
}

// Function to go to the next page
function goToNextPage() {
    window.location.href = 'salamu2.html'; // Replace with actual URL of the next page
}


function refreshQuiz() {
    // Reset drop zones
    dropZones.forEach(zone => {
        zone.textContent = '';
        zone.style.color = '';
        zone.classList.remove('filled');
    });
    answerContainer.innerHTML = '';
    refreshButton.style.display = 'none';
    addDraggables();
}

window.onload = () => {
    addDraggables();
};
