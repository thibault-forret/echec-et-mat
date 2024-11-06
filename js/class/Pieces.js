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
        console.log(moves);

        return moves
    }

}