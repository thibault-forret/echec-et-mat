import Pieces from './Pieces.js';

export default class Knight extends Pieces 
{     
    constructor(imgKnight ,emplacement, color) 
    {
        super(imgKnight, color, "Knight");
        this.emplacement = emplacement;
        this.directions = [
            [2, 1], [2, -1], [-2, 1], [-2, -1],
            [1, 2], [1, -2], [-1, 2], [-1, -2]
        ];
        this.maxSteps = 1;
    }
}