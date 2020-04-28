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
    { questText: "Commonly used data types DO NOT include :", opt1: "strings", opt2: "booleans", opt3: "alerts", opt4: "numbers", correct: "button3" },
    { questText: "The condition in an if / else statement is enclosed within _______.", opt1: "quotes", opt2: "curly brackets", opt3: "parentheses", opt4: "square brackets", correct: "button3" },
    { questText: "Arrays in JavaScript can be used to store ______.", opt1: "numbers and strings", opt2: "other arrays", opt3: "booleans", opt4: "all of the above", correct: "button4" },
    { questText: "String values must be enclosed within ______ when being assigned to variables.", opt1: "commas", opt2: "curly brackets", opt3: "quotes", opt4: "parentheses", correct: "button1" },
    { questText: "A very useful tool used during development and debugging for printing content to the debugger is:", opt1: "JavaScript", opt2: "terminal/bash", opt3: "for loops", opt4: "console.log", correct: "button4" }
];

// Seconds left in quiz
var secondsLeft = 75;

// Stores the id of the button was clicked 
var buttonClicked = "";

// Stores if answer was right/wrong
var checkAnswerText = "";

var answer = false;


 

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

        displayQuestions(0);

});

// Countdown 
function startCountdown(){

    var countdownTimer = setInterval(function() {
        timerSpan.textContent = secondsLeft;
        secondsLeft --;

        if (secondsLeft === -1){
        clearInterval(countdownTimer);
        }

        if(checkAnswerText === "Wrong"){
            checkAnswerText = "";
            secondsLeft = secondsLeft - 10;
        }
    }, 1000);
}


// Display questions and keep track of which are correct/wrong 

function displayQuestions(questionNum){

    createHTMLSkeleton();

    // Target div that will contain question
    var questionEL = document.getElementById("newColumnDivForQuestion");

    // Create new paragraph with quiz question
    var newQuizQuestion = document.createElement("p");

    // Add attributes to paragraph with question
    newQuizQuestion.style.fontSize = "25px"; 

    // Add question to element
    newQuizQuestion.textContent = questions[questionNum].questText;

    // Add new paragraph to HTML
    questionEL.appendChild(newQuizQuestion);

    // Create new list that will hold buttons with options
    var newButtonListOptUl = document.createElement("ul");

    // Add id attribute to ul that will hold buttons
    newButtonListOptUl.setAttribute("id", "buttonListContainer");

    // Generate lis in ul element and add buttons to them
    for (var i = 1; i < 5; i ++){
        var newliEl = document.createElement("li");
        newliEl.style.listStyle = "none";
        newButtonListOptUl.appendChild(newliEl);


        var buttonLi = document.createElement("button");
        buttonLi.setAttribute("id" , "button" + [i]);
        newliEl.appendChild(buttonLi);
    }

    // Add list to HTML
    questionEL.appendChild(newButtonListOptUl);

    // Add text to buttons
    var button1 = document.getElementById("button1");
    button1.textContent = questions[questionNum].opt1;

    var button2 = document.getElementById("button2");
    button2.textContent = questions[questionNum].opt2;

    var button3 = document.getElementById("button3");
    button3.textContent = questions[questionNum].opt3;

    var button4 = document.getElementById("button4");
    button4.textContent = questions[questionNum].opt4;

    // Create event listeners for all buttons 

    button1.addEventListener("click", checkAnswer);
    button2.addEventListener("click", checkAnswer);
    button3.addEventListener("click", checkAnswer);
    button4.addEventListener("click", checkAnswer);

    // Check answer against correct answer 

    function checkAnswer(){
        buttonClicked = this.id;
        console.log(this.id);

        var sectionToClear = document.getElementById("newSectionForQuestions");

        if (buttonClicked == questions[questionNum].correct){
            console.log("RIGHT");
            checkAnswerText = "Correct!";
            sectionToClear.remove();

        }
        // If answer is wrong, set checkAnswer to wrong and trigger -10 seconds
        else{
            console.log("WRONG");
            checkAnswerText = "Wrong";
            sectionToClear.remove();
        }
        
    }
    console.log(questionNum);

}

// Create HTML skeleton using Bootstrap's styling

function createHTMLSkeleton(){

     // Section div that will host questions
    var newSectionEl = document.createElement("section");

    // Add id to new section
    newSectionEl.setAttribute("id", "newSectionForQuestions");

    // Target main div
    var mainEl = document.getElementById("main");

    // Add new section div to main div
    mainEl.appendChild(newSectionEl);

    // Create new row div
    var newRowEl = document.createElement("div");

    // Add classes to row div
    newRowEl.setAttribute("class", "row mt-3");

    // Add new row div to section div
    newSectionEl.appendChild(newRowEl);

    //Create new column div 
    var newColEl = document.createElement("div");

    // Add classes to column div & id
    newColEl.setAttribute("class", "col-12 text-center");
    newColEl.setAttribute("id", "newColumnDivForQuestion");

    // Add new column div to row div
    newRowEl.appendChild(newColEl);
}