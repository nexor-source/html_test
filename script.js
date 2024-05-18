const board = document.querySelector('.board');
const width = 13;
const height = 13;
const totalMines = 22;
const mines = [];
let remains = width*height-totalMines;
const adjacentOffsets = [-1, 0, 1];

// Generate empty game board
const gameBoard = [];
for (let row = 0; row < height; row++) {
    gameBoard[row] = Array(width).fill(0);
}

// Generate mines
for (let i = 0; i < totalMines; i++) {
    let randomRow, randomCol;
    do {
        randomRow = Math.floor(Math.random() * height);
        randomCol = Math.floor(Math.random() * width);
    } while (gameBoard[randomRow][randomCol] === 'M');
    gameBoard[randomRow][randomCol] = 'M';
    mines.push([randomRow, randomCol]);
}

// Render game board
for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        board.appendChild(cell);

        // 绑定右键点击事件
        cell.addEventListener('contextmenu', handleRightClick);
    }
}

// Handle cell click
board.addEventListener('click', handleCellClick);


// Handle right-click to flag/unflag
function handleRightClick(event) {
    event.preventDefault(); // Prevent default context menu
    const cell = event.target;
    if (!cell.classList.contains('clicked')) {
        cell.isFlagged = !cell.isFlagged; // Toggle flag status
        if (cell.isFlagged) {
            cell.textContent = '🚩'; // Display flag emoji
        } else {
            cell.textContent = ''; // Clear flag
        }
    }
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    if (cell.isFlagged || cell.classList.contains('clicked')) {
        return;
    }
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    if (gameBoard[row][col] === 'M') {
        cell.classList.add('mine');
        gameOver();
    } else {
        const mineCount = countAdjacentMines(row, col);
        if (mineCount > 0) {
            cell.textContent = mineCount;
        } else {
            cell.textContent = '';
        }
        cell.classList.add('clicked');
        remains--;
        if (remains === 0){
            alert("Congratulations! You won the game!");
        }
        if (mineCount === 0) {
            openAdjacentCells(row, col);
        }
    }
}

// Count adjacent mines
function countAdjacentMines(row, col) {
    let count = 0;
    for (const rowOffset of adjacentOffsets) {
        for (const colOffset of adjacentOffsets) {
            const newRow = row + rowOffset;
            const newCol = col + colOffset;
            if (isValidCell(newRow, newCol) && gameBoard[newRow][newCol] === 'M') {
                count++;
            }
        }
    }
    return count;
}

// Check if cell indices are valid
function isValidCell(row, col) {
    return row >= 0 && row < height && col >= 0 && col < width;
}

// Open adjacent cells
function openAdjacentCells(row, col) {
    for (const rowOffset of adjacentOffsets) {
        for (const colOffset of adjacentOffsets) {
            const newRow = row + rowOffset;
            const newCol = col + colOffset;
            if (isValidCell(newRow, newCol)) {
                const adjacentCell = board.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
                if (adjacentCell && !adjacentCell.classList.contains('clicked')) {
                    handleCellClick({ target: adjacentCell });
                }
            }
        }
    }
}

// Game over function
function gameOver() {
    // Reveal all mines
    mines.forEach(([row, col]) => {
        const cell = board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add('mine');
        cell.textContent='💣';
    });

    // Disable click event
    board.removeEventListener('click', handleCellClick);

    // Disable right click event for all cells
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.removeEventListener('contextmenu', handleRightClick);
    });
}