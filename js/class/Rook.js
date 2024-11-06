import Pieces from './Pieces.js';

export default  class Rook extends Pieces 
{     
    constructor(imgRook ,emplacement, color) 
    {
        super(imgRook, color, "Rook");
        this.emplacement = emplacement;
    }

    // Déplacements de la tour : uniquement sur les lignes et colonnes
    checkMove(board)
    {
        const [row, col] = this.emplacement;
        const moves = [];

        // lignes verticales et horizontales
        for (let i = 1; i < 8; i++) {
            moves.push([row + i, col], [row - i, col], [row, col + i], [row, col - i]);
        }
    

        return this.filterValidMoves(moves, board);
    }

}