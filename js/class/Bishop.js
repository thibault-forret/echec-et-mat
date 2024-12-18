import Pieces from './Pieces.js';

export default class Bishop extends Pieces 
{     
    constructor(imgBishop ,emplacement, color) 
    {
        super(imgBishop, color, "Bishop");
        this.emplacement = emplacement;
        this.directions = [
            [1, 1], [-1, -1], [1, -1], [-1, 1] 
        ];
        this.maxSteps = 7;
    }

}