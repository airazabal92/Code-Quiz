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

    // Display questions on quiz
    displayQuestions();
    

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

// Display questions and keep track of which are correct/wrong 

function displayQuestions(){

    createHTMLSkeleton();

    // Boolean to keep track of whether or not question has been answered
    var questionAnswered = false;

    // Target div that will contain question
    var questionEL = document.getElementById("newColumnDivForQuestion");

    // Create new paragraph with quiz question
    var newQuizQuestion = document.createElement("p");

    // Add attributes to paragraph with question
    newQuizQuestion.style.fontSize = "25px"; 

    // Add question to element
    newQuizQuestion.textContent = questions[0].questText;

    // Add new paragraph to HTML
    questionEL.appendChild(newQuizQuestion);

    // Create new list that will hold buttons with options
    var newButtonListOptUl = document.createElement("ul");

    // Add id attribute to ul that will hold buttons
    newButtonListOptUl.setAttribute("id", "buttonListContainer");

    // Generate lis in ul element and add buttons to them
    for (i = 1; i < 5; i ++){
        var liName = document.createElement("li");
        liName.style.listStyle = "none";
        newButtonListOptUl.appendChild(liName);


        var buttonLi = document.createElement("button");
        liName.appendChild(buttonLi);
    }

    // Add list to HTML
    questionEL.appendChild(newButtonListOptUl);

    

    


    


    // Create new button with options for question
    var newOptionButton = document.createElement("button");




}

// Create HTML skeleton using Bootstrap's styling

function createHTMLSkeleton(){
    // Create new section div 
    var newSectionEL = document.createElement("section");

    // Target main div
    var mainEl = document.getElementById("main");

    // Add new section div to main div
    mainEl.appendChild(newSectionEL);

    // Create new row div
    var newRowEl = document.createElement("div");

    // Add classes to row div
    newRowEl.setAttribute("class", "row mt-3");

    // Add new row div to section div
    newSectionEL.appendChild(newRowEl);

    //Create new column div 
    var newColEl = document.createElement("div");

    // Add classes to column div & id
    newColEl.setAttribute("class", "col-12 text-center");
    newColEl.setAttribute("id", "newColumnDivForQuestion");

    // Add new column div to row div
    newRowEl.appendChild(newColEl);
}