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
const player = (choice) => {
  return {choice}
}

// Object to store the flow of the game
const displayController = (() => {
  return {
    // getChoice: () => choice,
    // setChoice: (value) => choice = value
  }
})

// When user clicks on box
   // add a event listener on each square
const squares = document.querySelectorAll('.square');
squares.forEach((square) => {
  square.addEventListener('click', updateValue);
});

// Should have a way of knowing if player is X or O
const btnX = document.querySelector('.btn.x');
let playerOne;
btnX.addEventListener('click', (event) => {
  playerOne = player(event.target.innerText);
  console.log(playerOne.choice);
});
// then add the players value into that position
function updateValue(event) {
  if(playerOne) {
    event.target.innerText = playerOne.choice;
  }
}

// const children = document.getElementsByTagName('span');
// children[0].innerHTML = 'H';
// console.log(children[0].innerHTML);