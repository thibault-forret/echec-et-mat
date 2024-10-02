export default class Chessboard {
    constructor() {
        this.board = this.createBoard(); // Crée un tableau 2D pour le plateau
        // this.setupPieces(); // Initialise les pièces sur le plateau
        this.generateChessBoard();
    }

    createBoard() {
        return Array.from({ length: 8 }, () => Array(8).fill(null)); // Crée un plateau vide 8x8
    }

    setupPieces() {
        // Placer les pièces noires
        this.board[0][0] = new Rook("black");
        this.board[0][1] = new Knight("black");
        this.board[0][2] = new Bishop("black");
        this.board[0][3] = new Queen("black");
        this.board[0][4] = new King("black");
        this.board[0][5] = new Bishop("black");
        this.board[0][6] = new Knight("black");
        this.board[0][7] = new Rook("black");
        for (let i = 0; i < 8; i++) {
            this.board[1][i] = new Pawn("black");
        }

        // Placer les pièces blanches
        this.board[7][0] = new Rook("white");
        this.board[7][1] = new Knight("white");
        this.board[7][2] = new Bishop("white");
        this.board[7][3] = new Queen("white");
        this.board[7][4] = new King("white");
        this.board[7][5] = new Bishop("white");
        this.board[7][6] = new Knight("white");
        this.board[7][7] = new Rook("white");
        for (let i = 0; i < 8; i++) {
            this.board[6][i] = new Pawn("white");
        }
    }

    generateChessBoard() {
        const chessboard = document.querySelector('.chessboard');

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');

                // Ajouter la position de la case
                square.dataset.row = row;
                square.dataset.col = col;

                chessboard.appendChild(square);
            }
        }
    }
}
