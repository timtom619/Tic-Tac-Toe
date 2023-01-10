// const myModule = (function () {
//   // private variable
//   let privateCounter = 0;

//   // private function
//   function privateIncrement() {
//     privateCounter++;
//   }

//   // public function
//   function increment() {
//     privateIncrement();
//   }

//   // public function
//   function getCount() {
//     return privateCounter;
//   }

//   // return object with public functions
//   return {
//     increment,
//     getCount,
//   };
// })();

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

// updates game board
const displayController = (() => {
  const updatedBoard = (position, choice) => {
    gameBoard.splice(position, 0, choice);
    return gameBoard;
  }
})();

const player = (name, symbol) => {
  const x = 'X';
  const o = 'O';
}