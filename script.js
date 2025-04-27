function createNewCard() {
  // Step 1
  const cardElement = document.createElement("div");

  // Step 2
  cardElement.classList.add("card");

  // Step 3
  cardElement.innerHTML = `
    <div class="card-down"></div>
    <div class="card-up"></div>
  `;

  // Step 4
  return cardElement;
}
createNewCardTest();

function appendNewCard(parentElement) {
  const cardElement = createNewCard();
  parentElement.appendChild(cardElement);
  return cardElement;
}
appendNewCardTest();

function shuffleCardImageClasses() {
  const cardClasses = [
    "image-1",
    "image-1",
    "image-2",
    "image-2",
    "image-3",
    "image-3",
    "image-4",
    "image-4",
    "image-5",
    "image-5",
    "image-6",
    "image-6",
  ];

  return _.shuffle(cardClasses);
}
shuffleCardImageClassesTest();

function createCards(parentElement, shuffledImageClasses) {
  const cardObjects = [];

  for (let i = 0; i < 12; i++) {
    const cardElement = appendNewCard(parentElement);
    cardElement.classList.add(shuffledImageClasses[i]);

    const cardObject = {
      index: i,
      element: cardElement,
      imageClass: shuffledImageClasses[i],
    };

    cardObjects.push(cardObject);
  }

  return cardObjects;
}
createCardsTest();

function doCardsMatch(cardObject1, cardObject2) {
  return cardObject1.imageClass === cardObject2.imageClass;
}

doCardsMatchTest();

/* The 'counters' object below is used as a dictionary to store our counter names and their respective values. Do you remember using objects as dictionaries? If not, go back to that video lesson in HQ to review. This object is empty for now but we'll fill it up in the following function. */
let counters = {};

function incrementCounter(counterName, parentElement) {
  if (counters[counterName] === undefined) {
    counters[counterName] = 0;
  }
  counters[counterName]++;
  parentElement.innerText = counters[counterName];
}
incrementCounterTest();

/* The 'onCardFlipped' function below will be called each time the user flips a card. The 'lastCardFlipped' variable is used to remember the first card flipped while we wait for the user to flip another card. We need to keep track of this value to determine if the two cards flipped match or not. 'lastCardFlipped' should be reset to 'null' each time a second card is flipped. */
let lastCardFlipped = null;

function onCardFlipped(newlyFlippedCard) {
  const flipCounterElement = document.getElementById("flip-count");
  incrementCounter("flips", flipCounterElement);

  if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

  if (!doCardsMatch(newlyFlippedCard, lastCardFlipped)) {
    setTimeout(() => {
      newlyFlippedCard.element.classList.remove("flipped");
      lastCardFlipped.element.classList.remove("flipped");
      lastCardFlipped = null;
    }, 1000);
    return;
  }

  newlyFlippedCard.element.classList.add("border-glow");
  lastCardFlipped.element.classList.add("border-glow");

  const matchCounterElement = document.getElementById("match-count");
  incrementCounter("matches", matchCounterElement);

  if (counters["matches"] === 6) {
    winAudio.play();
  } else {
    matchAudio.play();
  }

  lastCardFlipped = null;
}

/* This function should remove all children from the #card-container, reset the flip and match counts displayed in the HTML, reset the counters dictionary to an empty object, reset lastCardFlipped to null, and set up a new game. */
function resetGame() {
  const cardContainer = document.getElementById("card-container");

  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  document.getElementById("flip-count").innerText = "0";
  document.getElementById("match-count").innerText = "0";

  counters = {};
  lastCardFlipped = null;

  setUpGame();
}

// ⛔️ Set up the game. Do not edit below this line! ⛔
setUpGame();
