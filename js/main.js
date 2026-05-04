console.log("main script working");

////////////////////
// TO DO
//////////////////

// Gameloop
// Switching between players
// OOP requirements
// Check winning condition (when a player gets the 3 cells).

/*Added to keep track of the updated cells*/
// let board = ["cell-0", "cell-1", "cell-2", "cell-3", "cell-4", "cell-5", "cell-6", "cell-7", "cell-8"];

//Introduced to keep track of the turn but alsoto switch between players, I think it will also be helpful for declaring a stalemate since I am pretty sure after 9 turns if no one has won the game its supposed to start over.
let turn = 0;
//This is just to list the players and their symbols, this will be used to feed to the player object as arguments.
let players = [
  ["player1", "X"],
  ["player2", "O"],
];

let playerWins = false;

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
  gameInit();
});

document.getElementById("game-reset-button").addEventListener("click", () => {
  console.log("Game resets but there is no logic yet");
  resetGame();
});

function gameInit() {
  // Creates a new board when the start button is clicked,making it also work as a Reset bvutton
  board = ["cell-0", "cell-1", "cell-2", "cell-3", "cell-4", "cell-5", "cell-6", "cell-7", "cell-8"];
  document.querySelectorAll(".game-cell").forEach((element) => {
    element.innerText = "";
  });
  // Creates new Cell / Makes a player Move
  document.querySelectorAll(".game-cell").forEach((element) => {
    element.addEventListener("click", () => {
      // Creates a new board variable

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
        console.log(`Congrats ${choosenPlayer.player}, you win`);
      }
    });
  });
}

//Resetting both the board and the cells for now, I think we could defniteley make it so the cell just follow what's ont he board to centralize it though. WOrking on it.

// function resetGame() {
//   board = ["cell-0", "cell-1", "cell-2", "cell-3", "cell-4", "cell-5", "cell-6", "cell-7", "cell-8"];
//   document.querySelectorAll(".game-cell").forEach((element) => {
//     element.innerText = "";
//   });
// }

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
///////////////////////////////////////////////////////////////////////////////////////////

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// FOR POTENTIAL FUTURE REFACTORING DO NOT DELETE

///////////////////////////////////////////////////
// SWITCHING BETWEEN PLAYERS LOGIC PROTOTYPE
/////////////////////////////////////////////////

// This let playerWins = false; for now works as a global variable to determine the outcome of thw switch statement inside checkWinCon()
// but is unnecesary (and kind of reduntand) and could be replaced byt simply using a return true inside the switch
// I think its use depends on which kind logic we end up using for the switching between players, but its is posible to make checkWinCon() to simply return
// a boolean (as i tested in the first case with return true) and then simply check if player1.checWinCon() is returned true or false instead of checking the playerWinds variable
// i will leave for now because its the first iteration and i think is easy and simpler to understand

// This works by using the global variable let gameBeingPlayed = true; in a while loop. The while loop switches between 2 states determined byt 2 other global variables
// let playerOneTurn = true; and // let playerTwoTurn = false; and alternates between them. While one of the if statements is true, it runs, and at then end, it becames false and changes
// the toogles the other variable ( basically working like a true/false switch). The while (gameBeingPlayed === true) is an defacto infinity loop and runs as long as its condition is true but the idea is
// it should be very easy to exit with a simple if statement like: if the winning condition for a player is true => gameBeingPlayed === false === break out of the loop

// let playerOneTurn = true;
// let playerTwoTurn = false;

// let gameBeingPlayed = true;

// // initTurn is just a temporary placeholder for the createCell() to see if the logic of the while loop + if statements works (it does)
// function initTurn(player) {
//   console.log(`${player} makes his move`);
// }

// function initGame() {
//   while (gameBeingPlayed === true) {
//     if (playerOneTurn === true) {
//       // this is just for debuging to see the if its working properly
//       console.log("while loop working for player-1");

//       initTurn("player-1");
//       // this is what make the while loop swtich between both player "infinitely".
//       playerOneTurn = false;
//       playerTwoTurn = true;
//     } else if (playerTwoTurn === true) {
//       // this is just for debuging to see the if its working properly
//       console.log("while loop working for player-2");
//       initTurn("player-2");
//       playerOneTurn = true;
//       playerTwoTurn = false;
//       // break;
//       // Once we add the logic for determining if a player move its a winning move it should be pretty easy to add an gameBeingPlayed = false to exit the while loop,
//       //  for now this is acting as a break because otherwise the loops infinetly
//       gameBeingPlayed = false;
//     }
//   }
// }

// initGame();
