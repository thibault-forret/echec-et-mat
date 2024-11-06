import Pieces from './Pieces.js';

export default  class Pawn extends Pieces {     
    constructor(imgPawn ,emplacement, color) {
        super(imgPawn, color, "Pawn");
        this.emplacement = emplacement;
    }

// Déplacements du pion : en fonction de la couleur, une case vers le haut ou le bas
checkMove(){
        const [row, col] = this.emplacement;
        const moves = [];

       // Déplacement de base du pion (blanc ou noir)
        if (this.color === 'blanc') {
            moves.push([row, col + 1]); // avancer d'une case
            if (col === 1) moves.push([row, col + 2]); // avancer de deux cases si au point de départ
        } else {
            moves.push([row, col - 1]);
            if (col === 6) moves.push([row, col - 2]);
        }

        return this.filterValidMoves(moves, board);
    }

}