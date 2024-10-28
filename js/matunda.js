document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    const images = {
        matunda: [
            "img/matunda/apples.png",
            "img/matunda/mango.jpg",
            "img/matunda/pineapple.jpg",
            "img/matunda/orange.png",
            "img/matunda/banana.jpg",
            "img/matunda/grapes.jpg",
            "img/matunda/kiwi.jpg",
            "img/matunda/lemon.jpg",
            "img/matunda/passion.jpg",
            "img/matunda/watermelon.jpg"
        ],
       
    };

    const choices = {
        matunda: [
            ["Tofaa", "Ndizi", "Chungwa"],
            ["Maharagwe", "Maembe", "Kiwi"],
            ["Nanasi", "Lemon", "Ndimu"],
            ["Tikiti Maji", "Tofaa", "Chungwa"],
            ["Maembe", "Ndizi", "Kiwi"],
            ["Ndimu", "Grapes", "Zabibu"],
            ["Maharagwe", "Kiwi", "Mahindi"],
            ["Ndimu", "Zabibu", "Maji"],
            ["Nanasi", "Pasheni", "Tofaa"],
            ["Bohora", "Kakara", "Tikiti Maji"],
        ],
        
    };

    const correctAnswers = {
        matunda: ["Tofaa", "Maembe", "Nanasi", "Chungwa", "Ndizi", "Zabibu", "Kiwi", "Ndimu", "Pasheni", "Tikiti Maji"],
        
    };

    let score = 0;
    let currentQuestionIndex = 0;

    function displayNextQuestion() {
        const currentQuestionCard = document.querySelector('.question-card.show');
        const nextQuestionCard = document.querySelector('.question-card.hidden');

        if (currentQuestionIndex < images[category].length) {
            const questionContainer = currentQuestionCard.querySelector('.card-content');
            questionContainer.innerHTML = "";

            const imgElement = document.createElement("img");
            imgElement.src = images[category][currentQuestionIndex];
            imgElement.alt = "Picha ya " + category;
            imgElement.classList.add("responsive-img", "question-image");
            questionContainer.appendChild(imgElement);

            // Create radio buttons for choices
            const choiceList = document.createElement("ul");
            choiceList.classList.add("collection");

            choices[category][currentQuestionIndex].forEach(choice => {
                const listItem = document.createElement("li");
                listItem.classList.add("collection-item");
                const radioInput = document.createElement("input");
                radioInput.type = "radio";
                radioInput.name = "answer";
                radioInput.id = choice;
                radioInput.value = choice;
                const label = document.createElement("label");
                label.htmlFor = choice;
                label.textContent = choice;
                listItem.appendChild(radioInput);
                listItem.appendChild(label);
                choiceList.appendChild(listItem);
            });

            questionContainer.appendChild(choiceList);

            // Add event listener to move to the next question on option selection
            choiceList.addEventListener("change", () => {
                const selectedAnswer = document.querySelector('input[name="answer"]:checked');
                const resultElement = document.createElement("p");
                if (selectedAnswer) {
                    const userAnswer = selectedAnswer.value;
                    const correctAnswer = correctAnswers[category][currentQuestionIndex];

                    // Display whether the answer is correct or wrong at the bottom
                    if (userAnswer === correctAnswer) {
                        resultElement.textContent = "Sahihi!";
                        score++;
                    } else {
                        resultElement.textContent = `Sio Sahihi.`;
                        selectedAnswer.classList.add('wrong'); // Add class to make the selected answer red
                    }

                    // Append result element to the bottom
                    questionContainer.appendChild(resultElement);

                    // Disable the radio buttons after checking the answer
                    const radioButtons = document.querySelectorAll('input[name="answer"]');
                    radioButtons.forEach(button => {
                        button.disabled = true;
                    });

                    // Move to the next question after a delay
                    setTimeout(() => {
                        currentQuestionCard.classList.remove('show');
                        currentQuestionCard.classList.add('hidden');
                        nextQuestionCard.classList.remove('hidden');
                        nextQuestionCard.classList.add('show');
                        currentQuestionIndex++;
                        displayNextQuestion();
                    }, 1000); // Adjust the delay as needed (in milliseconds)
                }
            });
        } else {
            // Hide question cards
            document.querySelectorAll('.question-card').forEach(card => {
                card.style.display = 'none';
            });

            // Show score card
            const scoreCard = document.querySelector('.score-card');
            scoreCard.style.display = 'block';

            // Display final score
            const categorySpan = document.getElementById("category");
            categorySpan.textContent = category;

            const scoreSpan = document.getElementById("score");
            scoreSpan.textContent = score;
        }
    }

    displayNextQuestion();
});
