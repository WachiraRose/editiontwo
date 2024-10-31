// English and Swahili months for the first page (first six months)
const questions = [
    { english: 'April', swahili: 'Aprili', image: 'img/months/apr.jpg' },
    { english: 'May', swahili: 'Mai', image: 'img/months/may.jpg' },
    { english: 'June', swahili: 'Juni', image: 'img/months/jun.jpg' },
];

// Shuffle the Swahili words
const shuffledSwahili = questions
    .map(question => question.swahili)
    .sort(() => Math.random() - 0.5);

// Create English items with images and Swahili names below
const englishItemsContainer = document.querySelector('.english-column');
questions.forEach(question => {
    const englishItem = document.createElement('div');
    englishItem.className = 'english-item';
    const img = document.createElement('img');
    img.src = question.image; // Set the image source
    img.alt = question.english; // Set alt text for accessibility
    const swahiliName = document.createElement('div');
    swahiliName.className = 'swahili-name';
    swahiliName.textContent = question.swahili; // Display Swahili name below the image
    swahiliName.style.display = 'none'; // Hide initially

    englishItem.appendChild(img);
    englishItem.appendChild(swahiliName);
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
    swahiliItem.addEventListener('touchstart', touchStart); // Added for touch devices
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
}

// Touch Start for touch devices
function touchStart(event) {
    const touch = event.touches[0];
    const target = event.currentTarget;
    const swahiliName = target.dataset.name;

    target.style.opacity = '0.5'; // Dim the item being dragged

    const dataTransfer = {
        setData: function(type, value) {
            target.dataset.draggedName = value;
        },
        getData: function(type) {
            return target.dataset.draggedName;
        }
    };
    dataTransfer.setData('text/plain', swahiliName);
    target.dispatchEvent(new CustomEvent('dragstart', { detail: dataTransfer }));

    target.addEventListener('touchend', function() {
        target.style.opacity = ''; // Restore opacity
    }, { once: true });
}

// Drag Over
function dragOver(event) {
    event.preventDefault(); // Prevent default to allow drop
}

// Drop
function drop(event) {
    event.preventDefault(); // Prevent default action (open as link)
    const swahiliName = event.dataTransfer.getData('text/plain');
    const englishItem = event.target.closest('.english-item'); // Ensure we drop on the correct item

    // Check if the dropped Swahili name matches the data-answer of the English item
    if (swahiliName === englishItem.dataset.answer) {
        englishItem.classList.add('correct');
        
        // Show matched Swahili name below the image
        const swahiliNameDiv = englishItem.querySelector('.swahili-name');
        swahiliNameDiv.style.display = 'block'; // Show the Swahili name
        
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
        document.getElementById('congratulations-message').style.display = 'block'; // Show message
    }
}

// Next page functionality
document.getElementById('next-btn').addEventListener('click', function() {
    // Navigate to the next page
    window.location.href = 'miezi3.html'; // Ensure to create this page
});
