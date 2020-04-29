// Add event listener to the Go Back button to redirect back to index.html
var goBackToIndex = document.querySelector("#goBack");

goBackToIndex.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.replace("index.html");
});

// Get back the array of objects with the initials and scores stored so far
var finalInput = JSON.parse(window.localStorage.getItem("highscores"));

// Use forEach to go through each object in the array and display the intials and score
finalInput.forEach(setHighScores);

function setHighScores(item){
  var newLiEl = document.createElement("li");
  newLiEl.textContent = item.initials + item.score;
  document.getElementById("UlForHighScores").appendChild(newLiEl);
}

