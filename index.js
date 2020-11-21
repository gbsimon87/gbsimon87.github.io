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
  var gamesDropdown = document.querySelector(".games-select");
  var currentGameSelected = gamesDropdown.value;
  var flashCard = document.querySelector(".game-area-content-flash-card");
  var flashCardVisual = document.querySelector(".flash-card-visual");
  var flashCardDescription = document.querySelector(".flash-card-description");
  var modal = document.querySelector(".modal");
  let vh = window.innerHeight * 0.01;
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
    { id: "triangle", title: "triangle" },
    { id: "square", title: "square" },
    { id: "star", title: "star" },
  ];

  // TODO: ADD BUTTON FOR SOUND - PRONUNCIATION OF THE ITEM IN THE FLASHCARD

  function setDocumentHeight() {
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  function insertImage(randomImage) {
    flashCardVisual.innerHTML = `<img src="images/${currentGameSelected}/${randomImage.id}.png" alt="${randomImage.id}" />`;
  }

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function calculateSpeedInMs() {
    const speedInput = document.querySelector(".speed-range-input");
    if (!speedInput) return 1000;
    return speedInput.value * 1000;
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

    // flashCardVisual.style.backgroundColor = "white";
    // flashCardVisual.textContent = "";
    // flashCardDescription.textContent = "";
    speedInput.disabled = false;
    playPauseButton.classList.add("btn-success");
    speedInputLabel.classList.remove("text-muted");
    playPauseButton.classList.remove("btn-danger");
    playPauseButton.textContent = "PLAY";
  }

  function handleStartPlaying() {
    document.querySelector(".flash-card-visual").style.backgroundColor = "#FFF";
    flashCardVisual.classList.remove("categoryTitle");
    isPlaying = true;
    gamesDropdown.disabled = true;
    speedInput.disabled = true;
    speedInputLabel.classList.add("text-muted");
    playPauseButton.classList.remove("btn-success");
    playPauseButton.classList.add("btn-danger");
    playPauseButton.textContent = "STOP";
  }

  function handleGameNumbers() {
    var randomNumber = randomIntFromInterval(0, numbers.length - 1);
    if (randomNumber === lastSelection) return;

    if (isPlaying) {
      console.log("is playing");
      const newFlashCardVisual = document.querySelector(".flash-card-visual");
      const newFlashCardDescription = document.querySelector(
        ".flash-card-description"
      );
      newFlashCardVisual.textContent = numbers[randomNumber].id;
      newFlashCardDescription.textContent = numbers[randomNumber].title;
      lastSelection = randomNumber;
    }
  }

  function handleGameColours() {
    var randomNumber = randomIntFromInterval(0, colours.length - 1);
    if (randomNumber === lastSelection) return;
    var randomColour = colours[randomNumber];
    flashCard.style.borderColor = randomColour.id;
    flashCardVisual.textContent = "";
    flashCardVisual.style.backgroundColor = randomColour.id;
    flashCardDescription.textContent = randomColour.id;
    flashCardDescription.style.borderColor = randomColour.id;
    lastSelection = randomNumber;
  }

  function handleGameFruits() {
    var randomNumber = randomIntFromInterval(0, fruits.length - 1);
    if (randomNumber === lastSelection) return;
    var randomFruit = fruits[randomNumber];
    insertImage(randomFruit);
    flashCardDescription.textContent = randomFruit.title;
    lastSelection = randomNumber;
  }

  function handleGameShapes() {
    var randomNumber = randomIntFromInterval(0, shapes.length - 1);
    if (randomNumber === lastSelection) return;
    var shape = shapes[randomNumber];
    insertImage(shape);
    flashCardDescription.textContent = shape.title;
    lastSelection = randomNumber;
  }

  function controlGameplay() {
    switch (currentGameSelected) {
      case "numbers":
        if (isPlaying) {
          handleStopPlaying();
          clearInterval(numbersInterval);
        } else {
          handleStartPlaying();
          handleGameNumbers();
          numbersInterval = setInterval(function () {
            handleGameNumbers();
          }, calculateSpeedInMs());
        }
        break;
      case "colours":
        if (isPlaying) {
          handleStopPlaying();
          clearInterval(coloursInterval);
        } else {
          handleStartPlaying();
          handleGameColours();
          coloursInterval = setInterval(function () {
            handleGameColours();
          }, calculateSpeedInMs());
        }
        break;
      case "fruits":
        if (isPlaying) {
          handleStopPlaying();
          clearInterval(fruitsInterval);
        } else {
          handleStartPlaying();
          handleGameFruits();
          fruitsInterval = setInterval(function () {
            handleGameFruits();
          }, calculateSpeedInMs());
        }
        break;
      case "shapes":
        if (isPlaying) {
          handleStopPlaying();
          clearInterval(shapesInterval);
        } else {
          handleStartPlaying();
          handleGameShapes();
          shapesInterval = setInterval(function () {
            handleGameShapes();
          }, calculateSpeedInMs());
        }
        break;
      default:
        break;
    }
  }

  function enablePlayButton() {
    playPauseButton.classList.remove("btn-disabled");
    playPauseButton.classList.add("btn-success");
    playPauseButton.disabled = false;
  }

  function disablePlayButton() {
    console.log(playPauseButton);
    playPauseButton.classList.add("btn-disabled");
    playPauseButton.classList.remove("btn-success");
    playPauseButton.disabled = true;
  }

  function getElementComputedStyle(element) {
    return window.getComputedStyle(element).display;
  }

  function handleHideModal(event) {
    var target = event.target;
    var modal = document.querySelector(".modal");
    var modalIsHidden = getElementComputedStyle(modal) === "none";

    if (modalIsHidden) {
      console.log("modal is hidden, do nothing");
    } else {
      console.log("modal is VISIBLE");
      var isClickInside = modal.contains(target);
      if (isClickInside) {
        console.log("clicked inside modal");
      } else {
        console.log("clicked OUTSIDE modal");
        modal.classList.add("closed");
      }
    }
  }

  gamesDropdown.addEventListener("input", function (e) {
    var userSelection = e.target.value;

    flashCardVisual.style.backgroundColor = "white";

    if (userSelection === "numbers") {
      enablePlayButton();
      clearInterval(numbersInterval);
    } else if (userSelection === "fruits") {
      enablePlayButton();
      clearInterval(fruitsInterval);
    } else if (userSelection === "shapes") {
      enablePlayButton();
      clearInterval(shapesInterval);
    } else if (userSelection === "colours") {
      enablePlayButton();
      clearInterval(coloursInterval);
    } else {
      clearAllIntervals();
      disablePlayButton();
    }

    currentGameSelected = userSelection;
    document.querySelector(
      ".flash-card-visual"
    ).textContent = `${userSelection}`;
    document.querySelector(".flash-card-description").textContent = "";
    flashCardVisual.classList.add("categoryTitle");
    currentGameSelected = userSelection;
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

  // Attach listener settings icon / open modal
  document
    .querySelector(".settings-icon")
    .addEventListener("click", function () {
      console.log("clicked, settings icon");
      if (isPlaying) return;

      var modal = document.querySelector(".modal");
      modal.classList.remove("closed");
    });

  // Close modal
  document.querySelector(".modal-close").addEventListener("click", function () {
    console.log("clicked, close modal");
    modal.classList.add("closed");
  });

  // We listen to the resize event
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  document.body.addEventListener("click", handleHideModal, true);

  function init() {
    setDocumentHeight();
  }

  init();
});
