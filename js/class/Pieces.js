export default class Pieces
{  
    constructor(image,color,type)
    {
        this.emplacement = [];//emplacement de la  pièces
        this.deplacements= [];//deplacements des pièces en fonction de leur emplacement
        this.image = image;//image de la pièce
        this.color = color;//couleur de la pièce
        this.type = type;//type de la pièce(rois, reine, ect...)
    }


    move (newEmplacement)
    {
        this.emplacement=newEmplacement;
    }

    // Filtrer les mouvements pour rester dans les limites du plateau
    // ne pas aller sur la case d'un pion de sa couleur
    // ne pas aller au dela d'un pion d'une autre couleur
    filterValidMoves(moves, board) 
    {
        // Vérifier si y a un joueur
        const validMoves = moves.filter(move => {
            const row = move[0];
            const col = move[1];

            // Vérifie si la case est en dehors du tableau
            if(row > 7 || col > 7 || row < 0 || col < 0)
            {
                return false;
            }

            // Vérifie si la case de destination est vide (null) dans le plateau
            if(board[row][col] != null)
            {
                // Vérifie si la case est un pion de sa couleur
                if(board[row][col].color != this.color)
                {
                    return true;
                }
                else {
                    return false
                }
            }
            else 
            {
                return board[row][col] === null;
            }        
        });

        console.log(validMoves);

        return validMoves;
    }

}