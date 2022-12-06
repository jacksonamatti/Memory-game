const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

const caracters = [
  "beth",
  "jerry",
  "jessica",
  "morty",
  "pessoa-passaro",
  "pickle-rick",
  "rick",
  "summer",
  "meeseeks",
  "scroopy",
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secundCard = "";

const checkEndGame = () => {
  const disableCard = document.querySelectorAll(".disableCard");

  if (disableCard.length === 20) {
    clearInterval(this.loop);
    alert("parabens, acabou");
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secundCharacter = secundCard.getAttribute("data-character");

  if (firstCharacter === secundCharacter) {
    firstCard.firstChild.classList.add("disableCard");
    secundCard.firstChild.classList.add("disableCard");
    firstCard = "";
    secundCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secundCard.classList.remove("reveal-card");
      firstCard = "";
      secundCard = "";
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secundCard === "") {
    target.parentNode.classList.add("reveal-card");
    secundCard = target.parentNode;
    checkCards();
  }
};

const createCard = (caracters) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../imgs/${caracters}.png')`;

  card.appendChild(front);
  card.appendChild(back);
  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", caracters);

  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...caracters, ...caracters];
  const shufledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shufledArray.forEach((caracters) => {
    const card = createCard(caracters);
    grid.appendChild(card);
  });
};

const starTimer = () => {
  this.loop = setInterval(() => {
    const currentTimer = +timer.innerHTML;
    timer.innerHTML = currentTimer + 1;
  }, 1000);
};

window.onload = () => {
  const playerName = localStorage.getItem("player");
  spanPlayer.innerHTML = playerName;
  starTimer();
};

loadGame();
