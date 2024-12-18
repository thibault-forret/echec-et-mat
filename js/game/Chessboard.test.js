import Chessboard from './ChessBoard.js';
import Rook from '../class/Rook.js';
import Knight from '../class/Knight.js';
import Bishop from '../class/Bishop.js';
import Queen from '../class/Queen.js';
import King from '../class/King.js';
import Pawn from '../class/Pawn.js';

describe('Chessboard', () => {

    let chessboard;

    let blackContainer, whiteContainer, chessboardElement;

    beforeEach(() => {
        blackContainer = document.createElement('div');
        blackContainer.className = 'captured-black';
        whiteContainer = document.createElement('div');
        whiteContainer.className = 'captured-white';

        document.body.appendChild(blackContainer);
        document.body.appendChild(whiteContainer); 

        // Créer un élément div avec la classe 'chessboard'
        chessboardElement = document.createElement('div');
        chessboardElement.className = 'chessboard';
        document.body.appendChild(chessboardElement); // Ajouter l'élément au body

        chessboard = new Chessboard();
    });

    afterEach(() => {
        document.body.removeChild(chessboardElement);
        document.body.removeChild(whiteContainer);
        document.body.removeChild(blackContainer);
    });

    test('Should create 8x8 board', () => {
        let count = 0;

        for (let i = 0; i < chessboard.board.length; i++) {
            for (let j = 0; j < chessboard.board[i].length; j++) {
                count++;
            }
        }

        // Vous pouvez maintenant vérifier que le tableau a été créé correctement
        expect(count).toBe(64); // Assurez-vous que 64 cases ont été ajoutées
    });

    test('Should move pieces correctly', () => {
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

    test('Should not move a piece to a square occupied by its own color', () => {
        chessboard.board = [
            [new Pawn('', [0, 0], 'black'), null, null, null, null, null, null, null],
            [new Rook('', [1, 0], 'black'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];
    
        chessboard.movePiece(0, 0, 1, 0); // Déplace un pion vers le bas
        expect(chessboard.board[0][0]).toBeInstanceOf(Pawn);
        expect(chessboard.board[1][0]).toBeInstanceOf(Rook);
    });

    test('Should black piece eat white piece', () => {
        chessboard.board = [
            [new Rook('', [0, 0], 'black'), null, null, null, null, null, null, null],
            [new Pawn('', [1, 0], 'white'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];
    
        chessboard.movePiece(0, 0, 1, 0); // Déplace un pion vers le bas
        expect(chessboard.board[0][0]).toBeNull();
        expect(chessboard.board[1][0]).toBeInstanceOf(Rook);
    });

    test('Should white piece eat black piece', () => {
        chessboard.board = [
            [new Rook('', [0, 0], 'white'), null, null, null, null, null, null, null],
            [new Pawn('', [1, 0], 'black'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];
    
        chessboard.movePiece(0, 0, 1, 0); // Déplace un pion vers le bas
        expect(chessboard.board[0][0]).toBeNull();
        expect(chessboard.board[1][0]).toBeInstanceOf(Rook);
    });
    
    test('Should check if white king is not in check', () => {
        chessboard.board = [
            [new King('', [0, 0], 'white'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, new Rook('', [2, 1], 'black'), null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        expect(chessboard.isKingInCheck('white')).toBe(false);
    });

    test('Should check if white king is in check', () => {
        chessboard.board = [
            [new King('', [0, 0], 'white'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, new Rook('', [2, 1], 'black'), null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        chessboard.movePiece(2, 1, 2, 0); // Déplace le pion adverse pour mettre le roi en échec
        expect(chessboard.isKingInCheck('white')).toBe(true);
    });

    test('Should check if black king is not in check', () => {
        chessboard.board = [
            [new King('', [0, 0], 'black'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, new Rook('', [2, 1], 'white'), null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        expect(chessboard.isKingInCheck('black')).toBe(false);
    });

    test('Should check if black king is in check', () => {
        chessboard.board = [
            [new King('', [0, 0], 'black'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, new Rook('', [2, 1], 'white'), null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        chessboard.movePiece(2, 1, 2, 0); // Déplace le pion adverse pour mettre le roi en échec
        expect(chessboard.isKingInCheck('black')).toBe(true);
    });

    test("Should promote pawn white to queen when reaching the last rank", () => {
        chessboard.board = [
            [null, null, null, null, null, null, null, null],
            [new Pawn('', [1, 0], 'white'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        chessboard.movePiece(1, 0, 0, 0); // Déplace un pion à la dernière rangée
        expect(chessboard.board[0][0]).toBeInstanceOf(Queen);
    });

    test('Should promote black pawn to queen when reaching the last rank', () => {
        chessboard.board = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn('', [6, 0], 'black'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        chessboard.movePiece(6, 0, 7, 0); // Déplace un pion à la dernière rangée
        expect(chessboard.board[7][0]).toBeInstanceOf(Queen);
    });


    
    test('Should check if black king is not in checkmate', () => {
        chessboard.board = [
            [new King('', [0, 0], 'black'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, new Rook('', [2, 1], 'white'), null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        expect(chessboard.isCheckmate('black')).toBe(false);
    });

    test('Should check if white king is not in checkmate', () => {
        chessboard.board = [
            [new King('', [0, 0], 'white'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, new Rook('', [2, 1], 'black'), null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        expect(chessboard.isCheckmate('white')).toBe(false);
    });

    test('Should check if white king is in checkmate', () => {
        chessboard.board = [
            [new King('', [0, 0], 'white'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, new Rook('', [2, 1], 'black'), null, null, null, null, null, null],
            [new Rook('', [3, 0], 'black'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        expect(chessboard.isCheckmate('white')).toBe(true);
    });

    test('Should check if black king is in checkmate', () => {
        chessboard.board = [
            [new King('', [0, 0], 'black'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, new Rook('', [2, 1], 'white'), null, null, null, null, null, null],
            [new Rook('', [3, 0], 'white'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        expect(chessboard.isCheckmate('black')).toBe(true);
    });

    test('Should check if move piece is safe for the black king (false)', () => {
        chessboard.board = [
            [new King('', [0, 0], 'black'), null, null, null, null, null, null, null],
            [new Rook('', [1, 0], 'black'), null, null, null, null, null, null, null],
            [new Rook('', [2, 0], 'white'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        expect(chessboard.isMoveSafe(chessboard.board[1][0], 1, 0, 1, 1)).toBe(false);
    });

    test('Should check if move piece is safe for the white king (false)', () => {
        chessboard.board = [
            [new King('', [0, 0], 'white'), null, null, null, null, null, null, null],
            [new Rook('', [1, 0], 'white'), null, null, null, null, null, null, null],
            [new Rook('', [2, 0], 'black'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        expect(chessboard.isMoveSafe(chessboard.board[1][0], 1, 0, 1, 1)).toBe(false);
    });

    test('Should check if move piece is safe for the white king (true)', () => {
        chessboard.board = [
            [new King('', [0, 0], 'white'), null, null, null, null, null, null, null],
            [new Rook('', [1, 0], 'white'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        expect(chessboard.isMoveSafe(chessboard.board[1][0], 1, 0, 1, 1)).toBe(true);
    });

    test('Should check if move piece is safe for the black king (true)', () => {
        chessboard.board = [
            [new King('', [0, 0], 'black'), null, null, null, null, null, null, null],
            [new Rook('', [1, 0], 'black'), null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        expect(chessboard.isMoveSafe(chessboard.board[1][0], 1, 0, 1, 1)).toBe(true);
    });
    
});
