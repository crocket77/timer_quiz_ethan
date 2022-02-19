const highScoresEl = document.getElementById('highscores');
// clear high scores button 
const clearBtn = document.getElementById('clear');


// load scores saved onto local storage
function loadsScores() {
    
    // get scores from local storage
    savedScores = localStorage.getItem('highScores');
    // turn loaded scores into array
    savedScores = JSON.parse(savedScores);
    // sort object by high score
    if(savedScores){
    savedScores.sort((a, b) => b.score - a.score);
    // iterate through the savedScores array
    for (var i = 0; i < savedScores.length; i++) {
        
        // set user name and score
        let userName = savedScores[i].user;
        let userScore = savedScores[i].score;

        // create li element for each user
        const listScoreEl = document.createElement('li');
        listScoreEl.classList.add('h6');
        // inner html to created li element
        listScoreEl.innerHTML = 'User: ' + userName + ' - Score: ' + userScore;

        // append each li element created to the parent ol
        highScoresEl.appendChild(listScoreEl);
    }
}
};




// clear scores from local storage
function clearScores(event) {

    // clear local storage
    localStorage.clear();


};


loadsScores();
// clear scores emptys saved scores
clearBtn.addEventListener('click', clearScores);

