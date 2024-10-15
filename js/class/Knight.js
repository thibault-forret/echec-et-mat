import Pieces from './Pieces.js';

export default class Knight extends Pieces {     
    constructor(imgKnight ,emplacement, color) {
        super(imgKnight, color, "Knight");
        this.emplacement = emplacement;
    }

    // Déplacement en L
    checkMove(){
        const [row, col] = this.emplacement;
        const moves = [
            [row + 2, col + 1], [row + 2, col - 1], [row - 2, col + 1], [row - 2, col - 1],
            [row + 1, col + 2], [row + 1, col - 2], [row - 1, col + 2], [row - 1, col - 2]
        ];

        return this.filterValidMoves(moves, board);
    }

}