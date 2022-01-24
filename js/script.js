// the data
let questions = [
    "Commonly used data types DO Not Include:",
    "The condition in an if /else statement is enclosed with __________.:",
    "Arrays in JavaScript can be used to store __________.:",
    "A very useful tool during development and debugging for printing content to the debugger is:",
];

let questionAnswers = [
    [
        "1. strings",
        "2. booleans",
        "3. alerts",
        "4. numbers"
    ],
    [
        "1. quotes",
        "2. curley brackets",
        "3. parenthesis",
        "4. square brackets"
    ],
    [
        "1. numbers and strings",
        "2. other arrays",
        "3. booleans",
        "4. all of the above"
    ],
    [
        "1. JavaScript",
        "2. terminal/bash",
        "3. for loops",
        "4. console.log"
    ],
];

let correctAnswers = [
    "3. alerts",
    "3. parenthesis",
    "4. all of the above",
    "4. console.log"
];

//get elements from the DOM
let btn_QuizStart = document.getElementById("start-quiz");
let p_time = document.getElementById("time");
let startQuizPage = document.getElementById("start-quiz-page");

let question = document.getElementById("questions-1");
let questionHeading = document.getElementById("question-headings");
let question_Btn = document.querySelectorAll(".q-btn");

let counter = 0;

p_time.innerHTML = "Time: " + counter;

function Clock() {
    counter = 75;
    let countDown = () => {
        console.log(counter);
        p_time.innerHTML = "Time: " + counter;
        counter--;
        if (counter === 0) {
            console.log("counter ended");
            clearInterval(startCountDown);
        }
    };

    let startCountDown = setInterval(countDown, 1000);
}

function StartQuiz() {

      Clock();
    startQuizPage.classList.add("hide");
    Question();

}

btn_QuizStart.addEventListener("click", StartQuiz);


let result = document.getElementById("result");
let correct = false;
let currQuestionNumber = 0;
let score = 0;


function Question() {
   if (currQuestionNumber === 0) {
       ShowQuestions();
   } else if (currQuestionNumber < 4) {
       // currQuestionNumber = currQuestionNumber + 1;
       ShowQuestions();
   }

    // if ( currQuestionNumber <= 3 ) {
    //     currQuestionNumber = currQuestionNumber + 1;
    //     ShowQuestions()
    // } else if (currQuestionNumber === 0) {
    //     ShowQuestions()
    // }
}

function ShowQuestions() {
    console.log(currQuestionNumber);
    // debugger;
  result.innerHTML = '';
  question.classList.remove("hide");

  questionHeading.innerHTML = questions[currQuestionNumber];


    question_Btn.forEach((btn, i) => {
        btn.innerHTML = questionAnswers[currQuestionNumber][i];
        btn.addEventListener("click", ()=> {
            CheckCorrectAnswer(btn.innerHTML)
        })
    })

    // for (let i = 0; i < question_Btn.length ; i++) {
    //   question_Btn[i].innerHTML =
    //       questionAnswers[currQuestionNumber][i];
    //   question_Btn[i].addEventListener(
    //       'click',
    //       function () {
    //         CheckCorrectAnswer(question_Btn[i].innerHTML )
    //       },
    //   false)
    // }
    currQuestionNumber++
}

function CheckCorrectAnswer(answer) {
    // debugger
    console.log(answer);

    if (correctAnswers[currQuestionNumber] === answer) {
        console.log(`the answer listed is: ${correctAnswers[currQuestionNumber]}`)
        result.innerHTML = "Correct Answer"
        score = score + 5
        setTimeout(Question, 1000)
    } else {
        result.innerHTML = "Wrong Answer";
        setTimeout(Question, 1000)
    }

}

