const boxes = document.querySelectorAll('.box');
const container = document.getElementById('container');
const levelRanges = [
  { words: ['Moja', 'Mbili', 'Tatu', 'Nne', 'Tano', 'Sita', 'Saba', 'Nane', 'Tisa', 'Kumi'], backgroundColor: 'E2765F' }, // brownish
  { words: ['Kumi na Moja', 'Kumi na Mbili', 'Kumi na Tatu', 'Kumi na Nne', 'Kumi na Tano', 'Kumi na Sita', 'Kumi na Saba', 'Kumi na Nane', 'Kumi na Tisa', 'Ishirini'], backgroundColor: '#67f967' }, // Light green
  { words: ['Ishirini na Moja', 'Ishirini na Mbili', 'Ishirini na Tatu', 'Ishirini na Nne', 'Ishirini na Tano', 'Ishirini na Sita', 'Ishirini na Saba', 'Ishirini na Nane', 'Ishirini na Tisa', 'Thelathini'], backgroundColor: '#665956 ' } // brownish grey
  // Add more levels as needed
];

let currentLevel = 0;
let dragSrcEl = null;

function handleDragStart(e) {
  this.classList.add('dragging');
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
  e.preventDefault();
  if (dragSrcEl !== this) {
    const srcIndex = Array.from(container.children).indexOf(dragSrcEl);
    const targetIndex = Array.from(container.children).indexOf(this);
    const temp = boxes[srcIndex].innerHTML;
    boxes[srcIndex].innerHTML = boxes[targetIndex].innerHTML;
    boxes[targetIndex].innerHTML = temp;
  }
  dragSrcEl = null;
  checkOrder();
}

function checkOrder() {
  const currentRange = levelRanges[currentLevel];
  const isCorrect = Array.from(container.children).every((box, index) => box.innerHTML === currentRange.words[index]);

  if (isCorrect) {
    container.classList.add('correct');
    document.getElementById('container').style.backgroundColor = currentRange.backgroundColor;
    document.getElementById('popup').style.display = 'block';

    if (currentLevel === levelRanges.length - 1) {
      document.getElementById('popupMessage').innerText = 'Congratulations! You have completed all levels.';
      document.getElementById('restartButton').style.display = 'block';
    } else {
      document.getElementById('popupMessage').innerText = `Level ${currentLevel + 1} completed!`;
      document.getElementById('nextLevelButton').style.display = 'block';
    }
  } else {
    container.classList.remove('correct');
  }
}

function nextLevel() {
  currentLevel++;
  if (currentLevel < levelRanges.length) {
    const currentRange = levelRanges[currentLevel];
    shuffleBoxes(currentRange.words);
    container.classList.remove('correct');
    document.getElementById('levelText').innerText = `Drag and drop the boxes to organize them!`;
    document.getElementById('container').style.backgroundColor = currentRange.backgroundColor;
  }
}

function shuffleBoxes(words) {
  const shuffledWords = [...words].sort(() => Math.random() - 0.5);
  boxes.forEach(function (box, index) {
    box.innerHTML = shuffledWords[index];
  });
}

// Shuffle boxes for level one initially
shuffleBoxes(levelRanges[0].words);

// Attach event listeners to boxes
boxes.forEach(function (box) {

  box.addEventListener('dragstart', handleDragStart, false);
  box.addEventListener('dragover', handleDragOver, false);
  box.addEventListener('drop', handleDrop, false);
});

// Event listener for the "Next Level" button
document.getElementById('nextLevelButton').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'none';
  nextLevel();
});

// Event listener for the "Restart" button
document.getElementById('restartButton').addEventListener('click', function() {
  currentLevel = 0;
  const currentRange = levelRanges[currentLevel];
  shuffleBoxes(currentRange.words);
  container.classList.remove('correct');
  document.getElementById('levelText').innerText = `Drag and drop the boxes to organize them!`;
  document.getElementById('container').style.backgroundColor = currentRange.backgroundColor;
  document.getElementById('popup').style.display = 'none';
  document.getElementById('restartButton').style.display = 'none';
});
