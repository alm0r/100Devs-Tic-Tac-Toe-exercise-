console.log("main script working");

////////////////////
// TO DO
//////////////////

//Introduced to keep track of the turn but alsoto switch between players, I think it will also be helpful for declaring a stalemate since I am pretty sure after 9 turns if no one has won the game its supposed to start over.
let turn = 0;
//This is just to list the players and their symbols, this will be used to feed to the player object as arguments.
let players = [
  ["player1", "X"],
  ["player2", "O"],
];

let gameBeingPlayed = false;
///////////////////////////////////////////////////////////////////////////////////////////////
// Players are cllases following OOP design
///////////////////////////////////////////////////////////////////////////////////////////////

class Player {
  constructor(player, playerSymbol) {
    this.player = player;
    this.symbol = playerSymbol;
  }
  createCell(bool, cellNumber) {
    console.log(`A new piece was put on square ${cellNumber} by ${this.player} with the ${this.symbol} symbol`);
    // Added this to update the baord array when new cells are clicked*/
    board[board.findIndex((element) => element === `cell-${cellNumber}`)] = this.player;
    // console.log(`This is the board after choosing a new cell ${board}`);
  }

  // This now returns a boolean (true) when the winning condition is met, which is later used inside the main gameInit() function to check if a move is a wiining move.
  // I thought it was better to have that logic outside this function to keep it simply
  checkWinCon() {
    switch (true) {
      case board[0] === this.player && board[1] === this.player && board[2] === this.player:
        console.log(`${this.player} wins`);
        return true;

      case board[3] === this.player && board[4] === this.player && board[5] === this.player:
        console.log(`${this.player} wins`);
        return true;

      case board[6] === this.player && board[7] === this.player && board[8] === this.player:
        console.log(`${this.player} wins`);
        return true;

      case board[0] === this.player && board[3] === this.player && board[6] === this.player:
        console.log(`${this.player} wins`);
        return true;

      case board[1] === this.player && board[4] === this.player && board[7] === this.player:
        console.log(`${this.player} wins`);
        return true;

      case board[2] === this.player && board[5] === this.player && board[8] === this.player:
        console.log(`${this.player} wins`);
        return true;

      case board[0] === this.player && board[4] === this.player && board[8] === this.player:
        console.log(`${this.player} wins`);
        return true;

      case board[2] === this.player && board[4] === this.player && board[6] === this.player:
        console.log(`${this.player} wins`);
        return true;

      default:
        return false;
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Added 2 buttons, each with its own eventListener (altought the reset is just a placeholder for now). The Logic should be easy to implement in the future
// Now the main logic of the game is contained inside the gameInit() function and its only trigger when the player press "Start"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// On page load, this waits for a click in order to start the game
document.getElementById("game-start-button").addEventListener("click", () => {
  console.log("Game starts");
  gameBeingPlayed = true;
  gameInit();
});

function gameInit() {
  // if (gameBeingPlayed === false) return;
  // Creates a new board when the start button is clicked,making it also work as a Reset bvutton
  turn = 0;
  board = ["cell-0", "cell-1", "cell-2", "cell-3", "cell-4", "cell-5", "cell-6", "cell-7", "cell-8"];
  document.querySelectorAll(".game-cell").forEach((element) => {
    element.innerText = "";
  });

  // Creates new Cell / Makes a player Move

  document.querySelectorAll(".game-cell").forEach((element) => {
    element.addEventListener("click", () => {
      // Creates a new board variable
      if (gameBeingPlayed === true) {
        // checks if its working on the console, debugging purpose
        console.log(`clicked on ${element.id}`);
        // gets the id number
        let idNumber = element.id[element.id.length - 1];
        // creates player Object and picks the cell after clicking on it on the DOM. This right now is hardcoded because there is no switching between players states logic
        const choosenPlayer = new Player(players[turn % players.length][0], players[turn % players.length][1]);

        // Updates the chosen cell on the DOM and blocks the player turn untill he chooses a correct cell
        if (document.getElementById(`cell-${idNumber}`).innerText === "") {
          document.getElementById(`cell-${idNumber}`).innerText = choosenPlayer.symbol;
          // Next turn
          turn += 1;
        } else {
          console.log(`Try another cell, this one is already in use`);
        }
        // Cheks if the choosen cell makes matches the game winning condition
        choosenPlayer.createCell(true, idNumber);
        if (choosenPlayer.checkWinCon() === true) {
          gameBeingPlayed = false;
          console.log(`Congrats ${choosenPlayer.player}, you win`);
          document.querySelector(".txt-msg").innerText = `Congrats ${choosenPlayer.player}, you win!`;
        }
      }
    });
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// This right now does nothing usefull to the actual project.
// It takes all the ids cells from the html and save them in an array but thats all
// I was thinking maybe i could use them later on for checking the winning condition logic
///////////////////////////////////////////////////////////////////////////////////////////

const gameCellsIds = [];

document.querySelectorAll(".game-cell").forEach((element) => {
  gameCellsIds.push(element.id);
});

///////////////////////////////////////////////////////////////////////////////////////////
