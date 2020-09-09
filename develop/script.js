const question = document.getElementById("question");
const answerChoices = Array.from(document.getElementsByClassName("choice-text"));
const start = document.getElementById("start");
const quiz = document.getElementById("game")
const timer = document.getElementById("run-time");
const scoreEl = document.getElementById("score");

start.addEventListener("click", startQuiz);
// global variables needed for the game.
let currentQuestion = {};
let correctAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
const scoreVal = 10;
const maxQuestions = 5;
const startingMin = 1;
let time = startingMin * 60;
const timePenalty = 10;
let timerInterval;

//questions for the quiz
let questions = [{
        question: "Inside which HTML element do we put the JavaScript?",
        answer1: "<script>",
        answer2: "<Javascript>",
        answer3: "<js>",
        answer4: "<scripter>",
        answer: 1,

    },
    {
        question: "Which of the following is an anonymous function?",
        answer1: "function greetUser(name){ return 'welcome' + name;};",
        answer2: "function greetUser(){ return 'welcome'};",
        answer3: "function greetUser(){ return 'welcome'};",
        answer4: "var greet = function(){ return 'welcome'};",
        answer: 4,

    },
    {
        question: "How do you write hello world in an alert box?",
        answer1: "msgBox('Hello world')",
        answer2: "alertBox('Hello world')",
        answer3: "msg('Hello world')",
        answer4: "alert('Hello world')",
        answer: 4,

    },
    {
        question: "Which of the following is not a data type in javaScript?",
        answer1: "int",
        answer2: "boolean",
        answer3: "object",
        answer4: "number",
        answer: 3,

    },
    {
        question: "Which of the following is the correct way to call a function?",
        answer1: "setNum();",
        answer2: "int setNum;",
        answer3: "setNum",
        answer4: "null",
        answer: 1,

    },
]


// game quiz function
function startQuiz() {
    start.classList.add("hide");
    quiz.classList.remove("hide")
    questionCounter = 0;
    availableQuestions = [...questions];
    setNextQuestions();
    setTimer()
}

// this function will set questions
function setNextQuestions() {
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions || time === 0) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    }
    questionCounter++;
    const randQuestion = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randQuestion];
    question.innerText = currentQuestion.question;

    answerChoices.forEach(answer => {
        const number = answer.dataset["number"];
        answer.innerText = currentQuestion['answer' + number];
    })
    availableQuestions.splice(randQuestion, 1);
    correctAnswers = true;
}

// get info for when the user clicks on the answer options 
answerChoices.forEach(answer => {
    answer.addEventListener("click", event => {
        if (!correctAnswers) {
            return;
        }
        correctAnswers = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        let verifiyAnswer = '';
        if (selectedAnswer == currentQuestion.answer) {
            verifiyAnswer = "correct"
        } else {
            verifiyAnswer = "incorrect";
        }

        // add scores to the anwers when user selects a correct answer and deduct 10 seconds from the time when user selects a wrong answer
        if (verifiyAnswer === "correct") {
            setScore(scoreVal);
        } else {
            time -= timePenalty;
        }

        // add styles when the user selects correct and incorrect answers
        selectedChoice.parentElement.classList.add(verifiyAnswer);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(verifiyAnswer);
            setNextQuestions();
        }, 1000);
    });
});

// set game time
function setTimer() {
    timerInterval = setInterval(function () {
        time--;
        timer.innerText = "time: " + time;
    }, 1000);

    if (time === 0) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    }
}

// set game score
function setScore(num) {
    score += num;
    scoreEl.innerText = "Score:" + score;
}
