import Chessboard from './ChessBoard.js';

// Initialisation du tableau de jeu
const chessboard = new Chessboard();

const squares = document.querySelectorAll('.square');

let currentRound = 0;
let row, col;

squares.forEach(square => {
    square.addEventListener('click', () => {
        let highlighted = checkIfHighlights(square);
        if(highlighted)
        {
            // Récupère les coordonnées de la case de destination
            let newRow = parseInt(square.getAttribute('data-row'));
            let newCol = parseInt(square.getAttribute('data-col'));
            
            // Déplace la pièce
            chessboard.movePiece(row, col, newRow, newCol);

            // Nettoie les surbrillances existantes
            clearHighlights();

            let checkmat = false;

            if (chessboard.board[newRow][newCol].color == "white")
                checkmat = chessboard.isCheckmate("black");
            else
                checkmat = chessboard.isCheckmate("white");
            
            if (checkmat) {
                // Affiche la pop-up
                const popup = document.getElementById("popup-checkmat");
                popup.classList.remove("hidden");
            
                // Boutons dans la pop-up
                const restartButton = document.getElementById("restart-button");
                const closeButton = document.getElementById("close-popup");
            
                // Relancer la partie
                restartButton.addEventListener("click", () => {
                    popup.classList.add("hidden");
                    restartGame(); // Fonction pour réinitialiser le plateau
                });
            
                // Quitter la partie
                closeButton.addEventListener("click", () => {
                    popup.classList.add("hidden");
                    alert("Merci d'avoir joué !");
                    // Ajoutez ici une redirection ou une autre logique pour quitter
                });
            }

            currentRound++
        }
        else
        {
            // Nettoie les surbrillances existantes
            clearHighlights();

            row = parseInt(square.getAttribute('data-row'));
            col = parseInt(square.getAttribute('data-col'));

            if(chessboard.board[row][col] != null) 
            {
                if (checkIfPlayerRound(currentRound, chessboard.board[row][col]))
                {
                    let piece = chessboard.board[row][col];

                    // Récupère les mouvements possibles
                    let moves = piece.checkMove(chessboard.board);

                    // Retirer les mouvements qui mettent le roi en échec
                    moves = removeMoveThatPutKingInCheck(piece, row, col, moves);

                    // Vérifie si le roi est en échec
                    chessboard.isKingInCheck(piece.color);

                    // Ajoute les surbrillances sur les cases jouables
                    addHighlightsOnPlayableMoves(moves);
                }
            }
        }
    });
});

// Filtre les mouvements qui mettent le roi en échec
function removeMoveThatPutKingInCheck(piece, row, col, moves)
{
    moves = moves.filter(([moveRow, moveCol]) => {
        return chessboard.isMoveSafe(piece, row, col, moveRow, moveCol);
    });

    return moves;
}

// Ajoute les surbrillances sur les cases jouables
function addHighlightsOnPlayableMoves(moves)
{
    moves.forEach( move => {
        const [moveRow, moveCol] = move;

        // Sélectionne la case cible avec les attributs data-row et data-col
        const targetSquare = document.querySelector(`.square[data-row="${moveRow}"][data-col="${moveCol}"]`);
        
        if (targetSquare) {
            targetSquare.classList.add('highlight');
        }
    });
}

// Met en surbrillance les cases disponibles pour le déplacement
function checkIfHighlights(square){
    if(square.classList.contains('highlight'))
    {
        return true;
    }
    else {
        return false;
    }
}

// Nettoie les surbrillances existantes
function clearHighlights() {
    squares.forEach(square => {
        square.classList.remove('highlight');
    });
}

// Vérifie si c'est le tour du joueur
function checkIfPlayerRound(currentRound,piece){
    return ((currentRound%2 == 0 && piece.color=="white")||(currentRound%2==1 && piece.color=="black"))
}
