// English and Swahili words
const questions = [
    { english: 'Shirt', swahili: 'shati' },
    { english: 'Apron', swahili: 'eproni' },
    { english: 'Hand Bag', swahili: 'mkopa' },
    { english: 'Tie', swahili: 'tai' },
    { english: 'Boots', swahili: 'buti' },
    { english: 'Cap', swahili: 'chepeo' },
    { english: 'Uniform', swahili: 'sare' },
    { english: 'Belt', swahili: 'mshipi' },
    { english: 'Petticoat', swahili: 'kamisi' },
    { english: 'Cardigan', swahili: 'fulana' }
];

// Function to shuffle an array
function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

// Shuffle the Swahili words
const shuffledSwahili = shuffleArray(questions.map(question => question.swahili));

// Create English items
const englishItemsContainer = document.querySelector('.english-column');
questions.forEach(question => {
    const englishItem = document.createElement('div');
    englishItem.className = 'english-item';
    englishItem.textContent = question.english;
    englishItem.dataset.answer = question.swahili;
    englishItemsContainer.appendChild(englishItem);
});

// Create Swahili items
const swahiliContainer = document.getElementById('swahili-container');
shuffledSwahili.forEach(swahili => {
    const swahiliItem = document.createElement('div');
    swahiliItem.className = 'swahili-item';
    swahiliItem.textContent = swahili;
    swahiliItem.setAttribute('draggable', true);
    swahiliItem.dataset.name = swahili;

    // Add drag events
    swahiliItem.addEventListener('dragstart', dragStart);
    swahiliItem.addEventListener('touchstart', touchStart);
    swahiliContainer.appendChild(swahiliItem);
});

// Add drag-and-drop event listeners to English items
const englishItems = document.querySelectorAll('.english-item');
englishItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', drop);
});

// Drag Start
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.name);
    event.target.classList.add('dragging');
}

// Touch Start (for touch devices)
function touchStart(event) {
    const swahiliName = event.target.dataset.name;
    event.target.classList.add('dragging');
    event.target.dataset.dragging = swahiliName;
}

// Drag Over
function dragOver(event) {
    event.preventDefault(); // Prevent default to allow drop
}

// Drop
function drop(event) {
    event.preventDefault(); // Prevent default to allow drop
    const draggingItem = document.querySelector('.dragging');
    const swahiliName = draggingItem.dataset.dragging || event.dataTransfer.getData('text/plain');
    const englishItem = event.target;

    // Check if the dropped Swahili name matches the data-answer of the English item
    if (swahiliName === englishItem.dataset.answer) {
        englishItem.classList.add('correct');
        englishItem.textContent += ` - ${swahiliName}`; // Display matched item in the English column

        // Hide matched Swahili item
        draggingItem.style.display = 'none';
        draggingItem.classList.remove('dragging');

        // Check for completion
        checkCompletion();
    }
}

// Check if all pairs are matched
function checkCompletion() {
    const englishItems = document.querySelectorAll('.english-item');
    const allMatched = Array.from(englishItems).every(item => item.classList.contains('correct'));

    if (allMatched) {
        document.getElementById('congratulations-message').classList.remove('hidden'); // Show message
    }
}

// Refresh button functionality
document.getElementById('refresh-btn').addEventListener('click', function () {
    location.reload(); // Reloads the page to refresh the quiz
});
