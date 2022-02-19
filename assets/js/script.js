// Start Quiz <button> with id="start"
var startBtn = document.getElementById('start');
// start screen 
var startScreen = document.getElementById('start-screen');
//question screen
var questionScreen= document.getElementById('questions')
//high score link
var highScoreLink= document.getElementById('hslink')

// QUESTIONS SCREEN
// reference questions screen
const questionsScreen = document.getElementById('questions');
// reference location where questions will display
const questionText = document.getElementById('question-title');
// reference locations where answer choices will display
const answer1Text = document.getElementById('answer1');
const answer2Text = document.getElementById('answer2');
const answer3Text = document.getElementById('answer3');
const answer4Text = document.getElementById('answer4');

//timer display
let timerEl = document.getElementById('qTime');
var questionIndex=0;

const endScreen = document.getElementById('end-screen');
let displayedScore = document.getElementById('userTime');


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
    
    displayQuestions();

};

// start timer 
function startTimer() {
    //hide highscore link
    highScoreLink.classList.add('hide');

    // setInterval @ 1sec
    timeInterval = setInterval(function() {
        // deduct timerCount
        timeCount -= 1;
        timerEl.textContent = timeCount;
        // if time is less than or equal to 0
        if (timeCount <= 0) {
            // hide questions screen
            questionScreen.classList.add('hide');
            endGame();
        }
    }, 1000);
};

// questions array
const quizQuestions = [
    {
        question: 'Which language is used for styling?',
        answer1: 'CSS',
        answer2: 'HTML',
        answer3: 'Javascript',
        answer4: 'All of these',
        answer: 'CSS'
    },    {
        question: 'Which language is used for logic?',
        answer1: 'CSS',
        answer2: 'HTML',
        answer3: 'Javascript',
        answer4: 'All of these',
        answer: 'Javascript'
    },    {
        question: 'Which language is used for Structure of the page?',
        answer1: 'CSS',
        answer2: 'HTML',
        answer3: 'Javascript',
        answer4: 'All of these',
        answer: 'HTML'
    },    {
        question: 'Which language is used for making webpages?',
        answer1: 'CSS',
        answer2: 'HTML',
        answer3: 'Javascript',
        answer4: 'All of these',
        answer: 'All of these'
    },    {
        question: 'Which language is uses for loops?',
        answer1: 'CSS',
        answer2: 'HTML',
        answer3: 'Javascript',
        answer4: 'All of these',
        answer: 'Javascript'
    },    {
        question: 'Which language is used for processing data?',
        answer1: 'CSS',
        answer2: 'HTML',
        answer3: 'Javascript',
        answer4: 'All of these',
        answer: 'Javascript'
    },    

];

// display questions
function displayQuestions() {

    // set question of current index
    let currQuestion = quizQuestions[questionIndex];

    if(questionIndex!=quizQuestions.length){
    // display current question 
    questionText.innerText = currQuestion.question;
    }
    else{
        endGame();
    }

};

// get value from clicked button and compare to correct answer
function clickedAnswer(event) {

    // let userAnswer = the text of the button the user clicked
    let userAnswer = event.target.innerText;
    
    // make button clicked out of focus to return 
    event.target.blur();

    // if userAnswer = the answer to the current question show next question
    if (userAnswer === quizQuestions[questionIndex].answer) {

        // if the current question is the last question, end the game
        if (questionIndex === 5) {
            endGame();
        }
        // else, go to the next question
        else {
            questionIndex+=1;
            displayQuestions();
        }
    } 
    // if the question is incorrect, subtract 10 secs and move onto next question or end game
    else {

        // deduct by 10sec
        timeCount-=2;

        // turn button clicked with wrong answer red
        event.target.classList.remove('btn-info');
        event.target.classList.add('btn-danger');

        if (questionIndex === 5 && userAnswer != quizQuestions[questionIndex].answer) {
            // delay display of end screen
            setTimeout(function () {
                // turn button clicked back to blue
                event.target.classList.remove('btn-danger');
                event.target.classList.add('btn-info');
                
                // end the game
                endGame();
            }, 1000);

        }
        else {
            // delay display of next question 
            setTimeout(function () {
                // turn button clicked back to blue
                event.target.classList.remove('btn-danger');
                event.target.classList.add('btn-info');

                // go to next question
                questionIndex++;
                displayQuestions();
            }, 1000);
        }
    }
};
function endGame() {
    let userScore = timeCount;
    // stop the time
    clearInterval(timeInterval);

    // hide questions screen
    questionsScreen.classList.remove('start');
    questionsScreen.classList.add('hide');

    // end game screen
    endScreen.classList.remove('hide');
    endScreen.classList.add('start');

    // // grab the time left as a score and display it on the screen
    // let displayedScore = document.getElementById('final-score');
    displayedScore.innerText = userScore;
};

startBtn.addEventListener('click', startQuiz);