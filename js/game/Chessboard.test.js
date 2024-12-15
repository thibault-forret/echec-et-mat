import Chessboard from './ChessBoard.js';
import Rook from '../class/Rook.js';
import Knight from '../class/Knight.js';
import Bishop from '../class/Bishop.js';
import Queen from '../class/Queen.js';
import King from '../class/King.js';
import Pawn from '../class/Pawn.js';

describe('Chessboard', () => {
    let chessboard;
    beforeEach(() => {
        // Créer un élément div avec la classe 'chessboard'
        chessboard = document.createElement('div');
        chessboard.className = 'chessboard';
        document.body.appendChild(chessboard); // Ajouter l'élément au body
    });

    afterEach(() => {
        // Nettoyer le DOM après chaque test
        document.body.removeChild(chessboard);
    });

    test('should create an 8x8 board', () => {
        const board = new Chessboard();
        board.generateChessBoard();

        // Vous pouvez maintenant vérifier que le tableau a été créé correctement
        expect(chessboard.children.length).toBe(64); // Assurez-vous que 64 cases ont été ajoutées
    });

    test('should move pieces correctly', () => {
        chessboard.board = [
            [new Pawn(), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];
        
        chessboard.movePiece(0, 0, 1, 0); // Déplace un pion vers le bas
        expect(chessboard.board[1][0]).toBeInstanceOf(Pawn); // Vérifie que le pion a été déplacé
        expect(chessboard.board[0][0]).toBeNull(); // Vérifie que la case d'origine est maintenant vide
    });

    test('should not move a piece to a square occupied by its own color', () => {
        chessboard.board[6][0] = new Pawn(); // Place un pion blanc
        chessboard.board[5][0] = new Pawn(); // Place un pion blanc dans la case cible
    
        const originalRow = 6;
        const originalCol = 0;
        const newRow = 5;
        const newCol = 0;
    
        chessboard.movePiece(originalRow, originalCol, newRow, newCol); // Essaye de déplacer le pion vers une case occupée
    
        // Vérifiez que le pion n'a pas été déplacé
        expect(chessboard.board[originalRow][originalCol]).toBeInstanceOf(Pawn);
        expect(chessboard.board[newRow][newCol]).toBeInstanceOf(Pawn);
    });
    

    test('should check if king is in check', () => {
        chessboard.movePiece(6, 0, 5, 0); // Déplace le pion en avant
        chessboard.movePiece(1, 0, 3, 0); // Déplace le pion adverse pour mettre le roi en échec
        expect(chessboard.isKingInCheck('white')).toBe(true);
    });

    test('should promote pawn to queen when reaching the last rank', () => {
        chessboard.movePiece(6, 0, 0, 0); // Déplace un pion à la dernière rangée
        expect(chessboard.board[0][0]).toBeInstanceOf(Queen);
    });

});
