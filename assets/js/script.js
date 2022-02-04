// Start Quiz <button> with id="start"
var startBtn = document.getElementById('start');
// start screen 
var startScreen = document.getElementById('start-screen');
//question screen
var questionScreen= document.getElementById('questions')


//timer display
let timerEl = document.getElementById('qTime');




let timeCount;

// function to start the quiz
function startQuiz() {
    // set timer time
    timeCount = 100;
    // set displayed time equal to starting time
    timerEl.textContent = timeCount;
    // start timer callback
    startTimer();

    // hide start screen
    startScreen.classList.remove('start');
    startScreen.classList.add('hide');

    // display questions screen
    questionsScreen.classList.remove('hide');
    questionsScreen.classList.add('start');

    // start with question 1
    currQuestionIndex = 0;
    // call showQuestions function to display questions
    displayQuestions();
};

// start timer 
function startTimer() {
    // setInterval @ 1sec
    timeInterval = setInterval(function() {
        // deduct timerCount
        timeCount -= 1;
        // let the displayed time equal this value
        timerEl.textContent = timeCount;
        // if time is less than or equal to 0
        if (timeCount <= 0) {
            // hide questions screen
            questionsScreen.classList.remove('start');
            questionsScreen.classList.add('hide');
        }
    }, 1000);
};




startBtn.addEventListener('click', startQuiz);