const boxes = document.querySelectorAll('.box');
const container = document.getElementById('container');
const levelRanges = [
    { words: ['Moja', 'Mbili', 'Tatu', 'Nne', 'Tano', 'Sita', 'Saba', 'Nane', 'Tisa', 'Kumi'], backgroundColor: '#E9C46A' },
    { words: ['Kumi na Moja', 'Kumi na Mbili', 'Kumi na Tatu', 'Kumi na Nne', 'Kumi na Tano', 'Kumi na Sita', 'Kumi na Saba', 'Kumi na Nane', 'Kumi na Tisa', 'Ishirini'], backgroundColor: '#FFD700' },
    { words: ['Ishirini na Moja', 'Ishirini na Mbili', 'Ishirini na Tatu', 'Ishirini na Nne', 'Ishirini na Tano', 'Ishirini na Sita', 'Ishirini na Saba', 'Ishirini na Nane', 'Ishirini na Tisa', 'Thelathini'], backgroundColor: "#F4A261" },
    { words: ['Thelathini na Moja', 'Thelathini na Mbili', 'Thelathini na Tatu', 'Thelathini na Nne', 'Thelathini na Tano', 'Thelathini na Sita', 'Thelathini na Saba', 'Thelathini na Nane', 'Thelathini na Tisa', 'Arobaini'], backgroundColor: '#BC6C25' },
    { words: ['Arobaini na Moja', 'Arobaini na Mbili', 'Arobaini na Tatu', 'Arobaini na Nne', 'Arobaini na Tano', 'Arobaini na Sita', 'Arobaini na Saba', 'Arobaini na Nane', 'Arobaini na Tisa', 'Hamsini'], backgroundColor: '#B5838D' }
];

let currentLevel = 0;
let dragSrcEl = null;

// Handle drag start (for desktop)
function handleDragStart(e) {
    dragSrcEl = this;
    this.classList.add('dragging');
    e.dataTransfer?.setData('text/html', this.innerHTML); // For desktop compatibility
}

// Handle drop (for desktop)
function handleDrop(e) {
    e.preventDefault();
    if (dragSrcEl !== this) {
        const temp = this.innerHTML;
        this.innerHTML = dragSrcEl.innerHTML;
        dragSrcEl.innerHTML = temp;
        checkOrder();
    }
    dragSrcEl.classList.remove('dragging');
    dragSrcEl = null;
}

// Touch functions for small screens
function handleTouchStart(e) {
    dragSrcEl = this;
    this.classList.add('dragging');
    e.preventDefault(); // Prevent default touch action
}

function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.targetTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains('box') && element !== dragSrcEl) {
        const temp = element.innerHTML;
        element.innerHTML = dragSrcEl.innerHTML;
        dragSrcEl.innerHTML = temp;
        checkOrder();
    }
}

function handleTouchEnd() {
    if (dragSrcEl) {
        dragSrcEl.classList.remove('dragging');
        dragSrcEl = null;
    }
}

// Check if boxes are in correct order
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
        showCompletionPopup();
    }
}

// Display completion popup
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

// Move to the next level
function nextLevel() {
    currentLevel++;
    if (currentLevel < levelRanges.length) {
        const currentRange = levelRanges[currentLevel];
        shuffleBoxes(currentRange.words);
        document.getElementById('container').style.backgroundColor = currentRange.backgroundColor;
        document.getElementById('popup').style.display = 'none';
    }
}

// Shuffle boxes for the level
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

// Event listeners for drag-and-drop
boxes.forEach(box => {
    box.addEventListener('dragstart', handleDragStart, false); // Desktop drag start
    box.addEventListener('drop', handleDrop, false); // Desktop drop
    box.addEventListener('dragover', e => e.preventDefault(), false); // Allow drop action

    // Touch events for drag-and-drop on small screens
    box.addEventListener('touchstart', handleTouchStart, false);
    box.addEventListener('touchmove', handleTouchMove, false);
    box.addEventListener('touchend', handleTouchEnd, false);
});

// "Next Level" and "Restart" buttons
document.getElementById('nextLevelButton').addEventListener('click', nextLevel);
document.getElementById('restartButton').addEventListener('click', () => location.reload());
document.getElementById('homeButton').addEventListener('click', () => {
    window.location.href = 'index.html'; // Replace with your homepage URL
});

function goHome() {
    window.location.href = 'index.html'; // Replace with your actual home page URL
}
