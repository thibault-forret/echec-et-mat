import Chessboard from './ChessBoard.js';


// Initialisation du tableau de jeu
const chessboard = new Chessboard();

const squares = document.querySelectorAll('.square');

let row, col;

squares.forEach(square => {
    square.addEventListener('click', () => {
        let highlighted = checkIfHighlights(square);
        if(highlighted)
        {
            // Joue le coup
            let newRow = parseInt(square.getAttribute('data-row'));
            let newCol = parseInt(square.getAttribute('data-col'));

            chessboard.movePiece(row, col, newRow, newCol);

            // Nettoie les surbrillances existantes
            clearHighlights();
        }
        else
        {
            // Nettoie les surbrillances existantes
            clearHighlights();

            row = parseInt(square.getAttribute('data-row'));
            col = parseInt(square.getAttribute('data-col'));

            if(chessboard.board[row][col] != null) {
                let piece = chessboard.board[row][col];
                let moves = piece.checkMove(chessboard.board);

                moves.forEach( move => {
                    const [moveRow, moveCol] = move;

                    // Sélectionne la case cible avec les attributs data-row et data-col
                    const targetSquare = document.querySelector(`.square[data-row="${moveRow}"][data-col="${moveCol}"]`);
                    
                    if (targetSquare) {
                        targetSquare.classList.add('highlight');
                    }
                });
            }
        }
    });
});

function checkIfHighlights(square){
    if(square.classList.contains('highlight'))
    {
        return true;
    }
    else {
        return false;
    }
}

function clearHighlights() {
    squares.forEach(square => {
        square.classList.remove('highlight');
    });
}
