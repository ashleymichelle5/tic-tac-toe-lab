const messageEl = document.getElementById('message');
const squareEls = document.querySelectorAll('.sqr');
const restart = document.querySelector('#restartBtn');

//console.log(restart)

const board = ['','','','','','','','',''];
let turn = 'X';
let winner = null; 
let tie = false;

function init () {
    console.log('Init function called');
    
    render() 
}
document.addEventListener('DOMContentLoaded', function() {
    init();
});

function updateBoard () {
    squareEls.forEach((el, index) => {
        el.textContent = board[index];
    });

}

function render () {
    updateBoard();
    updateMessage();
}



function updateMessage () {
    
    if (winner) {
        messageEl.textContent = `Player ${turn} wins!`;
    } else if (tie) {
        messageEl.textContent = `It's a tie!`;
    } else {
        messageEl.textContent = `Player ${turn}'s turn`;
    }
    
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

squareEls.forEach(sqr => sqr.addEventListener('click', handleClick));

function handleClick (event) {
    if (winner || tie) return;

    const squareIndex = Array.from(squareEls).indexOf(event.target);
    if (board[squareIndex] !== '') return;

    board[squareIndex] = turn;
    checkForWinner();
    checkForTie();
    turn = turn === 'X' ? 'O' : 'X';
    render();
}

function checkForWinner() {
    winningCombos.forEach(combo => {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
             winner = true;
        }
    })
}


function checkForTie() {
    if(board.every(square => square !== '') && winner){
        tie = true;
    }
}


function switchPlayerTurn () {
    if (winner) {
        return;
    }
    if (turn === 'X') {
        turn = 'O';
    } else {
        turn = 'X'
    }
}

const resetBtEl = document.addEventListener('click', init());
