//starting game board
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

let count = 0;
GameBoard.getBoard().forEach((element) => {
  console.log(element);
  // if(element) count++;
  // return count;
});

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
let computer;

btnX.addEventListener('click', (event) => {
  playerOne = player(event.target.innerText);
  computer = player('O');
});
btnO.addEventListener('click', (event) => {
  playerOne = player(event.target.innerText);
  computer = player('X');
});

// then add the players value into that position
let turn = 0;
function updateValue(event) {
  console.log(turn);
  function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
  }
  // Did player select a choice and is the square empty
  // event.target = <div class="square [target position]"></div>
  // need to grab position and update it on Gameboard
  const boardPosition = event.target.classList.item(1);
  // console.log(boardPosition);
  if(playerOne && !(event.target.hasChildNodes()) && turn <= 4) {
    const span = document.createElement('span');
    span.innerText = playerOne.choice;
    event.target.appendChild(span);

    //update GameBoard
    GameBoard.setBoard(boardPosition, playerOne.choice);

    // AI Random move logic:
    // grab new list of available squares 
      // loop through current gameBoard
      // Check every index that is empty and store it in new Array (keep track of the index and length)
      let emptyIndexes = [];
      const gameBoardLength = GameBoard.getBoard().length;
      for(let i = 0; i < gameBoardLength; i++) {
        if(GameBoard.getBoardAtPosition(i) === undefined || GameBoard.getBoardAtPosition(i) === null) {
          emptyIndexes.push(i);
        }
      }
  
    // randomize selection based on the new Array
    // enter computer selection
    // update GameBoard
    const gameBoardContainer = document.querySelector('.game-board-container');
    const emptyIndexesLength = emptyIndexes.length;
    const opponentSpan = document.createElement('span');
    opponentSpan.innerText = computer.choice;
  
    const children = gameBoardContainer.children;
    const randomNumber = emptyIndexes[getRandomPosition(emptyIndexesLength)].toString();
    const computerSquare = children.namedItem(randomNumber);
    console.log(emptyIndexes);
    console.log(children.namedItem(randomNumber));
    
    // If computer square is not filled
    if(!(computerSquare.hasChildNodes())) {
      computerSquare.appendChild(opponentSpan);
    } else if(turn < 4){
      function searchVacantSquare() {
        let randNumber = emptyIndexes[getRandomPosition(emptyIndexesLength)].toString();
        let newSquare = children.namedItem(randNumber);
        console.log(randNumber);
        console.log(newSquare);
        // Base case: Finding square that is fillable
        if(!(newSquare.hasChildNodes())) {
          return newSquare.appendChild(opponentSpan);
        } else {
            // Recursive case: keep finding random available squares
            return searchVacantSquare();
        }
      }
      searchVacantSquare();
    }
    
// account for last square it should just be x 
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
    turn++;
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
