var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var userChosenColour;
var gameOver = false;


// generates a random number between 0 and 3
function nextSequence() {;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    flashAnimation(randomChosenColor);
    playAudio(randomChosenColor);
    level++;
    $('h1').text(`Level ${level.toString()}`);
    return randomChosenColor;
}

/* Because of the new update, 
the user should first interact
 then media could play*/

$(document).keypress(function(event) {

    if (event && level === 0) {
        // $('h1').text(`Level ${level.toString()}`);
        gamePattern.push(nextSequence());
    }

    if (gameOver) {
        startOver();
    }

})


// Check Which Button is clicked
$('div[type="button"]').click(function() {

    if (level === 0) {
        alert('Press a key on the keyboard to start the game!');
    } else {
        userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);

        playAudio(userChosenColour);
        pressAnimation(userChosenColour);

        if (checkAnswer(gamePattern, userClickedPattern) &&
            (userClickedPattern.length === gamePattern.length)) {
            gamePattern.push(nextSequence());
            userClickedPattern = [];
        } else if (!(checkAnswer(gamePattern, userClickedPattern)) &&
            (userClickedPattern.length !== gamePattern.length)) {
            $('h1').text('You Failed! Press any key to play again!')
            $('body').addClass('game-over');
            playAudio('wrong');
            gameOver = true;
        }
    }

})


// checks the latest user selected key vs game selected one
function checkAnswer(game, user) {
    for (var i = user.length - 1; i >= 0; i--) {
        console.log(user[i] === game[i]);
        if (user[i] === game[i]) {
            return true;
        } else {
            return false;
        }
    }
}

// restarts the game
function startOver() {
    level = 0;
    var gamePattern = [];
    var userClickedPattern = [];
    $('body').removeClass('game-over');
    $('h1').text('Press A Key to Start');
}

// plays the audio
function playAudio(track) {
    var drumAudio = new Audio;
    drumAudio.src = `sounds/${track}.mp3`;
    drumAudio.play();
}

//Flash Animation
function flashAnimation(button) {
    $(`#${button}`).fadeOut(100).fadeIn(100);
}

// Press(click) Animation
function pressAnimation(button) {
    var chosenButton = $(`#${button}`);
    chosenButton.addClass('pressed');
    setTimeout(function() {
        chosenButton.removeClass('pressed')
    }, 100);
}

// changes the curser when hovers on a button
$('div[type="button"]').hover(function() {
    $(this).addClass('curser-change');
})