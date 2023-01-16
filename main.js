// Starting game board
const GameBoard = (() => {
  const gameBoard = new Array(9);
  return { 
    getBoard: () => { 
      return gameBoard;
    },
    getBoardAtPosition: (i) => {
      return gameBoard[i];
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

const player = (choice) => {
  return {choice}
}

// Store Player and Computer Selection
const btnX = document.querySelector('.btn.x');
const btnO = document.querySelector('.btn.o');
let playerOne;
let computer;

btnX.addEventListener('click', (event) => {
  playerOne = player(event.target.innerText);
  computer = player('O');
});
btnO.addEventListener('click', (event) => {
  playerOne = player(event.target.innerText);
  computer = player('X');
});

let turn = 0;
function updateValue(event) {
  function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
  }
  // Did player select a choice and is the square empty
  // event.target = <div class="square [target position]"></div>
  // need to grab position and update it on Gameboard
  const boardPosition = event.target.classList.item(1);
  if(playerOne && !(event.target.hasChildNodes()) && turn <= 4) {
    const span = document.createElement('span');
    span.innerText = playerOne.choice;
    event.target.appendChild(span);

    //update GameBoard
    GameBoard.setBoard(boardPosition, playerOne.choice);

    // AI Random move logic:
    // grab new list of available squares 
      // loop through current gameBoard
      // Check every index that is empty and store it in new Array
      let emptyIndexes = [];
      const gameBoardLength = GameBoard.getBoard().length;
      for(let i = 0; i < gameBoardLength; i++) {
        if(GameBoard.getBoardAtPosition(i) === undefined || GameBoard.getBoardAtPosition(i) === null) {
          emptyIndexes.push(i);
        }
      }
    
    const gameBoardContainer = document.querySelector('.game-board-container');
    const emptyIndexesLength = (emptyIndexes.length) - 1;
    const opponentSpan = document.createElement('span');
    opponentSpan.innerText = computer.choice;
  
    const children = gameBoardContainer.children;
    let randomNumber;
    if(emptyIndexes.length >= 2) {
      randomNumber = emptyIndexes[getRandomPosition(emptyIndexesLength)].toString();
    }
    const computerSquare = children.namedItem(randomNumber);
    if(computerSquare !== null) {
      let computerBoardPosition = computerSquare.classList.item(1);

    // If computer square is not filled
      if(!(computerSquare.hasChildNodes())) {
        computerSquare.appendChild(opponentSpan);
        GameBoard.setBoard(computerBoardPosition, computer.choice);
      } else if(turn < 4){
          function searchVacantSquare() {
            let randNumber = emptyIndexes[getRandomPosition(emptyIndexesLength)].toString();
            let newSquare = children.namedItem(randNumber);

          // Base case: Finding square that is fillable
          if(!(newSquare.hasChildNodes())) {
            GameBoard.setBoard(computerBoardPosition, computer.choice);
            return newSquare.appendChild(opponentSpan);
          } else {
              // Recursive case: keep finding random available squares
              return searchVacantSquare();
            }
          }
          searchVacantSquare();
        }
    }
    
    //check win condition
    const winCondition = {
      'win1' : [0,1,2],
      'win2' : [3,4,5],
      'win3' : [6,7,8],
      'win4' : [0,3,6],
      'win5' : [0,4,8],
      'win6' : [1,4,7],
      'win7' : [2,5,8],
      'win8' : [2,4,6],
    }
  
    let board = GameBoard.getBoard();
    let result = document.querySelector('.result-container');
    let hasWinner = false;
    for(const key in winCondition) {
      if(board.at(winCondition[key][0]) === 'X' && 
         board.at(winCondition[key][1]) === 'X' &&
         board.at(winCondition[key][2]) === 'X') {
          
          playerOne.choice === 'X' ? result.innerText = 'you win' : result.innerText = 'computer wins';
          hasWinner = true;
          
      } 
      if(board.at(winCondition[key][0]) === 'O' && 
         board.at(winCondition[key][1]) === 'O' &&
         board.at(winCondition[key][2]) === 'O') {
          
          playerOne.choice === 'O' ? result.innerText = 'you win' : result.innerText = 'computer wins';
          hasWinner = true;

      }
    }
      // if no matches above and all squares filled = tie
      if(emptyIndexes.length === 0 && !hasWinner ) {
        console.log('tie');
      }
        turn++;
  }
}
})

// Start game
const start = (() => {
  displayController();
})();

// Reset Game
// Clear out the board

document.querySelector('.btn-start').addEventListener('click', start);



