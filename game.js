
// 3. Create an array called buttonColors that will hold the sequence "red", "blue", "green", "yellow"

var buttonColors = ["red", "blue", "green", "yellow"];

// 5. Create a new empty array called gamePattern
var gamePattern = [];

// 10. Create an empty array for userClickPattern
var userClickedPattern = []

var start = false;

var level = 0;

$(document).keydown(function() {

    if(!start) {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;

    }
});


// 1. Create a new function called nextSequence

function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    // 2. Generate a new random number from 0 to 3 and store it in a variable called randomNumber

    var randomNumber = Math.floor(Math.random() * 4);

    // 4. Create a new variable called randomChosenColor and use the randomNumber to select a randomColor rom the buttonColor array
    var randomChosenColor = buttonColors[randomNumber];

    // 6. Add the new randomChoserColor to the end of gamePattern array
    gamePattern.push(randomChosenColor);

    // 7. Use JQuery to select the button with the id of randomChoserColor
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // Call the playSound
    playSound(randomChosenColor);
}

// Function to check the answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong")
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press and Key to Restart");

        setTimeout(function () {
            $("body").addClass("game-over"); 
        }, 200);

        startOver();

    }
}


// 8. Function to playSound
function playSound (name) {
    var audio = new Audio("sounds/" + name+ ".mp3")
    audio.play();
}


// 9. Select the clicked button
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})


// Create a function called animatePress
function animatePress (currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function startOver () {
    level = 0;
    gamePattern = [];
    start = false;
}