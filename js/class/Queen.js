import Pieces from './Pieces.js';

export default class Queen extends Pieces 
{     
    constructor(imgQueen ,emplacement, color) 
    {
        super(imgQueen, color, "Queen");
        this.emplacement = emplacement;
        this.directions = [
            [1, 0], [-1, 0], [0, 1], [0, -1],   
            [1, 1], [-1, -1], [1, -1], [-1, 1]   
        ];
        this.maxSteps = 8; 
    }
}