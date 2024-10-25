const draggables = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone');
const confettiCanvas = document.getElementById('confetti');
let confettiCtx = confettiCanvas.getContext('2d');
let confettiActive = false;

// Set up drag events
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
});

dropZones.forEach(dropZone => {
    dropZone.addEventListener('dragover', dragOver);
    dropZone.addEventListener('drop', drop);
});

function dragStart(e) {
    e.dataTransfer.setData('text', e.target.dataset.answer);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const answer = e.dataTransfer.getData('text');
    const correctAnswer = e.target.getAttribute('data-answer');

    if (answer === correctAnswer) {
        e.target.textContent = answer;
        triggerConfetti();
    } else {
        alert("Try Again!");
    }
}

// Confetti logic
function triggerConfetti() {
    if (confettiActive) return;
    confettiActive = true;

    let confettiDuration = 2000;
    let confettiCount = 150;
    let end = Date.now() + confettiDuration;
    
    function confettiParticle() {
        let colors = ['#f0e68c', '#add8e6', '#ff69b4', '#87ceeb', '#ffd700'];
        return {
            color: colors[Math.floor(Math.random() * colors.length)],
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height,
            radius: Math.random() * 4,
            dx: (Math.random() - 0.5) * 6,
            dy: Math.random() * 4 + 2
        };
    }

    let confetti = [];
    for (let i = 0; i < confettiCount; i++) {
        confetti.push(confettiParticle());
    }

    function renderConfetti() {
        if (Date.now() > end) {
            confettiActive = false;
            confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            return;
        }

        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confetti.forEach((particle, index) => {
            confettiCtx.beginPath();
            confettiCtx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
            confettiCtx.fillStyle = particle.color;
            confettiCtx.fill();

            particle.x += particle.dx;
            particle.y += particle.dy;

            if (particle.y > confettiCanvas.height) {
                confetti[index] = confettiParticle();
            }
        });

        requestAnimationFrame(renderConfetti);
    }

    renderConfetti();
}
