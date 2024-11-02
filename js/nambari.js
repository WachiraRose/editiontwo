const boxes = document.querySelectorAll('.box');
const container = document.getElementById('container');
let ghostBox = document.createElement('div');
ghostBox.classList.add('ghost-box');
document.body.appendChild(ghostBox);
const levelRanges = [
    { words: ['Moja', 'Mbili', 'Tatu', 'Nne', 'Tano', 'Sita', 'Saba', 'Nane', 'Tisa', 'Kumi'], backgroundColor: '#E9C46A' },
    { words: ['Kumi na Moja', 'Kumi na Mbili', 'Kumi na Tatu', 'Kumi na Nne', 'Kumi na Tano', 'Kumi na Sita', 'Kumi na Saba', 'Kumi na Nane', 'Kumi na Tisa', 'Ishirini'], backgroundColor: '#FFD700' },
    { words: ['Ishirini na Moja', 'Ishirini na Mbili', 'Ishirini na Tatu', 'Ishirini na Nne', 'Ishirini na Tano', 'Ishirini na Sita', 'Ishirini na Saba', 'Ishirini na Nane', 'Ishirini na Tisa', 'Thelathini'], backgroundColor: "#F4A261" },
    { words: ['Thelathini na Moja', 'Thelathini na Mbili', 'Thelathini na Tatu', 'Thelathini na Nne', 'Thelathini na Tano', 'Thelathini na Sita', 'Thelathini na Saba', 'Thelathini na Nane', 'Thelathini na Tisa', 'Arobaini'], backgroundColor: '#BC6C25' },
    { words: ['Arobaini na Moja', 'Arobaini na Mbili', 'Arobaini na Tatu', 'Arobaini na Nne', 'Arobaini na Tano', 'Arobaini na Sita', 'Arobaini na Saba', 'Arobaini na Nane', 'Arobaini na Tisa', 'Hamsini'], backgroundColor: '#B5838D' }
];

let currentLevel = 0;
let dragSrcEl = null;

// Handle drag start
function handleDragStart(e) {
    dragSrcEl = this;
    ghostBox.innerHTML = this.innerHTML;
    ghostBox.style.display = 'block';
    this.classList.add('dragging');
    e.dataTransfer?.setData('text/html', this.innerHTML);
}

// Update ghost box position during drag
function handleDrag(e) {
    ghostBox.style.left = `${e.pageX}px`;
    ghostBox.style.top = `${e.pageY}px`;
}

// Handle drop and check if boxes need to swap content
function handleDrop(e) {
    e.preventDefault();
    if (dragSrcEl !== this) {
        const temp = this.innerHTML;
        this.innerHTML = dragSrcEl.innerHTML;
        dragSrcEl.innerHTML = temp;
        checkOrder();
    }
    cleanupDrag();
}

// Handle touch events
function handleTouchStart(e) {
    dragSrcEl = this;
    ghostBox.innerHTML = this.innerHTML;
    ghostBox.style.display = 'block';
    this.classList.add('dragging');
    updateGhostPosition(e.touches[0].pageX, e.touches[0].pageY);
    e.preventDefault();
}

function handleTouchMove(e) {
    e.preventDefault();
    updateGhostPosition(e.touches[0].pageX, e.touches[0].pageY);
    const element = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    if (element && element.classList.contains('box') && element !== dragSrcEl) {
        const temp = element.innerHTML;
        element.innerHTML = dragSrcEl.innerHTML;
        dragSrcEl.innerHTML = temp;
        checkOrder();
    }
}

function handleTouchEnd() {
    cleanupDrag();
}

function updateGhostPosition(x, y) {
    ghostBox.style.left = `${x}px`;
    ghostBox.style.top = `${y}px`;
}

function cleanupDrag() {
    if (dragSrcEl) {
        dragSrcEl.classList.remove('dragging');
    }
    dragSrcEl = null;
    ghostBox.style.display = 'none';
}

function checkOrder() {
    const currentRange = levelRanges[currentLevel];
    let isLevelComplete = true;

    Array.from(container.children).forEach((box, index) => {
        if (box.innerHTML === currentRange.words[index]) {
            box.style.backgroundColor = '#9EBC9F'; // Correct position
        } else {
            box.style.backgroundColor = 'lightgray'; // Incorrect position
            isLevelComplete = false;
        }
    });

    if (isLevelComplete) {
        disableDragging();
        showCompletionPopup();
    }
}

function disableDragging() {
    boxes.forEach(box => {
        box.removeEventListener('dragstart', handleDragStart);
        box.removeEventListener('drag', handleDrag);
        box.removeEventListener('drop', handleDrop);
        box.removeEventListener('touchstart', handleTouchStart);
        box.removeEventListener('touchmove', handleTouchMove);
        box.removeEventListener('touchend', handleTouchEnd);
    });
}

function showCompletionPopup() {
    document.getElementById('popup').style.display = 'block';
    if (currentLevel === levelRanges.length - 1) {
        document.getElementById('popupMessage').innerText = 'Congratulations! You have completed all levels.';
        document.getElementById('restartButton').style.display = 'block';
        document.getElementById('homeButton').style.display = 'block';
        document.getElementById('nextLevelButton').style.display = 'none';
    } else {
        document.getElementById('popupMessage').innerText = `Level ${currentLevel + 1} completed!`;
        document.getElementById('nextLevelButton').style.display = 'block';
        document.getElementById('homeButton').style.display = 'none';
    }
}

function nextLevel() {
    currentLevel++;
    if (currentLevel < levelRanges.length) {
        const currentRange = levelRanges[currentLevel];
        shuffleBoxes(currentRange.words);
        document.getElementById('container').style.backgroundColor = currentRange.backgroundColor;
        document.getElementById('popup').style.display = 'none';
        addEventListeners(); // Re-add event listeners for new level
    }
}

function shuffleBoxes(words) {
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    boxes.forEach((box, index) => {
        box.innerHTML = shuffledWords[index];
        box.style.backgroundColor = 'lightgray';
    });
}

// Initial shuffle for level one
shuffleBoxes(levelRanges[0].words);
document.getElementById('container').style.backgroundColor = levelRanges[0].backgroundColor;

// Set up ghost box styling
ghostBox.style.position = 'absolute';
ghostBox.style.pointerEvents = 'none';
ghostBox.style.opacity = '0.8';
ghostBox.style.border = '2px dashed black';
ghostBox.style.padding = '8px';
ghostBox.style.backgroundColor = 'gray';
ghostBox.style.display = 'none';
ghostBox.style.width = '20px';
ghostBox.style.height = '20px';
ghostBox.style.fontSize = '0.8em';

// Add event listeners
function addEventListeners() {
    boxes.forEach(box => {
        box.addEventListener('dragstart', handleDragStart, false);
        box.addEventListener('drag', handleDrag, false);
        box.addEventListener('dragover', e => e.preventDefault(), false);
        box.addEventListener('drop', handleDrop, false);
        box.addEventListener('touchstart', handleTouchStart, false);
        box.addEventListener('touchmove', handleTouchMove, false);
        box.addEventListener('touchend', handleTouchEnd, false);
    });
}

addEventListeners(); // Set up event listeners for the first level

// "Next Level" and "Restart" buttons
document.getElementById('nextLevelButton').addEventListener('click', nextLevel);
document.getElementById('restartButton').addEventListener('click', () => location.reload());
document.getElementById('homeButton').addEventListener('click', () => {
    window.location.href = 'index.html'; // Replace with your homepage URL
});
