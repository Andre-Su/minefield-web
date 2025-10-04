/* Regras - Campo minado
Cada célula tem 2 valores e 3 estados
com mina / sem mina
aberto / fechado / marcado

uma célula sem mina e aberto, mostra o numero de células com mina adjascentes à ele, em um raio de 1 célula para todos os seus lados e diagonais.

uma célula fechado pode ser marcado, indicando que existe uma mina em baixo dele.

uma célula fechado pode ser aberto;
    caso exista uma mina em baixo dele, o jogo é dado como perdido
    caso contrário, ele mostrará o numero de bombas


*/
class Minesweeper {
    constructor() {
        this.rows = 9;
        this.cols = 9;
        this.mines = 10;
        this.board = [];
        this.gameOver = false;
        this.gameWon = false;
        this.firstClick = true;
        this.flagsPlaced = 0;
        this.timer = 0;
        this.timerInterval = null;
        this.init();
    }

    init() {
        this.stopTimer();
        this.createBoard();
        this.updateMineCount();
        this.startTimer();
    }

    createBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${this.cols}, 35px)`;
        
        this.board = Array(this.rows).fill().map(() => 
            Array(this.cols).fill().map(() => ({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                value: 0
            }))
        );

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                
                cell.addEventListener('click', (e) => this.handleLeftClick(e));
                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.handleRightClick(e);
                });

                gameBoard.appendChild(cell);
            }
        }


        const message = document.getElementById('message');
        message.classList.add('hidden');
    }

    placeMines(firstRow, firstCol) {
        let minesPlaced = 0;
        
        while (minesPlaced < this.mines) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);
            
            // Não colocar mina na primeira célula clicada nem nas adjacentes
            const isFirstClickArea = 
                Math.abs(row - firstRow) <= 1 && 
                Math.abs(col - firstCol) <= 1;
            
            if (!this.board[row][col].isMine && !isFirstClickArea) {
                this.board[row][col].isMine = true;
                minesPlaced++;
            }
        }

        this.calculateNumbers();
    }

    calculateNumbers() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (!this.board[i][j].isMine) {
                    this.board[i][j].value = this.countAdjacentMines(i, j);
                }
            }
        }
    }

    countAdjacentMines(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                
                const newRow = row + i;
                const newCol = col + j;
                
                if (newRow >= 0 && newRow < this.rows && 
                    newCol >= 0 && newCol < this.cols && 
                    this.board[newRow][newCol].isMine) {
                    count++;
                }
            }
        }
        return count;
    }

    handleLeftClick(event) {
        if (this.gameOver || this.gameWon) return;
        
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        const cell = this.board[row][col];
        
        if (cell.isFlagged || cell.isRevealed) return;

        if (this.firstClick) {
            this.firstClick = false;
            this.placeMines(row, col);
        }

        if (cell.isMine) {
            this.revealMine(row, col);
            this.gameOver = true;
            this.showMessage('Você perdeu! 💥', 'lose');
            this.revealAllMines();
            this.stopTimer();
            return;
        }

        this.revealCell(row, col);
        
        if (this.checkWin()) {
            this.gameWon = true;
            this.showMessage('Você venceu! 🎉', 'win');
            this.stopTimer();
        }
    }

    handleRightClick(event) {
        event.preventDefault();
        if (this.gameOver || this.gameWon) return;
        
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        const cell = this.board[row][col];
        
        if (cell.isRevealed) return;
        
        cell.isFlagged = !cell.isFlagged;
        event.target.classList.toggle('flagged');
        
        this.flagsPlaced += cell.isFlagged ? 1 : -1;
        this.updateMineCount();
    }

    revealCell(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return;
        
        const cell = this.board[row][col];
        if (cell.isRevealed || cell.isFlagged) return;
        
        cell.isRevealed = true;
        const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cellElement.classList.add('revealed');
        
        if (cell.value > 0) {
            cellElement.textContent = cell.value;
            cellElement.dataset.value = cell.value;
        } else {
            // Revelar células adjacentes se for zero
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    this.revealCell(row + i, col + j);
                }
            }
        }
    }

    revealMine(row, col) {
        const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cellElement.classList.add('mine', 'revealed');
        cellElement.textContent = '💣';
    }

    revealAllMines() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.board[i][j].isMine && !this.board[i][j].isFlagged) {
                    const cellElement = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                    cellElement.classList.add('mine', 'revealed');
                    cellElement.textContent = '💣';
                }
            }
        }
    }

    checkWin() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = this.board[i][j];
                if (!cell.isMine && !cell.isRevealed) {
                    return false;
                }
            }
        }
        return true;
    }

    updateMineCount() {
        document.getElementById('mine-count').textContent = this.mines - this.flagsPlaced;
    }

    startTimer() {
        this.stopTimer();
        this.timer = 0;
        document.getElementById('timer').textContent = '0';
        
        this.timerInterval = setInterval(() => {
            this.timer++;
            document.getElementById('timer').textContent = this.timer;
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    showMessage(text, type) {
        const message = document.getElementById('message');
        message.textContent = text;
        message.className = `message ${type}`;
        message.classList.remove('hidden');
    }

    changeDifficulty(level) {
        switch(level) {
            case 'easy':
                this.rows = 9;
                this.cols = 9;
                this.mines = 10;
                break;
            case 'medium':
                this.rows = 16;
                this.cols = 16;
                this.mines = 40;
                break;
            case 'hard':
                this.rows = 16;
                this.cols = 30;
                this.mines = 99;
                break;
        }
        
        this.resetGame();
    }

    resetGame() {
        this.gameOver = false;
        this.gameWon = false;
        this.firstClick = true;
        this.flagsPlaced = 0;
        this.stopTimer();
        this.createBoard();
        this.startTimer();
        document.getElementById('message').classList.add('hidden');
    }
}

// Inicializar o jogo
let game = null;

function initGame() {
    if (game!=null) game.stopTimer();
    game = new Minesweeper();
}

function changeDifficulty(level) {
    game.changeDifficulty(level);
}

// Iniciar o jogo quando a página carregar
window.onload = initGame;