console.log("main script working");

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
// Allows you to click on of the cells for the html and updates the DOM but thats abaout it
// Still lacks all the logic (winning condition, game loop, switch between players,etc) Not sure how to tackle that for now
////////////////////////////////////////////////////////////////////////////////////////////////

document.querySelectorAll(".game-cell").forEach((element) => {
  element.addEventListener("click", () => {
    // checks if its working on the console, debugging purpose
    console.log(`clicked on ${element.id}`);
    // gets the id number
    let idNumber = element.id[element.id.length - 1];
    // creates Object
    const choosenCell = new Cell(true, idNumber, "player-1");
    choosenCell.makeMove();
    // Updates the chosen cell on the DOM
    document.getElementById(`cell-${idNumber}`).innerText = choosenCell.player;
    // gameCellsIds[0] = "player-1";
  });
});

console.log(gameCellsIds);

///////////////////////////////////////////////////////////////////////////////////////////////
// Cells are object because, well, OOP, but still very green
///////////////////////////////////////////////////////////////////////////////////////////////

class Cell {
  constructor(usedCell, position, player) {
    this.UsedCell = usedCell;
    this.position = position;
    this.player = player;
  }
  makeMove() {
    console.log(`A new piece was put on square ${this.position} by ${this.player}`);
  }
}

// const myObject = newCell (true, 0, player-1)

////////////////////
// TO DO
//////////////////

// Gameloop
// Switching between players
// OOP requirements
// Check winning condition (when a player gets the 3 cells).

// My first idea was using the gameCellsIds array and replace the array elements (each cell)

// Array(9) [ "cell-0", "cell-1", "cell-2", "cell-3", "cell-4", "cell-5", "cell-6", "cell-7", "cell-8" ]

// for the player user everytime you pick a cell

// Array(9) [ "player-1", "player-1", "player-1", "player-2", "player2", "player-1", "player-1", "player-2", "player-2" ]

// and then compare something like if (array[0] == player-1 && array[1] == player-1 && array[2] == player-1) you got 3 in a row and you win

// i can be done but looks messy af and you have to repeat it x8 times for each player (maybe there is room for some polymorph here)
