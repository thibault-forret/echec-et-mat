export default class PieceManger {
    constructor() {
        this.capturedBlackPieces = [];
        this.capturedWhitePieces = [];
        this.blackContainer = document.querySelector('.captured-black');  // Coin inférieur droit
        this.whiteContainer = document.querySelector('.captured-white');  // Coin supérieur gauche
    }

    capturePiece(piece) {
        if (piece.color === 'black') {
            this.capturedBlackPieces.push(piece);
            this.displayCapturedPiece(piece, this.blackContainer);
        } else if (piece.color === 'white') {
            this.capturedWhitePieces.push(piece);
            this.displayCapturedPiece(piece, this.whiteContainer);
        }
    }

    displayCapturedPiece(piece, container) {
        const pieceImage = document.createElement('img');
        pieceImage.src = piece.image;
        pieceImage.alt = piece.type;
        pieceImage.classList.add('captured-piece');
        container.appendChild(pieceImage);
    }
}
