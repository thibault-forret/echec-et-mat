import Pieces from './Pieces.js';

export default  class Rook extends Pieces 
{     
    constructor(imgRook ,emplacement, color) 
    {
        super(imgRook, color, "Rook");
        this.emplacement = emplacement;
        this.directions = [
            [1, 0], [-1, 0], [0, 1], [0, -1]
        ];
        this.maxSteps = 7; 
    }

}