const holes = document.querySelectorAll(".hole");
const playBtn = document.getElementById("playBtn");
const resetBtn = document.getElementById("resetBtn");
const scoreDisplay = document.getElementById("scorecard");

let holeNumber;
const holeClick = () => {
  holeNumber = getNumber(0, 5);
  holes[
    holeNumber
  ].innerHTML = `<img id="${holeNumber}" class='mole' src='./mole.png'/>`;
  setTimeout(() => {
    holes[holeNumber].innerHTML = null;
  }, 900);
};

// Class to count the score
class Score {
  constructor() {
    let count = 0;
    this.incrementCount = function () {
      count++;
    };
    this.decrementCount = function () {
      count--;
    };

    this.displayCount = function () {
      return count;
    };

    this.resetCount = function () {
      count = 0;
    };
  }
}

// counter instance here
const counter = new Score();

const holeListen = (event) => {
  let target_id = event.target.id;
  target_id = target_id.replace("hole", "");
  if (target_id == holeNumber) {
    counter.incrementCount();
    scoreDisplay.innerText = counter.displayCount();
  } else {
    counter.decrementCount();
    scoreDisplay.innerText = counter.displayCount();
  }
};

let timeInterval;
let playBtnEvent;
playBtnEvent = playBtn.addEventListener("click", () => {
  clearInterval(timeInterval);
  holes.forEach((hole) => {
    hole.addEventListener("click", holeListen);
  });
  timeInterval = setInterval(holeClick, 1500);
  setTimeout(() => {
    clearInterval(timeInterval);
    holes.forEach((hole) => {
      hole.removeEventListener("click", holeListen);
    });
  }, 10000);
});

// Removing the play button event in case of reset event
resetBtn.addEventListener("click", () => {
  clearInterval(timeInterval);
  counter.resetCount();
  scoreDisplay.innerText = counter.displayCount();
});

// Function to get random number for mole
function getNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
