// English and Swahili months for the first page (first three months)
const questions = [
    { english: 'January', swahili: 'Januari', image: 'img/months/jan.jpg' },
    { english: 'February', swahili: 'Februari', image: 'img/months/feb.jpg' },
    { english: 'March', swahili: 'Machi', image: 'img/months/mar.jpg' },
];

// Shuffle the Swahili words
const shuffledSwahili = questions
    .map(question => question.swahili)
    .sort(() => Math.random() - 0.5);

// Create English items
const englishItemsContainer = document.querySelector('.english-column');
questions.forEach(question => {
    const englishItem = document.createElement('div');
    englishItem.className = 'english-item';
    englishItem.textContent = question.english;
    englishItem.dataset.answer = question.swahili;

    // Create an image element
    const imageElement = document.createElement('img');
    imageElement.src = question.image;
    imageElement.alt = question.english;
    imageElement.className = 'hidden'; // Initially hide the image
    englishItem.appendChild(imageElement);

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
    event.target.classList.add('dragging'); // Optional: Add a dragging class for styling
}

// Touch Start (for touch devices)
function touchStart(event) {
    const swahiliName = event.target.dataset.name;
    event.dataTransfer = event.dataTransfer || {};
    event.dataTransfer.setData('text/plain', swahiliName);
    
    // Show dragging feedback
    event.target.classList.add('dragging'); // Optional: Add a dragging class for styling

    // Call drop function immediately for touch
    setTimeout(() => drop(event), 0); // Use setTimeout to avoid immediate drop
}

// Drag Over
function dragOver(event) {
    event.preventDefault(); // Prevent default to allow drop
}

// Drop
function drop(event) {
    event.preventDefault(); // Prevent default behavior
    const swahiliName = event.dataTransfer.getData('text/plain');
    const englishItem = event.target;

    // Check if the dropped Swahili name matches the data-answer of the English item
    if (swahiliName === englishItem.dataset.answer) {
        englishItem.classList.add('correct');

        // Display matched item in the English column
        englishItem.textContent += ` - ${swahiliName}`;

        // Show the corresponding image
        const imageElement = englishItem.querySelector('img');
        imageElement.classList.remove('hidden'); // Show the image

        // Hide matched Swahili item
        const matchedSwahiliItem = document.querySelector(`.swahili-item[data-name="${swahiliName}"]`);
        matchedSwahiliItem.style.display = 'none';

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
document.getElementById('refresh-btn').addEventListener('click', function() {
    // Reset the quiz
    location.reload(); // Reloads the page to refresh the quiz
});
