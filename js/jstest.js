const draggables = [
    { text: "True", answer: "True" },
    { text: "False", answer: "False" },
    { text: "False", answer: "False" },
    { text: "True", answer: "True" },
    { text: "True", answer: "True" }
];

const answerContainer = document.getElementById('answer-items');
const dropZones = document.querySelectorAll('.drop-zone');
const popupMessageA = document.getElementById('popup-message-a');
const popupMessageB = document.getElementById('popup-message-b');
const confettiCanvas = document.getElementById('confetti');
const refreshButton = document.getElementById('refresh-button');
let confettiActive = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function addDraggables() {
    shuffle(draggables);
    draggables.forEach(item => {
        const draggableElement = document.createElement('div');
        draggableElement.className = 'draggable';
        draggableElement.draggable = true;
        draggableElement.dataset.answer = item.answer;
        draggableElement.textContent = item.text;

        // Drag event
        draggableElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.answer);
        });

        // Touch event for dragging
        draggableElement.addEventListener('touchstart', (e) => {
            e.dataTransfer = {};
            e.dataTransfer.setData = (type, value) => {
                e.dataTransfer[type] = value;
            };
            e.dataTransfer.setData('text/plain', item.answer);
        });

        answerContainer.appendChild(draggableElement);
    });
}

dropZones.forEach(dropZone => {
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleDrop);

    // Add touch support
    dropZone.addEventListener('touchmove', handleTouchMove);
    dropZone.addEventListener('touchend', handleTouchDrop);
});

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const answer = e.dataTransfer.getData('text/plain');
    const correctAnswer = e.target.dataset.answer;

    processDrop(e.target, answer, correctAnswer);
}

function handleTouchMove(e) {
    const touch = e.touches[0];
    const answer = touch.target.dataset.answer;
    touch.target.style.position = 'absolute';
    touch.target.style.left = `${touch.pageX}px`;
    touch.target.style.top = `${touch.pageY}px`;
}

function handleTouchDrop(e) {
    const touch = e.changedTouches[0];
    const answer = touch.target.dataset.answer;
    const dropZone = document.elementFromPoint(touch.pageX, touch.pageY);

    if (dropZone && dropZone.classList.contains('drop-zone')) {
        const correctAnswer = dropZone.dataset.answer;
        processDrop(dropZone, answer, correctAnswer);
    }
}

function processDrop(dropZone, answer, correctAnswer) {
    if (answer === correctAnswer) {
        dropZone.textContent = answer;
        dropZone.style.color = "green";
        dropZone.classList.add('filled');
        playConfetti();

        const draggable = document.querySelector(`.draggable[data-answer='${answer}']`);
        if (draggable) {
            draggable.remove();
        }

        if (Array.from(dropZones).every(zone => zone.classList.contains('filled'))) {
            refreshButton.style.display = 'block';
        }
    } else {
        showPopup(popupMessageA, 'Try again!', dropZone);
    }
}

function showPopup(popup, message, target) {
    popup.textContent = message;
    popup.style.display = 'block';
    popup.style.top = target.getBoundingClientRect().top + window.scrollY + 'px';
    popup.style.left = target.getBoundingClientRect().left + 'px';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 1000);
}

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

                if (particle.x < 0 || particle.x > confettiCanvas.width || particle.y < 0 || particle.y > confettiCanvas.height) {
                    particles.splice(index, 1);
                }
            });

            if (particles.length > 0) {
                requestAnimationFrame(animateConfetti);
            }
        }

        confettiCanvas.style.display = 'block';
        animateConfetti();

        setTimeout(() => {
            confettiCanvas.style.display = 'none';
            confettiActive = false;
        }, 3000);
    }
}

function refreshQuiz() {
    dropZones.forEach(zone => {
        zone.textContent = '';
        zone.style.color = '';
        zone.classList.remove('filled');
    });

    answerContainer.innerHTML = '';
    addDraggables();

    refreshButton.style.display = 'none';
}

addDraggables();