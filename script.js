/* Global variable declarations 
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
    { questText: "String values must be enclosed within ______ when being assigned to variables.", opt1: "commas", opt2: "curly brackets", opt3: "quotes", opt4: "parentheses", correct: "button3" },
    { questText: "A very useful tool used during development and debugging for printing content to the debugger is:", opt1: "JavaScript", opt2: "terminal/bash", opt3: "for loops", opt4: "console.log", correct: "button4" }
];

// Seconds left in quiz
var secondsLeft = 75;

// Stores the id of the button was clicked 
var buttonClicked = "";

// Stores if answer was right/wrong
var checkAnswerText = "";

// Element that will host new questions
var newQuizQuestion="";

// Question number 
var questionNum = 0;

// Final score tracker
var finalScore;

// Reference to check when user inputs initials 
var submitHighScore = document.querySelector("#submit");

// Reference to local storage
var localScoresStorage = window.localStorage;

var numLocalStorage = 0;

// Correct answer tracker
var correct = 0; 


/* Logic/Functions  
-------------------------------------------------------------------- */

// Listen for click of "Start Quiz" button to start the countdown and quiz
button.addEventListener("click", function(){

    // Start the countdown on click
    startCountdown();

    // Remove first page content once button is clicked
    startContent.remove();

    // Start displaying questions
    displayQuestions(questionNum);
});

// Countdown 
function startCountdown(){

    var countdownTimer = setInterval(function() {
        timerSpan.textContent = secondsLeft; // Display seconds left
        secondsLeft --; // Subtract 1 second from timer per second

        // If seconds left = -1 (not 0 to compensate for lag) stop countdown and execution of questions and make sure to remove question section so it's not displayed on quiz recap page
        if (secondsLeft === -1){
            clearInterval(countdownTimer);
            
            // Make sure to remove question content if timer reaches 0 before all questions are answered 
            var questionSection = document.getElementById("newSectionForQuestions");
            questionSection.remove();

            allDone();
        }

        // If there are no more questions, stop countdown and execution of questions

        if (questionNum > 4){
            clearInterval(countdownTimer);
            allDone();
        }

        //If question is answered incorrectly, take away 10 seconds from countdown
        if(checkAnswerText === "Wrong"){
            checkAnswerText = "";
            secondsLeft = secondsLeft - 10;
        }
    }, 1000);
}

