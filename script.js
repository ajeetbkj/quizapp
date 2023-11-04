document.addEventListener("DOMContentLoaded", function () {
    const quizContainer = document.querySelector(".quiz-container");
    const resultContainer = document.querySelector(".result-container");
    const questionElement = document.querySelector(".quiz-question");
    const optionElements = document.querySelectorAll(".option");
    const nextButton = document.getElementById("next-button");
    const scoreElement = document.getElementById("score");
    const resultMessage = document.getElementById("result-message");

    let currentQuestionIndex = 0;
    let score = 0;
    let quizStarted = false;

    const quizData = 
    [
        {
          "question": "What is the capital of France?",
          "options": ["New York", "London", "Paris", "Dublin"],
          "answer": "Paris"
        },
        {
          "question": "Which planet is known as the Red Planet?",
          "options": ["Earth", "Venus", "Mars", "Saturn"],
          "answer": "Mars"
        },
        {
          "question": "What is the largest mammal in the world?",
          "options": ["Giraffe", "Blue Whale", "Elephant", "Hippopotamus"],
          "answer": "Blue Whale"
        },
        {
          "question": "Who wrote the play 'Romeo and Juliet'?",
          "options": ["William Shakespeare", "Charles Dickens", "Jane Austen", "Leo Tolstoy"],
          "answer": "William Shakespeare"
        },
        {
          "question": "What is the chemical symbol for gold?",
          "options": ["Go", "Au", "Ag", "Gd"],
          "answer": "Au"
        },
        {
          "question": "Which gas do plants absorb from the atmosphere?",
          "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
          "answer": "Carbon Dioxide"
        },
        {
          "question": "What is the tallest mountain in the world?",
          "options": ["Mount Kilimanjaro", "Mount Fuji", "Mount Everest", "Mount Rushmore"],
          "answer": "Mount Everest"
        },
        {
          "question": "In which year did the Titanic sink?",
          "options": ["1912", "1920", "1935", "1941"],
          "answer": "1912"
        },
        {
          "question": "Who is the author of 'To Kill a Mockingbird'?",
          "options": ["Jane Austen", "Harper Lee", "Charles Dickens", "Mark Twain"],
          "answer": "Harper Lee"
        },
        {
          "question": "What is the largest organ in the human body?",
          "options": ["Heart", "Liver", "Skin", "Lung"],
          "answer": "Skin"
        }
      ];
      
    

    function startQuiz() {
        resultContainer.style.display = "none";
        loadQuestion(currentQuestionIndex);
    }
    function selectOption(selectedOptionElement, selectedOption, correctAnswer) {
        if (!selectedOptionElement.classList.contains("selected")) {
            selectedOptionElement.classList.add("selected");
            if (selectedOption === correctAnswer) {
                score++;
                selectedOptionElement.classList.add("correct");
            } else {
                selectedOptionElement.classList.add("incorrect");
            }
    
            
            optionElements.forEach((option) => {
                option.removeEventListener("click");
            });
        }
    }
    
    

    function loadQuestion(index) {
        if (index < quizData.length) {
            const currentQuestion = quizData[index];
            questionElement.textContent = currentQuestion.question;

           
            const shuffledOptions = shuffleArray(currentQuestion.options);

            optionElements.forEach((option, i) => {
                option.textContent = shuffledOptions[i];
                option.classList.remove("selected");
                option.addEventListener("click", () => selectOption(option, shuffledOptions[i], currentQuestion.answer));
            });

            nextButton.style.display = "block";
        } else if (quizStarted) {
            endQuiz();
        }
    }

    function selectOption(selectedOptionElement, selectedOption, correctAnswer) {
        if (!selectedOptionElement.classList.contains("selected")) {
            selectedOptionElement.classList.add("selected");
            if (selectedOption === correctAnswer) {
                score++;
            }
        }
    }

    function endQuiz() {
        quizContainer.style.display = "none";
        resultContainer.style.display = "block";
        scoreElement.textContent = `${score} out of 10`;
        displayResultMessage(score);
    }

    function displayResultMessage(score) {
        if (score === 10) {
            resultMessage.textContent = "Congratulations! You got all the questions correct!";
        } else {
            resultMessage.textContent = `You scored ${score} out of 10. Try again for a perfect score!`;
        }
    }

    function shuffleArray(array) {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    nextButton.addEventListener("click", () => {
        if (!quizStarted) {
            quizStarted = true;
        }
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
        if (currentQuestionIndex === quizData.length) {
            endQuiz();
            nextButton.style.display = "none"; 
        }
    });

    startQuiz();
});
