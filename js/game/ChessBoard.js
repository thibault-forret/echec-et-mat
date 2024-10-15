import Rook from '../class/Rook.js';
import Knight from '../class/Knight.js';
import Bishop from '../class/Bishop.js';
import Queen from '../class/Queen.js';
import King from '../class/King.js';
import Pawn from '../class/Pawn.js';


export default class Chessboard 
{
    constructor() 
    {
        this.board = this.createBoard(); // Crée un tableau 2D pour le plateau
        this.setupPieces(); // Initialise les pièces sur le plateau
        this.generateChessBoard();
    }

    // Fonction pour créer un tableau 2D vide représentant le plateau d'échecs
    createBoard() 
    {
        return Array.from({ length: 8 }, () => Array(8).fill(null)); // Crée un plateau vide 8x8
    }

    // Fonction pour configurer les pièces initiales sur le plateau
    setupPieces() {
        // Placer les pièces noires
        this.board[0][0] = new Rook('img/blackPiece/b-rook.png', [0, 0], 'black');
        this.board[0][1] = new Knight('img/blackPiece/b-knight.png', [0, 1], 'black');
        this.board[0][2] = new Bishop('img/blackPiece/b-bishop.png', [0, 2], 'black');
        this.board[0][3] = new Queen('img/blackPiece/b-queen.png', [0, 3], 'black');
        this.board[0][4] = new King('img/blackPiece/b-king.png', [0, 4], 'black');
        this.board[0][5] = new Bishop('img/blackPiece/b-bishop.png', [0, 5], 'black');
        this.board[0][6] = new Knight('img/blackPiece/b-knight.png', [0, 6], 'black');
        this.board[0][7] = new Rook('img/blackPiece/b-rook.png', [0, 7], 'black');
        
        for (let i = 0; i < 8; i++) {
            this.board[1][i] = new Pawn('img/blackPiece/b-pawn.png', [1, i], 'black');
        }
    
        // Placer les pièces blanches
        this.board[7][0] = new Rook('img/whitePiece/w-rook.png', [7, 0], 'white');
        this.board[7][1] = new Knight('img/whitePiece/w-knight.png', [7, 1], 'white');
        this.board[7][2] = new Bishop('img/whitePiece/w-bishop.png', [7, 2], 'white');
        this.board[7][3] = new Queen('img/whitePiece/w-queen.png', [7, 3], 'white');
        this.board[7][4] = new King('img/whitePiece/w-king.png', [7, 4], 'white');
        this.board[7][5] = new Bishop('img/whitePiece/w-bishop.png', [7, 5], 'white');
        this.board[7][6] = new Knight('img/whitePiece/w-knight.png', [7, 6], 'white');
        this.board[7][7] = new Rook('img/whitePiece/w-rook.png', [7, 7], 'white');
        
        for (let i = 0; i < 8; i++) {
            this.board[6][i] = new Pawn('img/whitePiece/w-pawn.png', [6, i], 'white');
        }
    }
    

    // Fonction pour générer visuellement le plateau d'échecs dans le DOM
    generateChessBoard() 
    {
        const chessboard = document.querySelector('.chessboard');

        // Boucle à travers chaque rangée et colonne du plateau
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');

                // Ajoute des attributs de données pour stocker les coordonnées de la case
                square.dataset.row = row;
                square.dataset.col = col;

                chessboard.appendChild(square);
            }
        }
    }
}
