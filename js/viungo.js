const gridSize = 10;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const words = ['KARAFUU', 'HARADALI', 'SHAMIRI', 'PAKANGA', 'KITUNGUU', 'MDALASINI', 'DHANIA', 'PILIPILI', 'NYANYA', 'CHUMVI'];
const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33A1', '#FF33F6', '#FFD733', '#33FFDC', '#FF6B33', '#33D3FF', '#FFC733'];
let grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
let wordsFound = 0;

function getRandomLetter() {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function placeWord(word) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 100) {
        const direction = Math.floor(Math.random() * 3); // 0: horizontal, 1: vertical, 2: diagonal
        let row, col;

        if (direction === 0) { // horizontal
            row = Math.floor(Math.random() * gridSize);
            col = Math.floor(Math.random() * (gridSize - word.length));
            let fits = true;
            for (let i = 0; i < word.length; i++) {
                if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) {
                    fits = false;
                    break;
                }
            }
            if (fits) {
                for (let i = 0; i < word.length; i++) {
                    grid[row][col + i] = word[i];
                }
                placed = true;
            }
        } else if (direction === 1) { // vertical
            row = Math.floor(Math.random() * (gridSize - word.length));
            col = Math.floor(Math.random() * gridSize);
            let fits = true;
            for (let i = 0; i < word.length; i++) {
                if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) {
                    fits = false;
                    break;
                }
            }
            if (fits) {
                for (let i = 0; i < word.length; i++) {
                    grid[row + i][col] = word[i];
                }
                placed = true;
            }
        } else if (direction === 2) { // diagonal
            row = Math.floor(Math.random() * (gridSize - word.length));
            col = Math.floor(Math.random() * (gridSize - word.length));
            let fits = true;
            for (let i = 0; i < word.length; i++) {
                if (grid[row + i][col + i] !== '' && grid[row + i][col + i] !== word[i]) {
                    fits = false;
                    break;
                }
            }
            if (fits) {
                for (let i = 0; i < word.length; i++) {
                    grid[row + i][col + i] = word[i];
                }
                placed = true;
            }
        }
        attempts++;
    }
    if (attempts >= 100) {
        console.error(`Could not place word: ${word}`);
    }
}

words.forEach(word => placeWord(word));

for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
        if (grid[row][col] === '') {
            grid[row][col] = getRandomLetter();
        }
    }
}

const wordSearchContainer = document.getElementById('wordSearchContainer');
grid.forEach((row, rowIndex) => {
    row.forEach((letter, colIndex) => {
        const cell = document.createElement('div');
        cell.textContent = letter;
        cell.className = 'word-search-cell';
        cell.dataset.row = rowIndex;
        cell.dataset.col = colIndex;
        wordSearchContainer.appendChild(cell);
    });
});

const wordList = document.getElementById('wordList');
words.forEach((word, index) => {
    const li = document.createElement('li');
    li.textContent = word;
    li.dataset.color = colors[index];
    wordList.appendChild(li);
});

let selectedCells = [];
let isSelecting = false;

function selectCell(cell) {
    if (!cell.classList.contains('selected')) {
        cell.classList.add('selected');
        selectedCells.push(cell);
    }
}

function checkSelectedWord() {
    const selectedWord = selectedCells.map(cell => cell.textContent).join('');
    if (words.includes(selectedWord)) {
        const wordIndex = words.indexOf(selectedWord);
        const wordColor = colors[wordIndex];
        selectedCells.forEach(cell => {
            cell.classList.add('found');
            cell.style.backgroundColor = wordColor;
        });
        const li = [...wordList.getElementsByTagName('li')].find(li => li.textContent === selectedWord);
        if (li) {
            li.style.textDecoration = 'line-through';
        }
        wordsFound++;
        if (wordsFound === words.length) {
            showCongratulations();
        }
    }
    selectedCells.forEach(cell => cell.classList.remove('selected'));
    selectedCells = [];
}

function showCongratulations() {
    const message = document.getElementById('congratulationsMessage');
    message.style.display = 'block';
    document.getElementById('restartBtn').style.display = 'block';
    confetti();
}

function restartPuzzle() {
    grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    wordsFound = 0;
    selectedCells = [];
    document.getElementById('congratulationsMessage').style.display = 'none';
    document.getElementById('restartBtn').style.display = 'none';
    wordList.querySelectorAll('li').forEach(li => li.style.textDecoration = 'none');
    const cells = document.querySelectorAll('.word-search-cell');
    cells.forEach(cell => {
        cell.classList.remove('found', 'selected');
        cell.style.backgroundColor = ''; // Reset background color
    });

    words.forEach(word => placeWord(word));

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col] === '') {
                grid[row][col] = getRandomLetter();
            }
        }
    }

    const newCells = document.querySelectorAll('.word-search-cell');
    newCells.forEach((cell, index) => {
        const rowIndex = Math.floor(index / gridSize);
        const colIndex = index % gridSize;
        cell.textContent = grid[rowIndex][colIndex];
    });
}

function addCellEventListeners() {
    const cells = document.querySelectorAll('.word-search-cell');
    cells.forEach(cell => {
        // Mouse events
        cell.addEventListener('mousedown', (event) => {
            event.preventDefault();
            isSelecting = true;
            selectCell(cell);
        });

        cell.addEventListener('mouseenter', () => {
            if (isSelecting) {
                selectCell(cell);
            }
        });

        cell.addEventListener('mouseup', () => {
            if (isSelecting) {
                checkSelectedWord();
                isSelecting = false; // Stop selection on mouse up
            }
        });

        // Touch events
        cell.addEventListener('touchstart', (event) => {
            event.preventDefault(); // Prevent default touch behavior
            isSelecting = true;
            selectCell(cell);
        });

        cell.addEventListener('touchmove', (event) => {
            event.preventDefault(); // Prevent default touch behavior
            if (isSelecting) {
                const touch = event.touches[0]; // Get the touch position
                const targetCell = document.elementFromPoint(touch.clientX, touch.clientY);
                if (targetCell && targetCell.classList.contains('word-search-cell') && !selectedCells.includes(targetCell)) {
                    selectCell(targetCell);
                }
            }
        });

        cell.addEventListener('touchend', () => {
            if (isSelecting) {
                checkSelectedWord();
                isSelecting = false; // Stop selection on touch end
            }
        });
    });
}

addCellEventListeners();

// Confetti function
function confetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function randomColor() {
        const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33A1', '#FF33F6', '#FFD733', '#33FFDC', '#FF6B33', '#33D3FF', '#FFC733'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function createConfetti() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 10 + 5;
        const color = randomColor();
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }

    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
}
