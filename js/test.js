const boxes = document.querySelectorAll('.box');
const container = document.querySelector('.container');
let dragSrcEl = null;

// Helper to handle drag start
function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    this.classList.add('dragging');
}

// Handle the drop event
function handleDrop(e) {
    e.preventDefault();
    const srcIndex = Array.from(container.children).indexOf(dragSrcEl);
    const targetIndex = Array.from(container.children).indexOf(this);

    // Swap boxes in their position
    const temp = boxes[srcIndex].innerHTML;
    boxes[srcIndex].innerHTML = boxes[targetIndex].innerHTML;
    boxes[targetIndex].innerHTML = temp;

    // Remove the dragging class
    dragSrcEl.classList.remove('dragging');
    this.classList.remove('dragging');

    // Check if in correct order
    checkOrder();
}

// Handle drag over
function handleDragOver(e) {
    e.preventDefault();
    return false;
}

// Handle drag end
function handleDragEnd() {
    this.classList.remove('dragging');
}

// Check if boxes are in the correct order
function checkOrder() {
    boxes.forEach(box => {
        if (box.innerHTML === correctBoxOrder[Array.from(boxes).indexOf(box)]) {
            box.classList.add('correct');
        } else {
            box.classList.remove('correct');
        }
    });
}

// Attach drag and drop event listeners
boxes.forEach(function(box) {
    box.addEventListener('dragstart', handleDragStart, false);
    box.addEventListener('dragover', handleDragOver, false);
    box.addEventListener('drop', handleDrop, false);
    box.addEventListener('dragend', handleDragEnd, false);
});

// Touch support for mobile screens
boxes.forEach(function(box) {
    box.addEventListener('touchstart', function(e) {
        e.preventDefault();
        dragSrcEl = this;
        this.classList.add('dragging');
    });

    box.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const touch = e.targetTouches[0];
        const elem = document.elementFromPoint(touch.pageX, touch.pageY);
        
        if (elem && elem.classList.contains('box') && elem !== dragSrcEl) {
            handleDrop.call(elem, e);
        }
    });

    box.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.classList.remove('dragging');
    });
});
