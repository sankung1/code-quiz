const userName = document.getElementById("username");
const saveButton = document.getElementById("save-high-score");
const finalScore = document.getElementById("final-score");


const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
userName.addEventListener("keyup", function () {
    saveButton.disabled = !userName.value;
})

function saveHighScore(event) {
    event.preventDefault();

    const score = {
        score: mostRecentScore,
        name: userName.value
    };
    highScores.push(score);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    let element = event.target;
    if (element.matches("button") === true) {
        userName.value = "";
    }
}

saveButton.addEventListener("click", saveHighScore);