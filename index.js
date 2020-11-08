document.addEventListener("DOMContentLoaded", function () {
  var isPlaying = false;
  var numbersInterval;
  var fruitsInterval;
  var shapesInterval;
  var coloursInterval;
  var lastSelection = "";
  var playPauseButton = document.querySelector(
    ".game-area-controls-play-pause"
  );
  var gamesDropdown = document.querySelector(".game-area-select-game .games");
  var currentGameSelected = gamesDropdown.value;
  var flashCard = document.querySelector(".game-area-content-flash-card");
  var flashCardImage = document.querySelector(".flash-card-image");
  var flashCardDescription = document.querySelector(".flash-card-description");
  let vh = window.innerHeight * 0.01;
  var form = document.querySelector(".game-area-controls-form");
  var speedInput = document.querySelector(".speed-range-input");
  var speedInputLabel = document.querySelector(".speed-range-label");
  var numbers = [
    {
      id: 0,
      title: "zero",
    },
    {
      id: 1,
      title: "one",
    },
    {
      id: 2,
      title: "two",
    },
    {
      id: 3,
      title: "three",
    },
    {
      id: 4,
      title: "four",
    },
    {
      id: 5,
      title: "five",
    },
    {
      id: 6,
      title: "six",
    },
    {
      id: 7,
      title: "seven",
    },
    {
      id: 8,
      title: "eight",
    },
    {
      id: 9,
      title: "nine",
    },
  ];
  var colours = [
    { hexValue: "", id: "red" },
    { hexValue: "", id: "green" },
    { hexValue: "", id: "blue" },
    { hexValue: "", id: "yellow" },
    { hexValue: "", id: "orange" },
    { hexValue: "", id: "purple" },
    { hexValue: "", id: "brown" },
    { hexValue: "", id: "lightblue" },
    { hexValue: "", id: "cyan" },
    { hexValue: "", id: "pink" },
  ];
  var fruits = [
    {
      id: "apple",
      title: "apple",
    },
    {
      id: "banana",
      title: "banana",
    },
    {
      id: "kiwi",
      title: "kiwi",
    },
    {
      id: "orange",
      title: "orange",
    },
    {
      id: "pear",
      title: "pear",
    },
    {
      id: "tomato",
      title: "tomato",
    },
  ];
  var shapes = [
    { id: "circle", title: "circle" },
    { id: "rectangle", title: "rectangle" },
    { id: "triangle", title: "triangle" },
    { id: "square", title: "square" },
    { id: "star", title: "star" },
  ];

  document.documentElement.style.setProperty("--vh", `${vh}px`);

  function insertImage(randomImage) {
    flashCardImage.innerHTML = `<img src="images/${currentGameSelected}/${randomImage.id}.png" alt="${randomImage.id}" />`;
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

  function handleStopPlaying() {
    isPlaying = false;
    gamesDropdown.disabled = false;
    flashCard.style.borderColor = "#28a746";
    flashCardDescription.style.borderColor = "#28a746";
    flashCardImage.style.backgroundColor = "white";
    flashCardImage.textContent = "";
    flashCardDescription.textContent = "";
    speedInput.disabled = false;
    speedInputLabel.classList.remove("text-muted");
    playPauseButton.classList.add("btn-success");
    playPauseButton.classList.remove("btn-danger");
    playPauseButton.textContent = "PLAY";
  }

  function handleStartPlaying() {
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
          handleStopPlaying();
          clearInterval(numbersInterval);
        } else {
          handleStartPlaying();
          numbersInterval = setInterval(function () {
            var randomNumber = randomIntFromInterval(0, numbers.length - 1);
            if (randomNumber === lastSelection) return;
            flashCardImage.textContent = numbers[randomNumber].id;
            flashCardDescription.textContent = numbers[randomNumber].title;
            lastSelection = randomNumber;
          }, calculateSpeedInMs());
        }
        break;
      case "colours":
        if (isPlaying) {
          handleStopPlaying();
          clearInterval(coloursInterval);
        } else {
          handleStartPlaying();
          coloursInterval = setInterval(function () {
            var randomNumber = randomIntFromInterval(0, colours.length - 1);
            if (randomNumber === lastSelection) return;
            var randomColour = colours[randomNumber];
            flashCard.style.borderColor = randomColour.id;
            flashCardImage.textContent = "";
            flashCardImage.style.backgroundColor = randomColour.id;
            flashCardDescription.textContent = randomColour.id;
            flashCardDescription.style.borderColor = randomColour.id;
            lastSelection = randomNumber;
          }, calculateSpeedInMs());
        }
        break;
      case "fruits":
        if (isPlaying) {
          handleStopPlaying();
          clearInterval(fruitsInterval);
        } else {
          handleStartPlaying();
          fruitsInterval = setInterval(function () {
            var randomNumber = randomIntFromInterval(0, fruits.length - 1);
            if (randomNumber === lastSelection) return;
            var randomFruit = fruits[randomNumber];
            insertImage(randomFruit);
            flashCardDescription.textContent = randomFruit.title;
            lastSelection = randomNumber;
          }, calculateSpeedInMs());
        }
        break;
      case "shapes":
        if (isPlaying) {
          handleStopPlaying();
          clearInterval(shapesInterval);
        } else {
          handleStartPlaying();
          shapesInterval = setInterval(function () {
            var randomNumber = randomIntFromInterval(0, shapes.length - 1);
            var shape = shapes[randomNumber];
            insertImage(shape);
            flashCardDescription.textContent = shape.title;
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
