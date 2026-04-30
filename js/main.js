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

// Array(9) [ "cell-0", "cell-1", "cell-2", "cell-3", "cell-4", "cell-5", "cell-6", "cell-7", "cell-8" ]

// for the player user everytime you pick a cell

// Array(9) [ "player-1", "player-1", "player-1", "player-2", "player2", "player-1", "player-1", "player-2", "player-2" ]

// and then compare something like if (array[0] == player-1 && array[1] == player-1 && array[2] == player-1) you got 3 in a row and you win

// it can be done but looks messy af and you have to repeat it x8 times for each player (maybe there is room for some polymorph here)

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
    // Updates the chosen cell on the DOM
    document.getElementById(`cell-${idNumber}`).innerText = player1.symbol;
  });
});

console.log(gameCellsIds);

// * the paramter player-1 inside the choosenCell is hardcoded for testing purpose but it should be dynacmic. That means refactoring and using a variable, turning the anon arrow function into a proper one and passing a paramater,
// using a methord, switching with a loop...plenty of Options.
