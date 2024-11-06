import Pieces from './Pieces.js';

export default class Bishop extends Pieces 
{     
    constructor(imgBishop ,emplacement, color) 
    {
        super(imgBishop, color, "Bishop");
        this.emplacement = emplacement;
    }

    // Déplacements du fou : uniquement en diagonale
    checkMove(board)
    {
        const [row, col] = this.emplacement;
        const moves = [];

        // Diagonales
        for (let i = 1; i < 8; i++) {
            moves.push([row + i, col + i], [row - i, col - i], [row + i, col - i], [row - i, col + i]);
        }

        return this.filterValidMoves(moves, board);
    }

}