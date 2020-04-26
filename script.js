/* Variable declarations 
-------------------------------------------------------------------- */

// Element that contains the timer number
var timerSpan = document.getElementById("quizTimer");

// Element that has the quiz name, instructions, and button
var startContent = document.getElementById("starterContent");

// Button that will start the quiz once clicked
var button = document.getElementById("startQuizButton");

// Array of objects with the questions, options, and correct answer
var questions = [
    { questText: "Commonly used data types DO NOT include :", opt1: "strings", opt2: "booleans", opt3: "alerts", opt4: "numbers", correct: "alerts" },
    { questText: "The condition in an if / else statement is encolsed within _______.", opt1: "quotes", opt2: "curly brackets", opt3: "parentheses", opt4: "square brackets", correct: "parentheses" },
    { questText: "Arrays in JavaScript can be used to store ______.", opt1: "numbers and strings", opt2: "other arrays", opt3: "booleans", opt4: "all of the above", correct: "all of the above" },
    { questText: "String values must be enclosed within ______ when being assigned to variables.", opt1: "commas", opt2: "curly brackets", opt3: "quotes", opt4: "parentheses", correct: "commas" },
    { questText: "A very useful tool used during development and debugging for printing content to the debugger is:", opt1: "JavaScript", opt2: "terminal/bash", opt3: "for loops", opt4: "console.log", correct: "console.log" }
];

// Seconds left in quiz
var secondsLeft = 75;

/* Logic/Functions  
-------------------------------------------------------------------- */

// Have 0 as standard value next to time text before button is clicked
timerSpan.textContent = "0";

// Listen for click of "Start Quiz" button to start the countdown and quiz
button.addEventListener("click", function(){

    // Start the countdown on click
    startCountdown();

    // Remove first page content once button is clicked
    startContent.remove();

});

// Countdown 
function startCountdown(){

    var countdownTimer = setInterval(function() {
        timerSpan.textContent = secondsLeft;
        secondsLeft --;

        if (secondsLeft === -1){
        clearInterval(countdownTimer);
        }
    }, 1000);
}
