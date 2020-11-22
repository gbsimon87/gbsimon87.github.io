document.addEventListener("DOMContentLoaded", function () {
  let isPlaying = false;
  let globalTimer = "";
  let lastSelection = "";
  let vh = window.innerHeight * 0.01;
  let playPauseButton = document.querySelector(
    ".game-area-controls-play-pause"
  );
  const gamesDropdown = document.querySelector(".games-select");
  const selectionBoard = document.querySelector(".selection-board");
  const settingsIcon = document.querySelector(".settings-icon");
  const flashCard = document.querySelector(".game-area-content-flash-card");
  const flashCardVisual = document.querySelector(".flash-card-visual");
  const flashCardDescription = document.querySelector(
    ".flash-card-description"
  );
  const modal = document.querySelector(".modal");
  const iconGrid = document.querySelector(".icon-grid");
  const modalClose = document.querySelector(".modal-close");
  const speedInput = document.querySelector(".speed-range-input");
  const speedInputLabel = document.querySelector(".speed-range-label");
  let currentGameSelected = gamesDropdown.value;
  let games = {
    colours: [
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
    ],
    fruits: [
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
    ],
    numbers: [
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
    ],
    shapes: [
      { id: "circle", title: "circle" },
      { id: "triangle", title: "triangle" },
      { id: "square", title: "square" },
      { id: "star", title: "star" },
    ],
  };

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

  function clearGlobalInterval() {
    clearInterval(globalTimer);
  }

  function enablePlayButton() {
    playPauseButton.classList.remove("btn-danger");
    playPauseButton.classList.add("btn-success");
    playPauseButton.textContent = "PLAY";
  }

  function disablePlayButton() {
    playPauseButton.classList.remove("btn-success");
    playPauseButton.classList.add("btn-danger");
    playPauseButton.textContent = "PAUSE";
  }

  function handleStopPlaying() {
    isPlaying = false;
    playPauseButton.classList.add("btn-success");
    enablePlayButton();
  }

  function handleStartPlaying() {
    document.querySelector(".flash-card-visual").style.backgroundColor = "#FFF";
    flashCardVisual.classList.remove("categoryTitle");
    isPlaying = true;
    speedInputLabel.classList.add("text-muted");
    disablePlayButton();
  }

  function handleGameNumbers() {
    var randomNumber = randomIntFromInterval(0, games.numbers.length - 1);
    if (randomNumber === lastSelection) return;

    if (isPlaying) {
      const newFlashCardVisual = document.querySelector(".flash-card-visual");
      const newFlashCardDescription = document.querySelector(
        ".flash-card-description"
      );
      newFlashCardVisual.textContent = games.numbers[randomNumber].id;
      newFlashCardDescription.textContent = games.numbers[randomNumber].title;
      lastSelection = randomNumber;
    }
  }

  function handleGameColours() {
    var randomNumber = randomIntFromInterval(0, games.colours.length - 1);
    if (randomNumber === lastSelection) return;
    var randomColour = games.colours[randomNumber];
    flashCard.style.borderColor = randomColour.id;
    flashCardVisual.textContent = "";
    flashCardVisual.style.backgroundColor = randomColour.id;
    flashCardDescription.textContent = randomColour.id;
    flashCardDescription.style.borderColor = randomColour.id;
    lastSelection = randomNumber;
  }

  function handleGameFruits() {
    var randomNumber = randomIntFromInterval(0, games.fruits.length - 1);
    if (randomNumber === lastSelection) return;
    var randomFruit = games.fruits[randomNumber];
    insertImage(randomFruit);
    flashCardDescription.textContent = randomFruit.title;
    lastSelection = randomNumber;
  }

  function handleGameShapes() {
    var randomNumber = randomIntFromInterval(0, games.shapes.length - 1);
    if (randomNumber === lastSelection) return;
    var shape = games.shapes[randomNumber];
    insertImage(shape);
    flashCardDescription.textContent = shape.title;
    lastSelection = randomNumber;
  }

  function handleHideModal(event) {
    var target = event.target;
    var modal = document.querySelector(".modal");
    var isClickInside = modal.contains(target);
    if (!isClickInside) {
      modal.classList.add("closed");
    }
  }

  function controlGameplay() {
    switch (currentGameSelected) {
      case "numbers":
        if (isPlaying) {
          handleStopPlaying();
          clearInterval(globalTimer);
        } else {
          handleGameNumbers();
          handleStartPlaying(globalTimer);
          globalTimer = setInterval(function () {
            handleGameNumbers();
          }, calculateSpeedInMs());
        }
        break;
      case "colours":
        if (isPlaying) {
          handleStopPlaying();
          clearInterval(globalTimer);
        } else {
          handleGameColours();
          handleStartPlaying(globalTimer);
          globalTimer = setInterval(function () {
            handleGameColours();
          }, calculateSpeedInMs());
        }
        break;
      case "fruits":
        if (isPlaying) {
          handleStopPlaying();
          clearInterval(globalTimer);
        } else {
          handleGameFruits();
          handleStartPlaying(globalTimer);
          globalTimer = setInterval(function () {
            handleGameFruits();
          }, calculateSpeedInMs());
        }
        break;
      case "shapes":
        if (isPlaying) {
          handleStopPlaying();
          clearInterval(globalTimer);
        } else {
          handleGameShapes();
          handleStartPlaying(globalTimer);
          globalTimer = setInterval(function () {
            handleGameShapes();
          }, calculateSpeedInMs());
        }
        break;
      default:
        break;
    }
  }

  function buildSelectionBoard() {
    const currentGames = Object.keys(games);

    currentGames.forEach(function (currentGame) {
      console.log(currentGame);
      const newGameHTML = `<div class="selection-board-game-${currentGame}"><span>${currentGame}</span></div>`;
      selectionBoard.insertAdjacentHTML("afterbegin", newGameHTML);
    });

    document
      .querySelectorAll('[class*="selection-board-game"]')
      .forEach(function (game) {
        console.log("game is:", game.querySelector("span").innerText);
        const fileName = game.querySelector("span").innerText;
        game.style.backgroundImage =
          "url(/images/categoryBGImages/" + fileName + ".png)";

        // game.style.backgroundColor = getRandomColor();

        game.addEventListener("click", function (event) {
          console.log(event.target.innerText);
          document.querySelector(".game-area-controls").style.display = "flex";
          document.querySelector(
            ".game-area-content-flash-card"
          ).style.display = "block";
          document.querySelector(".selection-board").style.display = "none";
          document.querySelector(".games-select").value =
            event.target.innerText;
          currentGameSelected = event.target.innerText;
          console.log("isPlaying:", isPlaying);
          controlGameplay();
        });
      });
  }

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function handleGameSelection(e) {
    var userSelection = e.target.value;

    flashCardVisual.style.backgroundColor = "white";

    if (userSelection === "numbers") {
      enablePlayButton();
      clearGlobalInterval();
    } else if (userSelection === "fruits") {
      enablePlayButton();
      clearGlobalInterval();
    } else if (userSelection === "shapes") {
      enablePlayButton();
      clearGlobalInterval();
    } else if (userSelection === "colours") {
      enablePlayButton();
      clearGlobalInterval();
    } else {
      clearGlobalInterval();
      disablePlayButton();
    }

    flashCardVisual.textContent = `${userSelection}`;
    flashCardDescription.textContent = "";
    flashCardVisual.classList.add("categoryTitle");
    currentGameSelected = userSelection;
    playPauseButton.textContent = "PLAY";
    isPlaying = false;
  }

  gamesDropdown.addEventListener("click", function (e) {
    clearGlobalInterval();
    enablePlayButton();
  });

  // TODO: CHECK GAMESDROPDOWN LISTENER FOR USER SELECTION
  gamesDropdown.addEventListener("input", function (event) {
    handleGameSelection(event);
    controlGameplay();
  });

  iconGrid.addEventListener("click", function () {
    clearInterval(globalTimer);
    document.querySelector(".game-area-controls").style.display = "none";
    document.querySelector(".game-area-content-flash-card").style.display =
      "none";
    document.querySelector(".selection-board").style.display = "block";

    isPlaying = false;
  });

  playPauseButton.addEventListener("click", function () {
    controlGameplay();
  });

  speedInput.addEventListener("change", function (event) {
    clearGlobalInterval();

    if (isPlaying) {
      controlGameplay();
    }
  });

  // Attach listener settings icon / open modal
  settingsIcon.addEventListener("click", function () {
    var modal = document.querySelector(".modal");
    modal.classList.remove("closed");
    clearGlobalInterval();
    enablePlayButton();
  });

  // Close modal
  modalClose.addEventListener("click", function () {
    console.log("clicked, close modal");
    modal.classList.add("closed");
  });

  document.body.addEventListener("click", handleHideModal, true);

  document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      controlGameplay();
    }
  });

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  function init() {
    setDocumentHeight();
    buildSelectionBoard();
  }

  init();
});
