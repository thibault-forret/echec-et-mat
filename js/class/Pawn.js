import Pieces from './Pieces.js';

export default  class Pawn extends Pieces 
{     
    constructor(imgPawn ,emplacement, color) 
    {
        super(imgPawn, color, "Pawn");
        this.emplacement = emplacement;
    }

    // Cette fonction remplace la fonction générique car le comportement du pion est différent
    // Déplacements du pion : en fonction de la couleur, une case vers le haut ou le bas
    checkMove(board)
    {
        const [row, col] = this.emplacement;
        const moves = [];

        // Déplacement de base du pion (blanc ou noir)
        if (this.color === 'black') {
            if (board[row + 1]?.[col] === null) {
                moves.push([row + 1, col]); // avancer d'une case
                if (row === 1 && board[row + 2]?.[col] === null && board[row + 1]?.[col] === null) {
                    moves.push([row + 2, col]); // avancer de deux cases si au point de départ
                }
            }   

            if (board[row + 1]?.[col - 1]?.color === 'white') {
                moves.push([row + 1, col - 1]);
            }
            if (board[row + 1]?.[col + 1]?.color === 'white') {
                moves.push([row + 1, col + 1]);
            }


        } else {
            if (board[row - 1]?.[col] === null) {
                moves.push([row - 1, col]);
                if (row === 6 && board[row - 2]?.[col] === null && board[row - 1]?.[col] === null) {
                    moves.push([row - 2, col]);
                }
            }
            if (board[row - 1]?.[col - 1]?.color === 'black') {
                moves.push([row - 1, col - 1]);
            }
            if (board[row - 1]?.[col + 1]?.color === 'black') {
                moves.push([row - 1, col + 1]);
            }
            
        }

        return this.filterValidMoves(moves, board);
    }

}