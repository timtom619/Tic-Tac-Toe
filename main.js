// // test the module
// myModule.increment();
// myModule.increment();
// console.log(myModule.getCount()); // 2

//starting game board
const GameBoard = (() => {
  const gameBoard = new Array(9);
  return { 
    getBoard: () => { 
      return gameBoard;
    },
    setBoard: (index, value) => {
      gameBoard[index] = value;
    },
  };
})();

// Player should have:
// name, choice 'x' or 'o'
const player = (name, choice) => {
  
  return{ name, choice,}
}

// Object to store the flow of the game
const displayController = (() => {
  const updatedBoard = (position, choice) => {
    gameBoard.splice(position, 0, choice);
    return gameBoard;
  }
})();