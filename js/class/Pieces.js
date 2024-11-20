export default class Pieces
{  
    constructor(image,color,type)
    {
        this.emplacement = [];//emplacement de la  pièces
        this.deplacements= [];//deplacements des pièces en fonction de leur emplacement
        this.image = image;//image de la pièce
        this.color = color;//couleur de la pièce
        this.type = type;//type de la pièce(rois, reine, ect...)
        this.directions = []; // À remplir par chaque pièce
        this.maxSteps = 0;    // Nombre maximal de cases à parcourir (selon la pièce)
        this.FirstMouve=false;  // Pour les rois, indique si il a déjà bougé
    }




    // Méthode générique de déplacement
    checkMove(board) {
        const [row, col] = this.emplacement;
        const moves = [];

        // Parcours toutes les directions possibles
        for (const [dx, dy] of this.directions) {
            for (let step = 1; step <= this.maxSteps; step++) {
                const newRow = row + step * dx;
                const newCol = col + step * dy;

                // Vérifie si la case est en dehors du plateau
                if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) break;

                const targetPiece = board[newRow][newCol];

                if (targetPiece === null) {
                    // Case vide, ajoute le mouvement
                    moves.push([newRow, newCol]);
                } else {
                    // Case occupée par une pièce
                    if (targetPiece.color !== this.color) {
                        // Capture possible, ajoute le mouvement
                        moves.push([newRow, newCol]);
                    }
                    // Arrête le déplacement dans cette direction
                    break;
                }
            }
        }
        if (this.type =="King" && this.FirstMouve==false)
            {
                for ( var i = this.emplacement[1]+1 ; i <8 ; i++ ){
                    console.log("verif ");

                    if (board[row][i] !== null) {
                        if (board[row][i].type !== 'Rook') {
                            break;
                        }
                        else {
                            var newCol = col+2;
                            
                            console.log(row,newCol);
                            moves.push([row,newCol]);
                            break;
                        }
                    }
                }
            }
        return this.filterValidMoves(moves, board);
    }

    // Méthode pour valider les mouvements
    filterValidMoves(moves) {
        return moves.filter(move => {
            const [row, col] = move;
            return row >= 0 && row <= 7 && col >= 0 && col <= 7;
        });
    }
}