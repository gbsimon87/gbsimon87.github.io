document.addEventListener("DOMContentLoaded", function () {
  var isPlaying = false;
  var numbersInterval;
  var fruitsInterval;
  var shapesInterval;
  var coloursInterval;
  var playPauseButton = document.querySelector(
    ".game-area-controls-play-pause"
  );
  var gamesDropdown = document.querySelector(".game-area-select-game .games");
  var currentGameSelected = gamesDropdown.value;
  var gameAreaContent = document.querySelector(".game-area-content");
  var flashCardImage = document.querySelector(".flash-card-image");
  let vh = window.innerHeight * 0.01;
  var form = document.querySelector(".game-area-controls-form");
  var speedInput = document.querySelector(".speed-range-input");
  var speedInputLabel = document.querySelector(".speed-range-label");
  var fruits = ["apple", "banana", "kiwi", "orange", "pear", "tomato"];
  var shapes = ["circle", "rectangle", "triangle", "square", "star"];
  var colours = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
    "brown",
    "lightblue",
    "cyan",
    "pink",
  ];

  document.documentElement.style.setProperty("--vh", `${vh}px`);

  function insertImage(fruitChosen) {
    flashCardImage.innerHTML = `<img src="images/${currentGameSelected}/${fruitChosen}.png" alt="${fruitChosen}" />`;
  }

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function calculateSpeedInMs() {
    if (!speedInput) return 1000;
    return document.querySelector(".speed-range-input").value * 1000;
  }

  function clearAllIntervals() {
    clearInterval(numbersInterval);
    clearInterval(coloursInterval);
    clearInterval(fruitsInterval);
    clearInterval(shapesInterval);
  }

  function handleIsPlaying() {
    isPlaying = false;
    gamesDropdown.disabled = false;
    flashCardImage.style.backgroundColor = "white";
    flashCardImage.textContent = "Chooose a game below";
    speedInput.disabled = false;
    speedInputLabel.classList.remove("text-muted");
    playPauseButton.classList.add("btn-success");
    playPauseButton.classList.remove("btn-danger");
    playPauseButton.textContent = "PLAY";
  }

  function handleNotPlaying() {
    isPlaying = true;
    gamesDropdown.disabled = true;
    speedInput.disabled = true;
    speedInputLabel.classList.add("text-muted");
    playPauseButton.classList.remove("btn-success");
    playPauseButton.classList.add("btn-danger");
    playPauseButton.textContent = "STOP";
  }

  function controlGameplay() {
    switch (currentGameSelected) {
      case "numbers":
        if (isPlaying) {
          handleIsPlaying();
          clearInterval(numbersInterval);
        } else {
          handleNotPlaying();
          numbersInterval = setInterval(function () {
            var randomNumber = randomIntFromInterval(0, 10);
            flashCardImage.textContent = randomNumber;
          }, calculateSpeedInMs());
        }
        break;
      case "colours":
        if (isPlaying) {
          handleIsPlaying();
          clearInterval(coloursInterval);
        } else {
          handleNotPlaying();
          coloursInterval = setInterval(function () {
            var randomNumber = randomIntFromInterval(0, 9);
            var randomColour = colours[randomNumber];
            flashCardImage.textContent = "";
            flashCardImage.style.backgroundColor = randomColour;
          }, calculateSpeedInMs());
        }
        break;
      case "fruits":
        if (isPlaying) {
          handleIsPlaying();
          clearInterval(fruitsInterval);
        } else {
          handleNotPlaying();
          fruitsInterval = setInterval(function () {
            var randomNumber = randomIntFromInterval(0, fruits.length - 1);
            var fruit = fruits[randomNumber];
            insertImage(fruit);
          }, calculateSpeedInMs());
        }
        break;
      case "shapes":
        if (isPlaying) {
          handleIsPlaying();
          clearInterval(shapesInterval);
        } else {
          handleNotPlaying();
          shapesInterval = setInterval(function () {
            var randomNumber = randomIntFromInterval(0, shapes.length - 1);
            var shape = shapes[randomNumber];
            insertImage(shape);
          }, calculateSpeedInMs());
        }
        break;
      default:
        break;
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  gamesDropdown.addEventListener("input", function (e) {
    var gameSelected = e.target.value;

    if (currentGameSelected === "numbers") {
      clearInterval(numbersInterval);
    } else if (currentGameSelected === "fruits") {
      clearInterval(fruitsInterval);
    } else if (currentGameSelected === "shapes") {
      clearInterval(shapesInterval);
    } else if (currentGameSelected === "colours") {
      clearInterval(coloursInterval);
    }

    currentGameSelected = gameSelected;
    document.querySelector(".flash-card-image").textContent = `${gameSelected}`;
    // gameAreaContent.textContent = `${gameSelected}`;
    playPauseButton.textContent = "PLAY";
    isPlaying = false;
  });

  playPauseButton.addEventListener("click", function () {
    controlGameplay();
  });

  speedInput.addEventListener("change", function (event) {
    clearAllIntervals();

    if (isPlaying) {
      controlGameplay();
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      controlGameplay();
    }
  });

  // We listen to the resize event
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
});
