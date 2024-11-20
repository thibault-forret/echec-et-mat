import Rook from '../class/Rook.js';
import Knight from '../class/Knight.js';
import Bishop from '../class/Bishop.js';
import Queen from '../class/Queen.js';
import King from '../class/King.js';
import Pawn from '../class/Pawn.js';
import PieceManger from './PieceManger.js';

export default class Chessboard 
{
    constructor() 
    {
        this.board = this.createBoard(); // Crée un tableau 2D pour le plateau
        this.setupPieces(); // Initialise les pièces sur le plateau
        this.generateChessBoard();
        this.pieceManger = new PieceManger(); 
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

                const piece = this.board[row][col];

                // faire apparaitre les pièces
                if (piece) {
                    const pieceImage = document.createElement('img');
                    pieceImage.src = piece.image; 
                    pieceImage.alt = piece.type; 
                    pieceImage.classList.add('piece'); 
                    square.appendChild(pieceImage); 
                }

                chessboard.appendChild(square);
            }
        }
    }


    movePiece(row, col, newRow, newCol)
    {
        if (this.board[row][col].FirstMouve==false) 
            {
                //si roock alore deplacer la tour puis le roi 
                if (this.board[row][col].type=='King')
                    {
                        if (newCol==col+2){
                            this.deplacePiece(newRow, newCol+1, newRow, newCol-1);
                        }
                        else if (newCol==col-3){   
                            this.deplacePiece(newRow, newCol-1, newRow, newCol+1);
                        }
                        
                    }
                this.board[row][col].FirstMouve=true;
                this.deplacePiece(row, col, newRow, newCol);
            }
        else {
            this.deplacePiece(row, col, newRow, newCol);
        }
        
    }


    deplacePiece(row, col, newRow, newCol){
        const piece = this.board[row][col];

        // Vérification si le mouvement mettrait le roi en échec
        if (!this.isMoveSafe(piece, row, col, newRow, newCol)) {
            console.log("Ce mouvement mettrait votre roi en échec !");
            return; // Ne fait rien si le mouvement est invalide
        }

        const targetPiece = this.board[newRow][newCol];

        // Sauvegarde de l'état initial
        const originalPiece = targetPiece;
        const originalPosition = piece.emplacement.slice();

        // Déplacement temporaire
        this.board[newRow][newCol] = piece;
        this.board[row][col] = null;
        piece.emplacement = [newRow, newCol];

        // Vérifie si le déplacement met le roi en échec
        if (this.isKingInCheck(piece.color)) {
            // Annule le déplacement si le roi est en échec
            this.board[row][col] = piece;
            this.board[newRow][newCol] = originalPiece;
            piece.emplacement = originalPosition;
            console.log("Mouvement interdit : le roi est en échec !");
            return false; // Mouvement invalide
        }

        if(targetPiece != null){
            // Capture de la pièce si elle appartient à l'adversaire
            if (targetPiece && targetPiece.color !== piece.color) {
                this.pieceManger.capturePiece(targetPiece);
            }
        }

        // Récupère l'élément DOM pour la case de destination
        const targetSquare = document.querySelector(`.square[data-row="${newRow}"][data-col="${newCol}"]`);

        // Supprime l'image de la case d'origine
        const originSquare = document.querySelector(`.square[data-row="${row}"][data-col="${col}"]`);
        const originPieceImage = originSquare.querySelector('.piece');
        if (originPieceImage) {
            originSquare.removeChild(originPieceImage);
        }

        const targetPieceImage = targetSquare.querySelector('.piece');
        if (targetPieceImage) {
            targetSquare.removeChild(targetPieceImage);
        }

        // Ajoute l'image de la pièce à la case de destination
        const pieceImage = document.createElement('img');
        pieceImage.src = piece.image;
        pieceImage.alt = piece.type;
        pieceImage.classList.add('piece');
        targetSquare.appendChild(pieceImage);

        // Met à jour le plateau de jeu (array) pour refléter le déplacement
        piece.emplacement = [newRow, newCol];
        this.board[newRow][newCol] = piece;
        this.board[row][col] = null; // Vide la case d'origine

        // Vérifie si un pion atteint l'extrémité du plateau
        if (piece.type === "Pawn" && (newRow === 0 || newRow === 7)) {
            console.log("reine");
            this.promotePawn(piece, newRow, newCol);
        }
    }

    promotePawn(pawn, row, col) {
        const queenImage = pawn.color === 'white' ? 'img/whitePiece/w-queen.png' : 'img/blackPiece/b-queen.png';
    
        // Crée une nouvelle instance de la reine
        const queen = new Queen(queenImage, [row, col], pawn.color);
    
        // Remplace le pion par la reine dans le tableau
        this.board[row][col] = queen;
    
        // Met à jour l'image dans le DOM
        const targetSquare = document.querySelector(`.square[data-row="${row}"][data-col="${col}"]`);
        const queenImageElement = document.createElement('img');
        queenImageElement.src = queen.image;
        queenImageElement.alt = 'Queen';
        queenImageElement.classList.add('piece');
    
        // Remplace l'image existante par celle de la reine
        const existingPieceImage = targetSquare.querySelector('.piece');
        if (existingPieceImage) {
            targetSquare.removeChild(existingPieceImage);
        }
        targetSquare.appendChild(queenImageElement);
    }

    // Trouve la position du roi de la couleur donnée
    getKingPosition(color)
    {
        let kingPosition = null;
    
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.type === "King" && piece.color === color) {
                    kingPosition = [row, col];
                    break;
                }
            }
            if (kingPosition) break;
        }

        return kingPosition;
    }

    // Vérifie si une pièce adverse peut atteindre le roi
    verifyIfAdversaryPiecesCheckKing(kingRow, kingCol, color)
    {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color !== color) {
                    const possibleMoves = piece.checkMove(this.board);
                    if (possibleMoves.some(([r, c]) => r === kingRow && c === kingCol)) {
                        return true; // Le roi est en échec
                    }
                }
            }
        }

        return false; // Le roi n'est pas en échec
    }
    
    // Vérifie si le roi est en échec
    isKingInCheck(color, simulateMove = false) {
        // Trouve la position du roi de la couleur donnée
        const kingPosition = this.getKingPosition(color);

        // Erreur dans la configuration
        if (kingPosition == null)
            return false;
        
        // Récupère les coordonnées du roi
        const [kingRow, kingCol] = kingPosition;
    
        // Vérifie toutes les pièces adverses pour voir si elles peuvent atteindre le roi
        let inCheck = this.verifyIfAdversaryPiecesCheckKing(kingRow, kingCol, color);

        // Le roi est en échec
        if (inCheck)
        {
            if (!simulateMove)
                this.highlightKing(kingRow, kingCol); // Ajoute un fond rouge au roi
            return true;
        }

        if (!simulateMove)
            this.removeHighlightFromKing(kingRow, kingCol); // Enlève le fond rouge si le roi n'est plus en échec
        return false; // Le roi n'est pas en échec
    }


    // Vérifie si le roi est en échec et mat
    isCheckmate(color) 
    {
        // Vérifie d'abord si le roi est en échec
        if (!this.isKingInCheck(color)) {
            return false; // Pas en échec, donc pas en échec et mat
        }
    
        // Parcourt toutes les pièces du joueur
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === color) {
                    const possibleMoves = piece.checkMove(this.board);
    
                    // Vérifie chaque mouvement possible
                    for (const [newRow, newCol] of possibleMoves) {
                        if (this.isMoveSafe(piece, row, col, newRow, newCol)) {
                            return false; // Si un mouvement légal existe, pas d'échec et mat
                        }
                    }
                }
            }
        }
    
        // Aucun mouvement légal trouvé, c'est un échec et mat
        return true;
    }
    
    
    // Vérifie si un mouvement est sûr pour le roi
    isMoveSafe(piece, row, col, newRow, newCol) {
        const originalPiece = this.board[newRow][newCol];
        const originalPosition = piece.emplacement.slice();
    
        // Simule le mouvement
        this.board[newRow][newCol] = piece;
        this.board[row][col] = null;
        piece.emplacement = [newRow, newCol];
    
        const kingSafe = !this.isKingInCheck(piece.color, true);
    
        // Annule le mouvement simulé
        this.board[row][col] = piece;
        this.board[newRow][newCol] = originalPiece;
        piece.emplacement = originalPosition;
    
        return kingSafe;
    }

    // Met en surbrillance le roi en échec
    highlightKing(row, col) {
        const kingSquare = document.querySelector(`.square[data-row="${row}"][data-col="${col}"]`);
        if (kingSquare) {
            kingSquare.classList.add('in-check');
        }
    }
    
    // Enlève la surbrillance du roi
    removeHighlightFromKing(row, col) {
        const kingSquare = document.querySelector(`.square[data-row="${row}"][data-col="${col}"]`);
        if (kingSquare) {
            kingSquare.classList.remove('in-check');
        }
    }

}


