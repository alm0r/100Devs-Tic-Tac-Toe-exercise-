console.log("main script working");

//This is just to list the players and their symbols, this will be used to feed to the player object as arguments.
let players = [
  ["player1", "X"],
  ["player2", "O"],
];

// Works like a switch to enable/disable the logic whenever the game is been played or not
let gameBeingPlayed = false;
///////////////////////////////////////////////////////////////////////////////////////////////
// Players are clases following OOP design, so its the game Object that keeps track of the board
///////////////////////////////////////////////////////////////////////////////////////////////

const game = {
  board: ["cell-0", "cell-1", "cell-2", "cell-3", "cell-4", "cell-5", "cell-6", "cell-7", "cell-8"],
  turn: 0,
  resetBoardDom: function () {
    document.querySelectorAll(".game-cell").forEach((element) => {
      element.innerText = "";
    });
  },
};

class Player {
  constructor(player, playerSymbol) {
    this.player = player;
    this.symbol = playerSymbol;
  }
  createCell(bool, cellNumber) {
    console.log(`A new piece was put on cell ${cellNumber} by ${this.player} with the ${this.symbol} symbol`);
    // Added this to update the baord array when new cells are clicked*/
    game.board[game.board.findIndex((element) => element === `cell-${cellNumber}`)] = this.player;
    // console.log(`This is the board after choosing a new cell ${board}`);
  }
  //New logic to check if the winning condition is met
  checkWinCon() {
    const winningCombinations = [
      [[0], [1], [2]],
      [[3], [4], [5]],
      [[6], [7], [8]],
      [[0], [3], [6]],
      [[1], [4], [7]],
      [[2], [5], [8]],
      [[0], [4], [8]],
      [[2], [4], [6]],
    ];

    for (const [a, b, c] of winningCombinations) {
      // console.log(board);
      if (game.board[a] === this.player && game.board[b] === this.player && game.board[c] === this.player) {
        return true;
      }
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// On page load, this waits for a click in order to start the game
document.getElementById("game-start-button").addEventListener("click", () => {
  console.log("Game starts");
  gameBeingPlayed = true;
  gameInit();
});

function gameInit() {
  // Creates a new board when the start button is clicked, making it also work as a Reset bvutton
  game.turn = 0;
  game.board = ["cell-0", "cell-1", "cell-2", "cell-3", "cell-4", "cell-5", "cell-6", "cell-7", "cell-8"];
  game.resetBoardDom();

  // Creates new Cell / Makes a player Move whenever a cell is clicked

  document.querySelectorAll(".game-cell").forEach((element) => {
    element.addEventListener("click", () => {
      // Creates a new board variable
      if (gameBeingPlayed === true) {
        // checks if its working on the console, debugging purpose
        console.log(`clicked on ${element.id}`);
        // gets the id number
        let idNumber = element.id[element.id.length - 1];

        // creates player Object and picks the cell after clicking on it on the DOM. This right now is hardcoded because there is no switching between players states logic
        const choosenPlayer = new Player(players[game.turn % players.length][0], players[game.turn % players.length][1]);

        // Updates the chosen cell on the DOM and blocks the player turn untill he chooses a correct cell
        if (document.getElementById(`cell-${idNumber}`).innerText === "") {
          document.getElementById(`cell-${idNumber}`).innerText = choosenPlayer.symbol;
          // Next turn
          game.turn += 1;
        } else {
          console.log(`Try another cell, this one is already in use`);
        }
        // Cheks if the choosen cell makes matches the game winning condition
        choosenPlayer.createCell(true, idNumber);
        if (choosenPlayer.checkWinCon() === true) {
          // When returned true === winning condition is met and therefore the game is over, switching the gamebeingplayer to false
          gameBeingPlayed = false;

          console.log(`Congrats ${choosenPlayer.player}, you win`);
          document.querySelector(".txt-msg").innerText = `Congrats ${choosenPlayer.player}, you win!`;
        }
      }
    });
  });
}
