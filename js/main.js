console.log("main script working");

////////////////////
// TO DO
//////////////////

// Gameloop
// Switching between players
// OOP requirements
// Check winning condition (when a player gets the 3 cells).

// My first idea was using the gameCellsIds array and replace the array elements (each cell)
/*Added to keep track of the updated cells*/
let board = ["cell-0", "cell-1", "cell-2", "cell-3", "cell-4", "cell-5", "cell-6", "cell-7", "cell-8"];

// This let playerWins = false; for now works as a global variable to determine the outcome of thw switch statement inside checkWinCon()
// but is unnecesary (and kind of reduntand)
// I think its use depends on which kind logic we end up using for the switching between players, but its is posible to make checkWinCon() to simply return
// a boolean (as i tested in the first case with return true) and then simply check if player1.checWinCon() is returned true or false instead of checking the playerWinds variable
// i will leave for now because its the first iteration and i think is easy and simpler to understand

let playerWins = false;

///////////////////////////////////////////////////////////////////////////////////////////////
// Cells are object because, well, OOP, but still very green
///////////////////////////////////////////////////////////////////////////////////////////////

class Player {
  constructor(player, playerSymbol) {
    this.player = player;
    this.symbol = playerSymbol;
  }
  createCell(bool, cellNumber, player, playerSymbol) {
    console.log(`A new piece was put on square ${cellNumber} by ${this.player} with the ${this.symbol} symbol`);
    //     /*Added this to update the baord array when new cells are clicked*/
    board[board.findIndex((element) => element === `cell-${cellNumber}`)] = this.player;
    console.log(`This is the board ${board}`);
  }
  // compares all the posible winning conditions and either updates playerWins variable. This will allow to use that variable later as war to exit the game running loop
  // with a simple if statement (if playerWins = false =>  gameBeingPlayed = false === game loop ends)
  // Also this whole logic can be refactorized in a more cleaner and elegant way using array destructuring and a for of loop, but it pointed to me by Claude
  // when asking for somethign else and i prefer not to use it
  checkWinCon() {
    switch ((playerWins = true)) {
      case board[0] === this.player && board[1] === this.player && board[2] === this.player:
        console.log(`${this.player} wins`);
        playerWins = true;
        return true;
        break;
      case board[3] === this.player && board[4] === this.player && board[5] === this.player:
        console.log(`${this.player} wins`);
        playerWins = true;
        break;
      case board[6] === this.player && board[7] === this.player && board[8] === this.player:
        console.log(`${this.player} wins`);
        playerWins = true;
        break;
      case board[0] === this.player && board[3] === this.player && board[6] === this.player:
        console.log(`${this.player} wins`);
        playerWins = true;
        break;
      case board[1] === this.player && board[4] === this.player && board[7] === this.player:
        console.log(`${this.player} wins`);
        playerWins = true;
        break;
      case board[2] === this.player && board[5] === this.player && board[8] === this.player:
        console.log(`${this.player} wins`);
        playerWins = true;
        break;
      case board[0] === this.player && board[4] === this.player && board[8] === this.player:
        console.log(`${this.player} wins`);
        playerWins = true;
        break;
      case board[2] === this.player && board[4] === this.player && board[6] === this.player:
        console.log(`${this.player} wins`);
        playerWins = true;
        break;
      default:
        playerWins = false;
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
// This right now does nothing usefull to the actual project. It takes all the ids cells from the html and save them in an array but thats all
// I was thinking maybe i could use them later on for checking the winning condition logic
///////////////////////////////////////////////////////////////////////////////////////////

const gameCellsIds = [];

document.querySelectorAll(".game-cell").forEach((element) => {
  gameCellsIds.push(element.id);
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// Main code logic for now, kinda works but is not finnal at all, only on the frontend,
// Allows you to click on of the cells divs from the html  updates the DOM and creates a cell object but thats abaout it, there is no backend game logic that save that state and/or make use of it
// Still lacks all the logic (winning condition, game loop, switch between players,etc) Not sure how should i tackle that for now
////////////////////////////////////////////////////////////////////////////////////////////////

document.querySelectorAll(".game-cell").forEach((element) => {
  element.addEventListener("click", () => {
    // checks if its working on the console, debugging purpose
    console.log(`clicked on ${element.id}`);
    // gets the id number
    let idNumber = element.id[element.id.length - 1];
    // creates player Object and picks the cell after clicking on it on the DOM. This right now is hardcoded because there is no switching between players states logic
    const player1 = new Player("player1", "x");
    player1.createCell(true, idNumber, "player1", "X");
    player1.checkWinCon();
    // debuggin if its returning true
    // console.log(player1.checkWinCon());
    //
    // Updates the chosen cell on the DOM
    document.getElementById(`cell-${idNumber}`).innerText = player1.symbol;
  });
});

// console.log(gameCellsIds);

// * the paramter player-1 inside the choosenCell is hardcoded for testing purpose but it should be dynacmic. That means refactoring and using a variable, turning the anon arrow function into a proper one and passing a paramater,
// using a methord, switching with a loop...plenty of Options.

///////////////////////////////////////////////////
// SWITCHING BETWEEN PLAYERS LOGIC PROTOTYPE
/////////////////////////////////////////////////

// This works by using the global variable let gameBeingPlayed = true; in a while loop. The while loop switches between 2 states determined byt 2 other global variables
// let playerOneTurn = true; and // let playerTwoTurn = false; and alternates between them. While one of the if statements is true, it runs, and at then end, it becames false and changes
// the toogles the other variable ( basically working like a true/false switch)

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
