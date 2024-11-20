import Chessboard from './ChessBoard.js';

// Initialisation du tableau de jeu
const chessboard = new Chessboard();

const squares = document.querySelectorAll('.square');

let currentRound = 0;
let row, col;
let whiteTimeLeft = 1 * 60;  // 100 minutes en secondes
let blackTimeLeft = 1 * 60;  // 100 minutes en secondes
let timerInterval;
let timeIncrement = 30; // 30 secondes d'incrément à chaque tour

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
            currentRound++
            updatePlayerTurn(currentRound);
        }
        else// if (checkIfPlayerRound)
        {
            // Nettoie les surbrillances existantes
            clearHighlights();

            row = parseInt(square.getAttribute('data-row'));
            col = parseInt(square.getAttribute('data-col'));

            if(chessboard.board[row][col] != null) {
                if (checkIfPlayerRound(currentRound,chessboard.board[row][col])){
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

function checkIfPlayerRound(currentRound,piece){
    //const piece = chessboard.board[row][col];
    return ((currentRound%2==0 && piece.color=="white")||(currentRound%2==1 && piece.color=="black"))
}

function updatePlayerTurn(currentRound) {
    const playerTurnElement = document.getElementById("player-turn");
    const currentPlayer = (currentRound % 2 === 0) ? "Joueur 1" : "Joueur 2";
    playerTurnElement.textContent = `C'est le tour de : ${currentPlayer}`;
    if (currentRound % 2 === 0) {
        playerTurnElement.classList.remove("joueur2");
        playerTurnElement.classList.add("joueur1");
        startTimer("White");
        WhiteTimeLeft += timeIncrement; // Ajout de 30 secondes pour Noir
    } else {
        playerTurnElement.classList.remove("joueur1");
        playerTurnElement.classList.add("joueur2");
        startTimer("Black");
        BlackTimeLeft += timeIncrement; // Ajout de 30 secondes pour Blanc
    }
}



// Fonction pour démarrer le timer du joueur
function startTimer(player) {
    const timerElement = document.getElementById(player + '-timer');
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (player === "White") {
            if (whiteTimeLeft <= 0) {
                clearInterval(timerInterval);
                alert("Le temps de Blanc est écoulé !");
            } else {
                whiteTimeLeft--;
                updateTimeDisplay(timerElement, whiteTimeLeft);
            }
        } else {
            if (blackTimeLeft <= 0) {
                clearInterval(timerInterval);
                alert("Le temps de Noir est écoulé !");
            } else {
                blackTimeLeft--;
                updateTimeDisplay(timerElement, blackTimeLeft);
            }
        }
    }, 1000);
}

// Fonction pour afficher le temps restant
function updateTimeDisplay(element, timeLeft) {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    element.textContent = `Temps restant : ${padTime(minutes)}:${padTime(seconds)}`;
}

// Ajouter un zéro devant les minutes et secondes si nécessaire
function padTime(time) {
    return time < 10 ? '0' + time : time;
}