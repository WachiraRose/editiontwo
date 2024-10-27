const draggables = [
    { text: "False", answer: "False" },
    { text: "True", answer: "True" },
    { text: "False", answer: "False" },
    { text: "True", answer: "True" },
    { text: "True", answer: "True" }
];

const answerContainer = document.getElementById('answer-items');
const dropZones = document.querySelectorAll('.drop-zone');
const refreshButton = document.getElementById('refresh-button');

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
        draggableElement.dataset.answer = item.answer;
        draggableElement.textContent = item.text;

        draggableElement.addEventListener('touchstart', handleTouchStart);
        draggableElement.addEventListener('touchmove', handleTouchMove);
        draggableElement.addEventListener('touchend', handleTouchEnd);

        answerContainer.appendChild(draggableElement);
    });
}

// Touch event handlers
let draggedElement = null;

function handleTouchStart(e) {
    e.preventDefault();
    draggedElement = e.target;
    draggedElement.style.position = 'absolute';
    draggedElement.style.zIndex = 1000;
}

function handleTouchMove(e) {
    e.preventDefault();

    const touch = e.touches[0];
    draggedElement.style.left = `${touch.pageX}px`;
    draggedElement.style.top = `${touch.pageY}px`;

    dropZones.forEach(zone => {
        const rect = zone.getBoundingClientRect();
        if (
            touch.pageX > rect.left &&
            touch.pageX < rect.right &&
            touch.pageY > rect.top &&
            touch.pageY < rect.bottom
        ) {
            zone.classList.add('highlight');
        } else {
            zone.classList.remove('highlight');
        }
    });
}

function handleTouchEnd(e) {
    const answer = draggedElement.dataset.answer;
    let dropped = false;

    dropZones.forEach(zone => {
        const rect = zone.getBoundingClientRect();
        if (
            e.changedTouches[0].pageX > rect.left &&
            e.changedTouches[0].pageX < rect.right &&
            e.changedTouches[0].pageY > rect.top &&
            e.changedTouches[0].pageY < rect.bottom &&
            zone.dataset.answer === answer
        ) {
            zone.textContent = answer;
            zone.style.color = "green";
            zone.classList.add('filled');
            draggedElement.remove();
            dropped = true;

            if (Array.from(dropZones).every(zone => zone.classList.contains('filled'))) {
                refreshButton.style.display = 'block';
            }
        }
        zone.classList.remove('highlight');
    });

    if (!dropped) {
        draggedElement.style.position = 'static';
    }
    draggedElement = null;
}

window.onload = () => {
    addDraggables();
};
