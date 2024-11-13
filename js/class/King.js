import Pieces from './Pieces.js';

export default class King extends Pieces 
{     
    constructor(imgKing ,emplacement, color) 
    {
        super(imgKing, color, "King");
        this.emplacement = emplacement;
    }

    // Déplacements du roi : 1 case dans toutes les directions
    checkMove(board)
    {
        const [row, col] = this.emplacement;
        const moves = [
            [row + 1, col], [row - 1, col],
            [row, col + 1], [row, col - 1],
            [row + 1, col + 1], [row - 1, col - 1],
            [row + 1, col - 1], [row - 1, col + 1]
        ];

        // Modifier et utiliser filterValidMove
       return this.filterValidMoves(moves, board);
    }


}