// Display questions and keep track of which are correct/wrong 
function displayQuestions(){

    // Create Bootstrap HTML skeleton for content
    createHTMLSkeleton();

    // Add question to element
    newQuizQuestion.textContent = questions[questionNum].questText;

    // Add text to buttons
    var button1 = document.getElementById("button1");
    button1.textContent = questions[questionNum].opt1;

    var button2 = document.getElementById("button2");
    button2.textContent = questions[questionNum].opt2;

    var button3 = document.getElementById("button3");
    button3.textContent = questions[questionNum].opt3;

    var button4 = document.getElementById("button4");
    button4.textContent = questions[questionNum].opt4;

    // Add if answer was right or wrong to bottom of question
    var answerText = document.createElement("p");
    answerText.innerHTML = "<br><hr>" + checkAnswerText;
    var answerDiv = document.getElementById("newColumnDivForQuestion");
    answerDiv.appendChild(answerText);

    // Create event listeners for all buttons 
    button1.addEventListener("click", checkAnswer);
    button2.addEventListener("click", checkAnswer);
    button3.addEventListener("click", checkAnswer);
    button4.addEventListener("click", checkAnswer);

    // Check answer against correct answer 
    function checkAnswer(){

        //Get id of button that was clicked
        buttonClicked = this.id;
        console.log(this.id);

        // Target section that contains question
        var sectionToClear = document.getElementById("newSectionForQuestions");

        // If answer is correct, set checkAnswerText to correct, then remove entire section
        if (buttonClicked == questions[questionNum].correct){
            console.log("RIGHT");
            checkAnswerText = "Correct!";
            correct++;
            sectionToClear.remove();
            
            // Add 1 to questionNum to move to next question
            questionNum++;

            // If question is greater than amount of questions, stop recursion, else continue
            if (questionNum > 4){
                console.log("DONE");
                return;
            }
            else{
                displayQuestions(questionNum);
            }
        }
        // If answer is wrong, set checkAnswer to wrong and remove entire section
        else{
            console.log("WRONG");
            checkAnswerText = "Wrong";
            sectionToClear.remove();

            // Add 1 to questionNum to move to next question
            questionNum++;

            // If question is greater than amount of questions, stop recursion, else continue
            if (questionNum > 4){
                console.log("DONE");
                console.log("YO WHY" + questionNum);
                return;
            }
            else{
                displayQuestions(questionNum);
            }
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
    newColEl.style.marginTop = "-42px";

    // Add new column div to row div
    newRowEl.appendChild(newColEl);

    // Target div that will contain question
    var questionEL = document.getElementById("newColumnDivForQuestion");

    // Create new paragraph with quiz question
    newQuizQuestion = document.createElement("p");

    // Add attributes to paragraph with question
    newQuizQuestion.style.fontSize = "25px"; 

    // Add new paragraph to HTML
    questionEL.appendChild(newQuizQuestion);

    // Create new list that will hold buttons with options
    var newButtonListOptUl = document.createElement("ul");

    // Add id attribute and styling to ul that will hold buttons
    newButtonListOptUl.setAttribute("id", "buttonListContainer");
    newButtonListOptUl.style.textAlign = "left";
    newButtonListOptUl.style.marginLeft = "28%";

    // Generate lis in ul element and add buttons/styling to them
    for (var i = 1; i < 5; i ++){
        var newliEl = document.createElement("li");
        newliEl.style.listStyle = "none";
        newButtonListOptUl.appendChild(newliEl);

        var buttonLi = document.createElement("button");
        buttonLi.setAttribute("id" , "button" + [i]);
        buttonLi.setAttribute("class", "btn btn-info");
        buttonLi.style.marginBottom = "5px";
        newliEl.appendChild(buttonLi);
    }

    // Add list to HTML
    questionEL.appendChild(newButtonListOptUl);
}

// Function to make form visible and add score to page at end of quiz
function allDone(){
    
    
 
    var formEl = document.getElementById("formElement");

    finalScore = ((correct/5) * 100) + "%";
    
    // Add score to page
    formEl.innerHTML = "<h2>All done!</h2><br> Your final score is " + finalScore + "<br>";

    // Make form visible
    var form = document.getElementById("hiddenForm");
    console.log("Form" + form);
    form.style.visibility = "visible";

    // Add if last answer was right or wrong to bottom of page
    var answerText = document.createElement("p");
    answerText.innerHTML = "<br><hr>" + checkAnswerText;
    var answerDiv = document.getElementById("lastQuestionEl");
    answerDiv.appendChild(answerText);
}

// Event listener for submiting initials and score

submitHighScore.addEventListener("click", function(event) {
    
    event.preventDefault();

    //numLocalStorage++;

    var userInitialsForm = document.getElementById("formForHighscores").elements;
    var userInitialsValueReference = userInitialsForm["initials"];

    var initialsValue = userInitialsValueReference.value.trim();

    // Checks to make sure initials are entered, and prompts user to enter valid input if they are not

    if (initialsValue == ""){
        alert ("You did not input your initials, please try again.")
    }
    else{
        var finalInput = JSON.parse(window.localStorage.getItem("highscores")) || [];
        
        var newScore = {
            initials: initialsValue,
            score: finalScore
        };
        
        finalInput.push(newScore);
        
        window.localStorage.setItem("highscores", JSON.stringify(finalInput));
        
        window.location.replace("highscores.html");
    }
});    

    


