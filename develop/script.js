const question = document.getElementById("question");
const answerChoices = Array.from(document.getElementsByClassName("choice-text"));
const start = document.getElementById("start");
const quiz = document.getElementById("game")
const timer = document.getElementById("run-time");
const scoreEl = document.getElementById("score");


let currentQuestion = {};
let correctAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
const startingMin = 1;
let time = startingMin * 60;
let timerInterval;


let questions = [{
        question: "Inside which HTML elemt do we put the JavaScript?",
        answer1: "<script>",
        answer2: "<Javascript>",
        answer3: "<js>",
        answer4: "<scripter>",
        answer: 1,

    },
    {
        question: "What us the correct syntax for referring i=to an external script called 'xx.js'?",
        answer1: "<script href= 'xxx.js'>",
        answer2: "<script name= 'xxx.js'>",
        answer3: "<script src='xxx.js'>",
        answer4: "<script file='xxx.js'>",
        answer: 3,

    },
    {
        question: "How do you write hello world in an alert box?",
        answer1: "msgBox('Hello world')",
        answer2: "alertBox('Hello world')",
        answer3: "msg('Hello world')",
        answer4: "alert('Hello world')",
        answer: 4,

    }
]

const scoreVal = 10;
const maxQuestions = 3;

function startQuiz() {
    start.classList.add("hide");
    quiz.classList.remove("hide")
    questionCounter = 0;
    availableQuestions = [...questions];
    setNextQuestions();
    setTimer()
}

function setNextQuestions() {
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        start.classList.remove("hide");
        quiz.classList.add("hide")
        clearInterval(timerInterval);
        timer.innerText = "time: "+ 0;
        scoreEl.innerText = "Score: " + 0;

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
        // add scores to the anwers
        if(verifiyAnswer === "correct"){
            setScore(scoreVal);
        }


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

}

// set game score

function setScore(num) {
    score += num;
    scoreEl.innerText = "Score:" + score;
}
start.addEventListener("click", startQuiz);