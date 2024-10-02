class Pieces{
    
    constructor(image,color,type){
        this.emplacement = [];//emplacement de la  pièces
        this.deplacements=[];//deplacements des pièces en fonction de leur emplacement
        this.image = image;//image de la pièce
        this.color = color;//couleur de la pièce
        this.type = type;//type de la pièce(rois, reine, ect...)
    }
}