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


// Object to store the flow of the game
const displayController = (() => {
const squares = document.querySelectorAll('.square');
squares.forEach((square) => {
  square.addEventListener('click', updateValue);
});

// Should have a way of knowing if player is X or O
const btnX = document.querySelector('.btn.x');
const btnO = document.querySelector('.btn.o');
let playerOne;

btnX.addEventListener('click', (event) => {
  playerOne = player(event.target.innerText);
});
btnO.addEventListener('click', (event) => {
  playerOne = player(event.target.innerText);
});

// then add the players value into that position
function updateValue(event) {
  // Did player select a choice and is the square empty
  // event.target = <div class="square [target]"></div>
  // need to grab position and update it on Gameboard
  const boardPosition = event.target.classList.item(1);
  console.log(boardPosition);
  if(playerOne && !(event.target.hasChildNodes())) {
    const span = document.createElement('span');
    span.innerText = playerOne.choice;
    event.target.appendChild(span);

    //update GameBoard
    GameBoard.setBoard(boardPosition, playerOne.choice);
    console.log(GameBoard.getBoard());

    //check win condition
// win conditions:
// 0,1,2
// 3,4,5
// 6,7,8
// 0,3,6
// 0,4,8
// 1,4,7
// 2,5,8
// 2,4,6
// if no matches above and all squares filled = tie
//get the board
  }
}
  return {
    // getChoice: () => choice,
    // setChoice: (value) => choice = value
  }
})

const start = (() => {
  displayController();
})();

// Player should have:
// name, choice 'x' or 'o'
const player = (choice) => {
  return {choice}
}

document.querySelector('.btn-start').addEventListener('click', start);
