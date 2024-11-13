import Pieces from './Pieces.js';

export default class King extends Pieces 
{     
    constructor(imgKing ,emplacement, color) 
    {
        super(imgKing, color, "King");
        this.emplacement = emplacement;
        this.directions = [
            [1, 0], [-1, 0], [0, 1], [0, -1], 
            [1, 1], [-1, -1], [1, -1], [-1, 1] 
        ];
        this.maxSteps = 1; 
    }
}