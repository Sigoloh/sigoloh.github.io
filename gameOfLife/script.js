const BOARDSIZE = 40;
let gamematriz = generateGameMap(BOARDSIZE);

let game_map = document.getElementById("game-map");

let currentIntervalId = undefined;

const nextButton = document.getElementById("nextCycle");

const stopCycleButton = document.getElementById("stopcycle");

const nextGenButton = document.getElementById("nextGen");

const resetButton = document.getElementById("reset");

const closePopUp = document.getElementById("closePopUp");

const patternsPopUp = document.getElementById("patternsCard");

const showPatternsButton = document.getElementById("showPattersn");

function rgb(red, green, blue) {
  if (
    red > 255 ||
    green > 255 ||
    blue > 255 ||
    red < 0 ||
    green < 0 ||
    blue < 0
  ) {
    throw new Error("Invalid value for color");
  }
  console.log(
    `#${red.toString(16)}${green.toString(16).padStart(2, 0)}${blue.toString(
      16,
    )}`,
  );
  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

function generateRandomColor() {
  const red = Math.floor(Math.random() * 16);
  const green = Math.floor(Math.random() * 16);
  const blue = Math.floor(Math.random() * 16);
  return rgb(red, green, blue);
}
function generateGameMap(boardSize) {
  const board = [];
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      row.push(0);
    }
    board.push(row);
  }
  return board;
}

function doNextCycle() {
  let aux = JSON.parse(JSON.stringify(gamematriz));
  for (let i = 0; i < gamematriz.length; i++) {
    for (let j = 0; j < gamematriz[i].length; j++) {
      let vizinhos = 0;
      if (gamematriz[i - 1] !== undefined) {
        if (gamematriz[i - 1][j - 1] !== undefined) {
          vizinhos += gamematriz[i - 1][j - 1];
        }
        if (gamematriz[i - 1][j] !== undefined) {
          vizinhos += gamematriz[i - 1][j];
        }

        if (gamematriz[i - 1][j + 1] !== undefined) {
          vizinhos += gamematriz[i - 1][j + 1];
        }
      }

      if (gamematriz[i][j - 1] !== undefined) {
        vizinhos += gamematriz[i][j - 1];
      }
      if (gamematriz[i][j + 1] !== undefined) {
        vizinhos += gamematriz[i][j + 1];
      }

      if (gamematriz[i + 1] !== undefined) {
        if (gamematriz[i + 1][j - 1] !== undefined) {
          vizinhos += gamematriz[i + 1][j - 1];
        }
        if (gamematriz[i + 1][j] !== undefined) {
          vizinhos += gamematriz[i + 1][j];
        }
        if (gamematriz[i + 1][j + 1] !== undefined) {
          vizinhos += gamematriz[i + 1][j + 1];
        }
      }
      if (
        ((vizinhos === 2 || vizinhos === 3) && gamematriz[i][j] === 1) ||
        (vizinhos === 3 && gamematriz[i][j] === 0)
      ) {
        aux[i][j] = 1;
      } else {
        aux[i][j] = 0;
      }
    }
  }
  gamematriz = aux;
}

function clear_map() {
  const body = document.getElementById("container");
  body.removeChild(game_map);
  const newBoard = document.createElement("div");
  newBoard.id = "game-map";
  game_map = newBoard;
  body.appendChild(newBoard);
}

function set_map() {
  clear_map();
  for (const row of gamematriz) {
    const row_div = document.createElement("div");
    row_div.className = "boardRow";
    for (let i = 0; i < row.length; i++) {
      const square = document.createElement("div");
      const rowIndex = gamematriz.indexOf(row);
      const colIndex = i;
      square.addEventListener("click", () => {
        gamematriz[rowIndex][colIndex] =
          gamematriz[rowIndex][colIndex] === 1 ? 0 : 1;
        set_map();
      });
      if (row[i] === 1) {
        square.style.background = generateRandomColor();
      }
      square.className = "square";
      row_div.appendChild(square);
    }
    game_map.appendChild(row_div);
  }
}

nextButton.addEventListener("click", () => {
  doNextCycle();
  set_map();
  if (currentIntervalId) {
    clearInterval(currentIntervalId);
  }
  currentIntervalId = setInterval(() => {
    doNextCycle();
    set_map();
  }, 100);
});

nextGenButton.addEventListener("click", () => {
  doNextCycle();
  set_map();
});

resetButton.addEventListener("click", () => {
  clearInterval(currentIntervalId);
  gamematriz = generateGameMap(BOARDSIZE);
  set_map();
});

closePopUp.addEventListener("click", () => {
  patternsPopUp.classList.add("popUpClosed");
});

showPatternsButton.addEventListener("click", () => {
  patternsPopUp.classList.remove("popUpClosed");
});

stopCycleButton.addEventListener("click", () => {
  clearInterval(currentIntervalId);
});
set_map();

