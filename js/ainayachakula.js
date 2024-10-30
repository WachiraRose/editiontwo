var foods = {
    "proteins": ["maziwa", "yai", "maharagwe"],
    "carbohydrates": ["mchele", "mkate", "viazi"],
    "vitamins": ["sukumawiki", "nyanya", "karoti"]
};

var currentCategory;
var currentIndex = 0;
var attemptCount = 0;

document.addEventListener('DOMContentLoaded', function () {
    var categorySelect = document.getElementById("categorySelect");
    categorySelect.addEventListener("change", chooseCategory);
    console.log("Event listener added to categorySelect");
});

function chooseCategory() {
    var categorySelect = document.getElementById("categorySelect");
    currentCategory = categorySelect.value;
    currentIndex = 0;
    attemptCount = 0;

    if (!currentCategory) {
        console.log("No category selected.");
        return;
    }

    console.log("Selected category:", currentCategory);

    // Hide category selection and update the background
    document.getElementById("categoryContainer").style.display = "none";
    document.getElementById("heading").innerText = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
    document.body.className = currentCategory === "proteins" ? "bg-proteins" : currentCategory === "carbohydrates" ? "bg-carbohydrates" : "bg-vitamins";

    showFoodImage();
}

function showFoodImage() {
    var imageContainer = document.getElementById("imageContainer");
    if (currentIndex < foods[currentCategory].length) {
        var food = foods[currentCategory][currentIndex];
        var imagePath = "img/" + currentCategory + "/" + food + ".jpg";
        imageContainer.innerHTML = "<img src='" + imagePath + "' alt='" + food + "'>";
        console.log("Displaying image for:", food);
        displayChoices(food);
    } else {
        showCategoryCompletionPopup();
    }
}

function displayChoices(correctAnswer) {
    var choicesContainer = document.getElementById("choicesContainer");
    choicesContainer.innerHTML = "";

    var choices = [...foods[currentCategory]];
    if (!choices.includes(correctAnswer)) choices.push(correctAnswer);
    choices = shuffleArray(choices).slice(0, 3);

    choices.forEach(choice => {
        var button = document.createElement("button");
        button.className = "w-full py-2 px-4 border rounded-lg bg-gray-100 hover:bg-blue-200 transition duration-200";
        button.innerText = choice;
        button.onclick = function () {
            checkGuess(choice);
        };
        choicesContainer.appendChild(button);
    });
}

function checkGuess(selectedChoice) {
    var correctAnswer = foods[currentCategory][currentIndex];
    if (selectedChoice === correctAnswer) {
        showPopup("Hongera! Correct!", "correct");
        setTimeout(() => {
            closePopup();
            currentIndex++;
            attemptCount = 0;
            showFoodImage();
        }, 1000);
    } else {
        attemptCount++;
        if (attemptCount >= 2) {
            showPopup("The correct answer is: <span class='correct-answer'>" + correctAnswer + "</span>", "wrong");
            setTimeout(() => {
                closePopup();
                currentIndex++;
                attemptCount = 0;
                showFoodImage();
            }, 2000);
        } else {
            showPopup("Incorrect! Try again.", "wrong");
        }
    }
}

function showPopup(message, status) {
    var popupText = document.getElementById("popupText");
    popupText.innerHTML = message;
    document.getElementById("popupMessage").classList.remove("hidden");

    if (status === "wrong") {
        setTimeout(() => {
            closePopup();
        }, 2000);
    }
}

function closePopup() {
    document.getElementById("popupMessage").classList.add("hidden");
}

function showCategoryCompletionPopup() {
    closePopup();
    var nextCategory = getNextCategory();
    if (nextCategory) {
        showPopup("Great job! You've completed this category. Do you want to try the " + nextCategory + " category?", "correct");
        document.getElementById("popupText").innerHTML += `
            <div class="mt-4 space-x-4">
                <button onclick="loadNextCategory()" class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">Yes</button>
                <button onclick="redirectToFood()" class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg">No</button>
            </div>`;
    } else {
        showPopup("Hongera, well done! You've completed all categories.", "completion");
        document.getElementById("popupText").innerHTML = `
            <p class="text-lg font-semibold">Hongera, well done! You've completed all categories.</p>
            <button onclick="goToHome()" class="mt-4 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg">Exit</button>`;
    }
}

function loadNextCategory() {
    var nextCategory = getNextCategory();
    if (nextCategory) {
        closePopup();
        document.getElementById("categorySelect").value = nextCategory;
        chooseCategory();
    }
}

function redirectToFood() {
    window.location.href = "ainayachakula.html";
}

function getNextCategory() {
    const categories = ["proteins", "carbohydrates", "vitamins"];
    const currentIndex = categories.indexOf(currentCategory);
    return categories[(currentIndex + 1) % categories.length];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function goToHome() {
    window.location.href = "ainayachakula.html"; // Replace with your home page URL if different
}
