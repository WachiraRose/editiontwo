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
    dragSrcEl.classList.remove('dragging');
    dragSrcEl = null;
    checkOrder();
}

function checkOrder() {
    const currentRange = levelRanges[currentLevel];
    let isLevelComplete = true;

    Array.from(container.children).forEach((box, index) => {
        if (box.innerHTML === currentRange.words[index]) {
            box.style.backgroundColor = '#9EBC9F'; // Turns green when in the correct position
        } else {
            box.style.backgroundColor = 'lightgray'; // Reset to default if not in correct position
            isLevelComplete = false;
        }
    });

    if (isLevelComplete) {
        document.getElementById('popup').style.display = 'block';

        if (currentLevel === levelRanges.length - 1) {
            document.getElementById('popupMessage').innerText = 'Congratulations! You have completed all levels.';
            document.getElementById('restartButton').style.display = 'block';
            document.getElementById('homeButton').style.display = 'block';
            document.getElementById('nextLevelButton').style.display = 'none'; // Hide next button at the final level
        } else {
            document.getElementById('popupMessage').innerText = `Level ${currentLevel + 1} completed!`;
            document.getElementById('nextLevelButton').style.display = 'block';
            document.getElementById('homeButton').style.display = 'none'; // Hide Home button for intermediate levels
        }
    }
}

function nextLevel() {
    currentLevel++;
    if (currentLevel < levelRanges.length) {
        const currentRange = levelRanges[currentLevel];
        shuffleBoxes(currentRange.words);
        document.getElementById('container').style.backgroundColor = currentRange.backgroundColor;
        container.classList.remove('correct');
        document.getElementById('popup').style.display = 'none';
    }
}

function shuffleBoxes(words) {
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    boxes.forEach((box, index) => {
        box.innerHTML = shuffledWords[index];
        box.style.backgroundColor = 'lightgray'; // Reset color for new level
    });
}

// Initial shuffle for level one
shuffleBoxes(levelRanges[0].words);
document.getElementById('container').style.backgroundColor = levelRanges[0].backgroundColor;

// Attach event listeners to boxes
boxes.forEach(box => {
    box.addEventListener('dragstart', handleDragStart, false);
    box.addEventListener('dragover', handleDragOver, false);
    box.addEventListener('drop', handleDrop, false);
});

// "Next Level" and "Restart" button event listeners
document.getElementById('nextLevelButton').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
    nextLevel();
});

// Restart button functionality
document.getElementById('restartButton').addEventListener('click', () => {
    currentLevel = 0;
    const currentRange = levelRanges[currentLevel];
    shuffleBoxes(currentRange.words);
    document.getElementById('container').style.backgroundColor = currentRange.backgroundColor;
    document.getElementById('popup').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('homeButton').style.display = 'none'; // Hide Home button
});

// Event listener for the "Home" button
document.getElementById('homeButton').addEventListener('click', function() {
    // Redirect to the homepage or main menu
    window.location.href = 'index.html'; // Update to your actual homepage URL
});

// Touch support for small screens
boxes.forEach(box => {
    box.addEventListener('touchstart', handleTouchStart, false);
    box.addEventListener('touchmove', handleTouchMove, false);
    box.addEventListener('touchend', handleTouchEnd, false);
});

let touchSrcEl = null;

function handleTouchStart(e) {
    touchSrcEl = this;
    this.classList.add('dragging');
}

function handleTouchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const boxesArray = Array.from(boxes);
  boxesArray.forEach(box => {
      const boxRect = box.getBoundingClientRect();
      if (touch.clientX >= boxRect.left && touch.clientX <= boxRect.right &&
          touch.clientY >= boxRect.top && touch.clientY <= boxRect.bottom) {
          box.classList.add('hover'); // Add a hover class for visual feedback
      } else {
          box.classList.remove('hover');
      }
  });
}


function handleTouchEnd(e) {
  const touch = e.changedTouches[0];
  const boxesArray = Array.from(boxes);
  let droppedOn = false;

  boxesArray.forEach(box => {
      const boxRect = box.getBoundingClientRect();
      if (touch.clientX >= boxRect.left && touch.clientX <= boxRect.right &&
          touch.clientY >= boxRect.top && touch.clientY <= boxRect.bottom) {
          handleDrop(e); // Call handleDrop if dropped on a valid target
          droppedOn = true;
      }
  });

  if (!droppedOn) {
      touchSrcEl.classList.remove('dragging'); // Remove dragging class if not dropped on any box
  }

  touchSrcEl = null; // Reset the source element
}


// Initial level setup
document.getElementById('levelText').innerText = `Drag and drop the boxes to organize them!`;

function goHome() {
    // Redirect to the home page or a specified URL
    window.location.href = 'index.html'; // Replace 'index.html' with your actual home page URL
}
