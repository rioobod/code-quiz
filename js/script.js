const data = [
    {
        question: "Commonly used data types DO Not Include:",
        correctAnswer: "3. alerts",
        possibilities: [
            "1. strings",
            "2. booleans",
            "3. alerts",
            "4. numbers"
        ]
    },
    {
        question: "The condition in an if /else statement is enclosed with __________.:",
        correctAnswer: "3. parenthesis",
        possibilities: [
            "1. quotes",
            "2. curley brackets",
            "3. parenthesis",
            "4. square brackets"
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store __________.:",
        correctAnswer: "4. all of the above",
        possibilities: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above"
        ]
    },
    {
        question: "A very useful tool during development and debugging for printing content to the debugger is:",
        correctAnswer: "4. console.log",
        possibilities: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log"
        ]
    }
]

//get elements from the DOM
let btn_QuizStart = document.getElementById("start-quiz");
let timer = document.getElementById("time");
timer.innerHTML = "Time: 0";
let startQuizPage = document.getElementById("start-quiz-page");

let questionList = document.getElementById("questions-list");
let questionHeading = document.getElementById("question-headings");
let questions_Btn = document.querySelectorAll(".q-btn");
let result = document.getElementById("result");
let scoreResults = document.getElementById("score-result");
let scoreTitle = document.getElementsByClassName("score-title");
let scoreVal = document.getElementById("score-val");
let submitInitials_btn = document.getElementById("submit-initials");
let highScoreSection = document.getElementById("high-score");
let highScoreField = document.getElementById("final-score");
let reset_btn = document.getElementById("reset-btn");

let highScore = document.getElementById("score");
console.log(highScore);
highScore.addEventListener("click", ()=>{
    startQuizPage.classList.add("hide");
    showHighScore();
});

//global variables
let curr = 0;
let score = 0;
let playerInitials = "";
let countDownTimer = 75;
let gameOver = false;
let playerInfo = {
    initials: "",
    score: 0
};
let playerHighScore = {
    initials: "",
    score: 0
}

btn_QuizStart.addEventListener("click", startGame);

// function for the countdown clock
function gameClock() {
    let timerInterval = setInterval(countDown, 1000);

    function countDown() {
        timer.innerHTML = "Time Remaining: " + countDownTimer;
        if (countDownTimer !== 0 && !gameOver) {
            countDownTimer--;
        } else if (countDownTimer === 0){
            console.log("Out of Time");
            gameOver = true;
            endGame();
            clearInterval(timerInterval)
        }
    }
}



//function to start the game.
function startGame(e) {
    e.preventDefault();
    startQuizPage.classList.add("hide");
    gameOver = false
    gameClock();
    playGame();
}

//function to play the game.
function playGame() {
    questionList.classList.remove("hide");
    if (curr < data.length) {
        showQuestion();
    } else {
        gameOver = true;
        endGame();
    }

}


//function to show the question.
function showQuestion() {
    result.innerHTML = ""
    const currQuestion = data[curr].question;
    const currCorrectAnswer = data[curr].correctAnswer;
    const currPossibles = data[curr].possibilities;


    //  add question to heading
    questionHeading.innerHTML = currQuestion;

    //    add text to each button
    addQuestions(currPossibles);
}

function addQuestions(currPossibles) {
    questions_Btn.forEach((btn, i) => {
        btn.innerHTML = currPossibles[i];
    })
    questions_Btn.forEach(btn => {
        btn.addEventListener("click", checkAnswers)
    })
}

//function to check answer
function checkAnswers(event) {
    if (data[curr].correctAnswer === event.target.innerHTML) {
        result.innerHTML = "Correct";
        score+= 5;
        console.log(`correct answer`)
    } else {
        result.innerHTML = "Incorrect";
        countDownTimer-= 10;
        console.log(`incorrect`)
    }

    curr++

    setTimeout(
        playGame,
        1000)
}

//function to show the score
function showScore() {
    scoreResults.classList.remove("hide");
    console.log(`score is: ${score}`)
    scoreVal.innerText = score;

    submitInitials_btn.addEventListener("click", function () {
        playerInitials = document.getElementById("input-initials").value;
        playerInfo = {
            initials: playerInitials,
            score: score
        }
        saveScore();
    })
}

function showHighScore() {
    scoreResults.classList.add("hide");
    highScoreSection.classList.remove("hide");
    highScoreField.innerText = `${playerHighScore.initials}: ${playerHighScore.score}`;

    reset_btn.addEventListener("click", resetGame);
}

//function to complete the game.
function endGame() {
    questionList.classList.add("hide");
    console.log("game over");

    showScore();

}

//function to reset game
function resetGame() {
    curr = 0;
    countDownTimer = 75;
    highScoreSection.classList.add("hide");
    startQuizPage.classList.remove("hide");
}


//function to check high score
function saveScore() {
    // let savedPlayer = [];
    if (localStorage.getItem("playerInfo")) {
        playerHighScore = JSON.parse(localStorage.getItem("playerInfo"))
        console.log(playerHighScore.score);
        console.log(playerInfo.score);
        if (playerInfo.score > playerHighScore.score) {
            console.log("new high score");
            localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
            playerHighScore = playerInfo;
        }
    } else {
        localStorage.setItem("playerInfo", JSON.stringify(playerInfo))
    }
    showHighScore();
}