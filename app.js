//event listeners
let addBtn = document.getElementById("addTitle");
addBtn.addEventListener("click", () => {
  newReview();
});

//GLOBAL VARIABLES
let currentReviewedGames = [];
let reviewedGamesTables = document.getElementById("reviewedGames");

// ---MODEL---

//MODEL: CREATE
function newReview() {
  let newTitle = getGameTitle();
  let newScore = getGameScore(newTitle);
  localStorage.setItem(newTitle, newScore);
}

function getGameTitle() {
  let noValidTitle = true;

  while (noValidTitle) {
    let curTitle = prompt("What game would you like to review?");
    if (curTitle != null) {
      return curTitle;
    }
  }
}

function getGameScore(curTitle) {
  let noValidScore = true;

  while (noValidScore) {
    let curScore = prompt(
      `How would you score ${curTitle} on a scale of 0-100?`
    );
    if (validScore(curScore)) {
      return curScore;
    }
  }
}

function validScore(inputScore) {
  if (inputScore < 100 && inputScore > 0) {
    return true;
  } else {
    return false;
  }
}

//MODEL : READ
function getLocalStorage() {
  currentReviewedGames = null;
  for (var i = 0; i < localStorage.length; i++) {
    let curKeyValuePair = [localStorage[i], localStorage.key(i)];
    currentReviewedGames[i] = curKeyValuePair;
  }
}

//MODEL : UPDATE

//MODEL : DELETE
function deleteItem(titleAsKey) {
  localStorage[titleAsKey].deleteItem();
  getLocalStorage();
}

//---CONTROLLER---

//Controller : Get current reviews
function getReviews() {
  currentReviewedGames.length = 0;
  for (let [key, value] of Object.entries(localStorage)) {
    currentReviewedGames.push([key, value]);
  }
}

//Controller : Create HTML for table
function createInnerHTML([key, value]) {
  let newTableRow = `<td>${key}</td><td>${value}%</td><td><button>Manage Title</button></td>`;

  return newTableRow;
}

//---VIEW---

//Update DOM
function updateGamesList(arrOfReviews) {
  for (let [key, value] in currentReviewedGames) {
    let htmlToAdd = createInnerHTML([key, value]);
    let currNewRow = reviewedGamesTables.insertRow(-1);
    currNewRow.innerHTML = htmlToAdd;
  }
}

getReviews();
updateGamesList(currentReviewedGames);
