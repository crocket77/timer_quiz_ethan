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
    // set timer
    timeCount = 20;
    // set displayed time 
    timerEl.textContent = timeCount;
    // start timer callback
    startTimer();

    // hide start screen
    startScreen.classList.add('hide');

    // display questions screen
    questionScreen.classList.remove('hide');


};

// start timer 
function startTimer() {
    // setInterval @ 1sec
    timeInterval = setInterval(function() {
        // deduct timerCount
        timeCount -= 1;
        timerEl.textContent = timeCount;
        // if time is less than or equal to 0
        if (timeCount <= 0) {
            // hide questions screen
            questionScreen.classList.add('hide');
        }
    }, 1000);
};




startBtn.addEventListener('click', startQuiz);