const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const planets = [
    'Zaibaki',
    'Zuhura',
    'Dunia',
    'Mirihi',
    'Mshtarii',
    'Sarateni',
    'Zohali',
    'Kausi'
];

// Words to replace numbers 1-8
const indexWords = [
    'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'
];

// Store list items
const listItems = [];
let dragStartIndex;
let touchStartY;

createList();

// Insert list items into DOM
function createList() {
    [...planets]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((planet, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `
                <span class="planets">${indexWords[index]}</span>
                <div class="draggable" draggable="true">
                    <p class="swahili-name">${planet}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `;
            listItems.push(listItem);
            draggable_list.appendChild(listItem);
        });
    addEventListeners();
}

// Drag functions
function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();
        if (personName !== planets[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

// Add drag and touch event listeners
function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
        draggable.addEventListener('touchstart', touchStart);
        draggable.addEventListener('touchmove', touchMove);
        draggable.addEventListener('touchend', touchEnd);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

// Touch functions
function touchStart(e) {
    touchStartY = e.touches[0].clientY;
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function touchMove(e) {
    e.preventDefault();
    const touchMoveY = e.touches[0].clientY;
    const targetItem = document.elementFromPoint(e.touches[0].clientX, touchMoveY);

    if (targetItem && targetItem.closest('li') && targetItem.closest('li') !== this.closest('li')) {
        targetItem.closest('li').classList.add('over');
    }
}

function touchEnd(e) {
    const touchEndY = e.changedTouches[0].clientY;
    const targetItem = document.elementFromPoint(e.changedTouches[0].clientX, touchEndY);

    if (targetItem && targetItem.closest('li') && targetItem.closest('li') !== this.closest('li')) {
        const dragEndIndex = +targetItem.closest('li').getAttribute('data-index');
        swapItems(dragStartIndex, dragEndIndex);
    }

    // Remove the 'over' class from all list items
    listItems.forEach(item => item.classList.remove('over'));
}

check.addEventListener('click', checkOrder);
