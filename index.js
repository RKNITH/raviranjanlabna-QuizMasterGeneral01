const container = document.querySelector(".container")
const questionBox = document.querySelector(".question")
const choicesBox = document.querySelector(".choices")
const nextBtn = document.querySelector(".nextBtn")
const scoreCard = document.querySelector(".scoreCard")
const alert = document.querySelector('.alert')
const startBtn = document.querySelector('.startBtn')
const timer = document.querySelector('.timer')
const skipBtn = document.querySelector('.skipBtn');


const quiz = [
    {
        question: "Which CSS property is used to create space around elements?",
        choices: ["margin", "padding", "align-item", "center"],
        answer: "margin"
    },
    {
        question: "Which CSS property is used to specify the space between the cells of a table?",
        choices: ["border-spacing", "cell-spacing", "table-spacing", "spacing"],
        answer: "border-spacing"
    },
    {
        question: "Which CSS property is used to specify the size of an element's border?",
        choices: ["border-size", "outline-width", "border-width", "border-style"],
        answer: "border-width"
    },
    {
        question: "Which CSS property is used to make text bold?",
        choices: ["font-style", "text-transform", "font-weight", "text-style"],
        answer: "font-weight"
    },
    {
        question: "Which CSS property is used to change the color of text?",
        choices: ["color", "text-color", "font-color", "text-style"],
        answer: "color"
    },
    {
        question: "Which CSS property is used to control the flow of text between left and right margins?",
        choices: ["text-align", "text-justify", "text-flow", "text-position"],
        answer: "text-align"
    },
    {
        question: "Which CSS property is used to control the size of text?",
        choices: ["font-size", "text-size", "size", "text-scale"],
        answer: "font-size"
    },
    {
        question: "Which CSS property is used to set the background color of an element?",
        choices: ["background-color", "background", "bg-color", "bg"],
        answer: "background-color"
    },
    {
        question: "Which CSS property is used to specify the type of cursor to be displayed when pointing over an element?",
        choices: ["cursor", "pointer", "mouse-cursor", "cursor-type"],
        answer: "cursor"
    },
    {
        question: "Which CSS property is used to specify the distance between the lines of text?",
        choices: ["line-height", "text-spacing", "line-spacing", "text-height"],
        answer: "line-height"
    },

    {
        question: "Which CSS property is used to make text italic?",
        choices: ["font-style", "text-style", "italic", "text-transform"],
        answer: "font-style"
    },
    {
        question: "Which CSS property is used to underline text?",
        choices: ["underline", "text-decoration", "decoration", "text-underline"],
        answer: "text-decoration"
    },
    {
        question: "Which CSS property is used to specify the font family of text?",
        choices: ["font-family", "text-font", "font", "font-type"],
        answer: "font-family"
    },
    {
        question: "Which CSS property is used to set the opacity of an element?",
        choices: ["opacity", "transparent", "visibility", "transparency"],
        answer: "opacity"
    },
    {
        question: "Which CSS property is used to create a shadow effect around an element's box?",
        choices: ["shadow", "box-shadow", "element-shadow", "shadow-effect"],
        answer: "box-shadow"
    },
    {
        question: "Which CSS property is used to specify the thickness of an element's border?",
        choices: ["border-thickness", "outline-width", "border-width", "thickness"],
        answer: "border-width"
    },
    {
        question: "Which CSS property is used to specify the radius of the corners of an element's box?",
        choices: ["corner-radius", "radius", "border-radius", "box-corner"],
        answer: "border-radius"
    },
    {
        question: "Which CSS property is used to hide an element from the page without removing it?",
        choices: ["hide", "display", "visibility", "hidden"],
        answer: "display"
    },
    {
        question: "Which CSS property is used to rotate an element?",
        choices: ["rotate", "transform-rotate", "rotation", "transform"],
        answer: "transform"
    },
    {
        question: "Which CSS property is used to create a transition effect when changing property values?",
        choices: ["transition", "animate", "transition-effect", "property-transition"],
        answer: "transition"
    }


];


let currectQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerId = null;



const showQuestions = () => {
    const questionDetails = quiz[currectQuestionIndex]
    // console.log(questionDetails)
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = ''
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i]
        const choiceDiv = document.createElement('div')
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice')
        choicesBox.appendChild(choiceDiv)





        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected')
            }
        })

    }
    if (currectQuestionIndex < quiz.length) {
        startTimer();
    }


}

const showScore = () => {
    questionBox.textContent = '';
    choicesBox.textContent = '';
    scoreCard.textContent = `You scored ${score} out of ${quiz.length}`;
    displayAlert("you have completed quiz")
    nextBtn.textContent = "Encore"
    quizOver = true;
    timer.style.display = 'none'

}

const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currectQuestionIndex].answer) {

        displayAlert("Correct answwer")
        rightSound.play();
        score++;

    }
    else {
        displayAlert(`Wrong answer! ${quiz[currectQuestionIndex].answer} is the correct answer `)
        selectedChoice.style.backgroundColor = 'red';
        wrongSound.play();

    }
    timeLeft = 15;
    currectQuestionIndex++;
    if (currectQuestionIndex < quiz.length) {

        showQuestions();
    }
    else {
        showScore();
        stopTimer();
        // quizOver = true;
        // timer.style.display = 'none'

    }
}


const displayAlert = (msg) => {
    alert.style.display = 'block';
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = 'none'

    }, 2000)

}


const startTimer = () => {
    clearInterval(timerId)
    timer.textContent = timeLeft;
    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;

        if (timeLeft === 0) {
            timeEndSound.play();
            const confirmUser = confirm('Time Up!! Do you want to play the quiz again')

            if (confirmUser) {
                timeLeft = 15
                startQuiz()
            }
            else {
                startBtn.style.display = 'block'
                container.style.display = 'none'
                return;
            }

        }
    }
    timerId = setInterval(countDown, 1000)
}

const stopTimer = () => {
    clearInterval(timerId)

}


const shuffleQuestion = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currectQuestionIndex = 0;
    showQuestions();
}


const startQuiz = () => {
    timeLeft = 15;
    timer.style.display = 'flex'
    shuffleQuestion()

}



// Function to handle skip button click
const skipQuestion = () => {
    if (quizOver) {
        // If quiz is over, reset and start quiz again
        nextBtn.textContent = 'Next';
        scoreCard.textContent = '';
        currectQuestionIndex = 0;
        startQuiz();
        quizOver = false;
        score = 0;
    } else {
        // Move to the next question
        currectQuestionIndex++;
        if (currectQuestionIndex < quiz.length) {
            showQuestions();
        } else {
            showScore();
            stopTimer();
        }
    }
};

// Add event listener for skip button click
skipBtn.addEventListener('click', skipQuestion);





startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none'
    container.style.display = 'block'
    startQuiz()


})

nextBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {

        displayAlert('select your answer')
        return
    }
    if (quizOver) {
        nextBtn.textContent = 'Next';
        scoreCard.textContent = ''
        currectQuestionIndex = 0
        startQuiz();
        quizOver = false;
        score = 0
    }
    else {
        checkAnswer()
    }







})
