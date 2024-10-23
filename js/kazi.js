const answers = ["Mpishi", "Seremala", "Hakimu", "Mkulima", "Rais", "Dereva", "Mwanariadha", "Mfinyanzi", "Kinyozi", "Askari"];
        let score = 0;
        let totalQuestions = answers.length;

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function generatePossibleAnswers() {
            const shuffledAnswers = shuffle([...answers]);
            const possibleAnswersContainer = document.getElementById('possible-answers');
            possibleAnswersContainer.innerHTML = ''; // Clear existing answers

            shuffledAnswers.forEach(answer => {
                const span = document.createElement('span');
                span.className = 'border rounded-full px-3 py-1 m-1 bg-gray-300 hover:bg-gray-400 cursor-pointer';
                span.innerText = answer;
                possibleAnswersContainer.appendChild(span);
            });
        }

        function nextQuestion(qNum) {
            const userAnswer = document.getElementById(`q${qNum}`).value.trim().toLowerCase();
            const correctAnswer = answers[qNum - 1].toLowerCase();

            if (userAnswer === correctAnswer) {
                score++;
                document.getElementById(`q${qNum}`).classList.add('correct');
            } else {
                document.getElementById(`q${qNum}`).classList.add('wrong');
            }

            document.getElementById(`score`).innerText = `Score: ${score}`;
            document.getElementById(`question-${qNum}`).classList.add('hidden');
            if (qNum < totalQuestions) {
                document.getElementById(`question-${qNum + 1}`).classList.remove('hidden');
            } else {
                endQuiz();
            }
        }

        function handleKeyPress(event, qNum) {
            if (event.key === "Enter") {
                nextQuestion(qNum);
            }
        }

        function endQuiz() {
            document.getElementById(`quiz-container`).classList.add('hidden');
            document.getElementById(`final-screen`).classList.remove('hidden');
            document.getElementById(`final-score`).innerText = `${score} out of ${totalQuestions}`;
            if (score === totalQuestions) {
                document.getElementById('congratulations').style.display = 'block';
            }
        }

        function restartQuiz() {
            score = 0;
            document.getElementById(`final-screen`).classList.add('hidden');
            document.getElementById(`quiz-container`).classList.remove('hidden');
            generatePossibleAnswers(); // Generate shuffled answers
            for (let i = 1; i <= totalQuestions; i++) {
                document.getElementById(`q${i}`).value = '';
                document.getElementById(`q${i}`).classList.remove('correct', 'wrong'); // Reset styles
                document.getElementById(`question-${i}`).classList.add('hidden');
                if (i === 1) document.getElementById(`question-${i}`).classList.remove('hidden');
            }
            document.getElementById(`score`).innerText = `Score: 0`;
            document.getElementById('congratulations').style.display = 'none';
        }

        // Initialize the quiz
        document.addEventListener("DOMContentLoaded", function() {
            generatePossibleAnswers(); // Generate shuffled answers on load
            document.getElementById(`question-1`).classList.remove('hidden'); // Show the first question
        });
