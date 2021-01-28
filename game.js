//Link the random number to the color array, and create an new generated-array.

var buttonColours = ["red", "blue", "green", "yellow"];  //Pre-defined button color.
var gamePattern = [];  //Create an game random array.
var userClickedPattern = [];  //Create an user clicked array.

//Start - Detect the keypress, then start the game.

var started = false;
var level = 0;

$(document).keypress(function() {
  if(!started) {

    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//Create a user click - call back function.

$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour); //play sound of the user chosen color.
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1); //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
});

//Create a Check Answer function.

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout (function() {
        nextSequence();
      }, 1000);
    }
  } else { //Game over.
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout (function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
};


//Create a random color - call back function.

function nextSequence() {

  userClickedPattern = [];  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.

  level++;  //level up.
  $("#level-title").text("Level " + level);  //change the h1 text when level up.

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //create a buttin animation.
  playSound(randomChosenColour);  //play sound of the random chosen color.
}


//Create a play sound function to optimize the code.

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play(); //Play sound of the correspondant color, can be userChosenColour or randomChosenColour.

}


// Create the button-clicked animation.

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  //Add CSS style into button HTML.

  setTimeout(function() {
  $("#" + currentColor).removeClass("pressed");
 },100);  //Remove CSS style into button HTML.

}

//Restart the Game.

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
};
