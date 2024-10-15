import Pieces from './Pieces.js';

export default class Queen extends Pieces {     
    constructor(imgQueen ,emplacement, color) {
        super(imgQueen, color, "Queen");
        this.emplacement = emplacement;
    }

    // Déplacements de la reine : toutes les cases dans toutes les directions
    checkMove(){
        const [row, col] = this.emplacement;
        const moves = [];

        // Ligne verticale et horizontale
        for (let i = 1; i < 8; i++) {
            moves.push([row + i, col], [row - i, col], [row, col + i], [row, col - i]);
            moves.push([row + i, col + i], [row - i, col - i], [row + i, col - i], [row - i, col + i]);

        }

        return this.filterValidMoves(moves, board);
    }

}