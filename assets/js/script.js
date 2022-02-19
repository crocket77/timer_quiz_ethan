// Start Quiz <button> with id="start"
var startBtn = document.getElementById('start');
// Start Quiz <button> with id="start"
var recordBtn = document.getElementById('record');
// start screen 
var startScreen = document.getElementById('start-screen');
//question screen

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
var score=0;
var usersArr=[];
let timeCount;

// function to start the quiz
function startQuiz() {
    score=0;
    questionIndex=0;

    // set timer
    timeCount = 20;
    // set displayed time 
    timerEl.textContent = timeCount;
    // start timer callback
    startTimer();

    // hide start screen
    startScreen.classList.add('hide');

    // display questions screen
    questionsScreen.classList.remove('hide');
    
    displayQuestions();

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
            questionsScreen.classList.add('hide');
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
  
    // if userAnswer = the answer to the current question show next question
    if (userAnswer === quizQuestions[questionIndex].answer) {
        score+=15;
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

        // deduct by 2sec
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
            }, 250);

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
            }, 100);
        }
    }
};
function endGame() {
    
    // stop the time
    clearInterval(timeInterval);

    // hide questions screen
    questionsScreen.classList.remove('start');
    questionsScreen.classList.add('hide');

    // end game screen
    endScreen.classList.remove('hide');
    endScreen.classList.add('start');

    //update and display the score
    score+=timeCount;
    displayedScore.innerText = score;
};

// loads scores from local storage, if any, to save into users empty array first
function loadScores() {

    // load saved scores
    let savedScores = localStorage.getItem('highScores');
    // turn savedScores into an array
    savedScores = JSON.parse(savedScores);

    // if there are no scores to display, do nothing
    if (savedScores === null) {
        return;
    }
    // else there are scores to display, add them to the users []; empty array
    else {
        usersArr = savedScores;
    }
};


// get the users name and score to save to local storage
function saveScore() {
    console.log("save score ran")
    // get users input value
    let userName = document.getElementById('user-name').value;


    // check for valid response
    if (userName.length > 0) {
        
        // push the input name and score into empty array
        usersArr.push ({
            user: userName,
            score: score 
        });
        alert("Your score has been saved!");
    }
    else {
        alert("Please enter a valid response!")
        return;
    }
    console.log("userArr:")
    // save users array to local storage but stringify first
    localStorage.setItem('highScores', JSON.stringify(usersArr));

    // hide end screen
    endScreen.classList.remove('start');
    endScreen.classList.add('hide');

    // show start game screen
    startScreen.classList.remove('hide');
    startScreen.classList.add('start');

    // reset timer text
    timerEl.textContent = 20;
};






loadScores();
startBtn.addEventListener('click', startQuiz);
recordBtn.addEventListener('click', saveScore);