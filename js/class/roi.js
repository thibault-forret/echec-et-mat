class King extends Pieces {     
    constructor(imgKing ,emplacement, color) {
        super(imgKing, color, "King");
        this.emplacement = emplacement;
    }

    // Déplacements du roi : 1 case dans toutes les directions
    checkMove()
    {
        const [row, col] = this.emplacement;
        const moves = [
            [row + 1, col], [row - 1, col],
            [row, col + 1], [row, col - 1],
            [row + 1, col + 1], [row - 1, col - 1],
            [row + 1, col - 1], [row - 1, col + 1]
        ];
        return moves.filter(([row, col]) => row >= 0 && row < 8 && col >= 0 && col < 8);
    }


}