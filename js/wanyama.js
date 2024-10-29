document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

     // Update the navigation title based on the category
     const navTitle = document.querySelector('.brand-logo');
     navTitle.textContent = `Wanyama wa  ${category.charAt(0).toUpperCase() + category.slice(1)}`;
 
 

    const images = {
        nyumbani: [
            "img/wanyama/cat.jpg",
            "img/wanyama/cow.jpg",
            "img/wanyama/mbwa.jpg",
            "img/wanyama/rabbit.jpg",
            "img/wanyama/goat.jpg",
            "img/wanyama/turkey.jpg",
            "img/wanyama/horse.jpg",
            "img/wanyama/pig.jpg",
            "img/wanyama/sheep.jpg",
            "img/wanyama/duck.jpg"
        ],
        porini: [
            "img/wanyama/lion.jpg",
            "img/wanyama/elephant.jpg",
            "img/wanyama/porcupine.jpg",
            "img/wanyama/buffalo.jpg",
            "img/wanyama/cheetah.jpg",
            "img/wanyama/racoon.jpg",
            "img/wanyama/baboon.jpg",
            "img/wanyama/warthog.jpg",
            "img/wanyama/hippo.jpg",
            "img/wanyama/reindeer.jpg"
        ],
        majini: [
            "img/wanyama/whale.jpg",
            "img/wanyama/eel.jpg",
            "img/wanyama/shark.jpg",
            "img/wanyama/octopus.jpg",
            "img/wanyama/swordfish.jpg",
            "img/wanyama/catfish.jpg",
            "img/wanyama/oyster.jpg",
            "img/wanyama/dolphin.jpg",
            "img/wanyama/seaurchin.jpg",
            "img/wanyama/seal.jpg"
        ],
    };

    const choices = {
        nyumbani: [
            ["Paka", "Chui", "Mbwa"],
            ["Mbuzi", "Ng'ombe", "Kiwi"],
            ["Mbwa", "Simba", "Kuku"],
            ["Mbuzi", "Sungura", "Paka"],
            ["Kuku", "Chui", "Mbuzi"],
            ["Ng'ombe", "Farasi", "Bata Mzinga"],
            ["Paka", "Farasi", "Sungura"],
            ["Kuku", "Nguruwe", "Mbu"],
            ["Simba", "Ndovu", "Kondo"],
            ["Bata", "Nungu", "Tembo"],
        ],
        porini: [
            ["Paka", "Simba", "Kiboko"],
            ["Sungura", "Nungu", "Ndovu"],
            ["Nungunungu", "Punda", "Tembo"],
            ["Kifaru", "Panya", "Kuku"],
            ["Mbu", "Nyati", "Chui"],
            ["Paka", "Komba", "Ng'ombe"],
            ["Punda", "Kifaru", "Nyani"],
            ["Ndovu", "Mbuzi", "Ngiri"],
            ["Chaza", "Kiboko", "Nzi"],
            ["Farasi", "Kulungu", "Sungura"]
        ],
        majini: [
            ["Mbu", "Kifaru", "Nyangumi"],
            ["Sungura", "Mkunga", "Paka"],
            ["Simba", "Papa", "Kiboko"],
            ["Nyangumi", "Pweza", "Papa"],
            ["Chuchunge", "Nyati", "Chui"],
            ["Kambare", "Nyangumi", "Mbu"],
            ["Kuku", "Simba", "Chaza"],
            ["Sili", "Pomboo", "Mwanamizi"],
            ["Mbuzi", "Paka", "Mwanamizi"],
            ["Chura", "Sili", "Twiga"],
        ],
    };

    const correctAnswers = {
        nyumbani: ["Paka", "Ng'ombe", "Mbwa", "Sungura", "Mbuzi", "Bata Mzinga", "Farasi", "Nguruwe", "Kondo", "Bata"],
        porini: ["Simba", "Ndovu", "Nungunungu", "Kifaru", "Chui", "Komba", "Nyani", "Ngiri", "Kiboko", "Kulungu"],
        majini: ["Nyangumi", "Mkunga", "Papa", "Pweza", "Chuchunge", "Kambare", "Chaza", "Pomboo", "Mwanamizi", "Sili"],
    };

    let score = 0;
    let currentQuestionIndex = 0;

    function displayNextQuestion() {
        const questionCard = document.querySelector('.question-card');

        if (currentQuestionIndex < images[category].length) {
            const questionContainer = questionCard.querySelector('.card-content');
            questionContainer.innerHTML = "";

            // Display image for the question
            const imgElement = document.createElement("img");
            imgElement.src = images[category][currentQuestionIndex];
            imgElement.alt = "Picha ya " + category;
            imgElement.classList.add("responsive-img", "question-image");
            questionContainer.appendChild(imgElement);

            // Create choices for the current question
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

            // Event listener to check answer selection
            choiceList.addEventListener("change", () => {
                const selectedAnswer = document.querySelector('input[name="answer"]:checked');
                const resultElement = document.createElement("p");
                if (selectedAnswer) {
                    const userAnswer = selectedAnswer.value;
                    const correctAnswer = correctAnswers[category][currentQuestionIndex];

                    // Feedback for correct/incorrect answer
                    if (userAnswer === correctAnswer) {
                        resultElement.textContent = "Sahihi!";
                        score++;
                    } else {
                        resultElement.textContent = `Sio Sahihi.`;
                        selectedAnswer.classList.add('wrong'); // Adds a style to wrong answer
                    }

                    // Show feedback
                    questionContainer.appendChild(resultElement);

                    // Disable further selections
                    document.querySelectorAll('input[name="answer"]').forEach(button => {
                        button.disabled = true;
                    });

                    // Move to next question after delay
                    setTimeout(() => {
                        currentQuestionIndex++;
                        displayNextQuestion();
                    }, 1000);
                }
            });
        } else {
            // Hide question cards and show score card
            questionCard.style.display = 'none';

            const scoreCard = document.querySelector('.score-card');
            scoreCard.style.display = 'block';

            // Display final score
            document.getElementById("category").textContent = category;
            document.getElementById("score").textContent = score;
        }
    }

    displayNextQuestion();
});
