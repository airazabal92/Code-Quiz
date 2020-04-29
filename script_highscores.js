// Add event listener to the Go Back button to redirect back to index.html
var goBackToIndex = document.querySelector("#goBack");

goBackToIndex.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.replace("index.html");
});

// Add event listener to the Clear highscores button to clear all lis & clear local storage
var clearScores = document.querySelector("#clearHighScores");

clearScores.addEventListener("click", function(event) {
  event.preventDefault();

  var list = document.getElementById("UlForHighScores");

  while(list.hasChildNodes()){
    list.removeChild(list.firstChild);
  }

  window.localStorage.clear();
});




// Get back the array of objects with the initials and scores stored so far
var finalInput = JSON.parse(window.localStorage.getItem("highscores"));

// Use forEach to go through each object in the array and display the intials and score
finalInput.forEach(setHighScores);

function setHighScores(item){
  var newLiEl = document.createElement("li");
  newLiEl.innerHTML = "<span style='color:#19A2B8'>" + "<strong>" + item.initials + "</strong></span>" + " - " + item.score;
  newLiEl.setAttribute("class", "list-group-item");
  document.getElementById("UlForHighScores").appendChild(newLiEl);
}

