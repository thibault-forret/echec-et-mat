// Méthode pour calculer les déplacements en fonction du tcolpe
calculatemoves(board); {
    switch (this.tcolpe) {
        case 'roi':
            return this.moveRoi(board);
        case 'reine':
            return this.moveReine(board);
        case 'tour':
            return this.moveTour(board);
        case 'fou':
            return this.moveFou(board);
        case 'cavalier':
            return this.moveCavalier(board);
        case 'pion':
            return this.movePion(board);
        default:
            return [];
    }
}

// Déplacements du roi : 1 case dans toutes les directions
moveRoi(board); {
    const [row, col] = this.emplacement;
    const moves = [
        [row + 1, col], [row - 1, col],
        [row, col + 1], [row, col - 1],
        [row + 1, col + 1], [row - 1, col - 1],
        [row + 1, col - 1], [row - 1, col + 1]
    ];
    return this.filterValidMoves(moves, board);
}

// Déplacements de la reine : combiner tour et fou
moveReine(board);{
    return [
        ...this.moveTour(board),
        ...this.moveFou(board)
    ];
}

// Déplacements de la tour : lignes droites
moveTour(board);{
    const [row, col] = this.emplacement;
    const moves = [];

    // Ligne verticale et horizontale
    for (let i = 1; i < 8; i++) {
        moves.push([row + i, col], [row - i, col], [row, col + i], [row, col - i]);
    }

    return this.filterValidMoves(moves, board);
}

// Déplacements du fou : diagonales
moveFou(board); {
    const [row, col] = this.emplacement;
    const moves = [];

    // Diagonales
    for (let i = 1; i < 8; i++) {
        moves.push([row + i, col + i], [row - i, col - i], [row + i, col - i], [row - i, col + i]);
    }

    return this.filterValidMoves(moves, board);
}

// Déplacements du cavalier : mouvement en L
moveCavalier(board); {
    const [row, col] = this.emplacement;
    const moves = [
        [row + 2, col + 1], [row + 2, col - 1], [row - 2, col + 1], [row - 2, col - 1],
        [row + 1, col + 2], [row + 1, col - 2], [row - 1, col + 2], [row - 1, col - 2]
    ];
    return this.filterValidMoves(moves, board);
}

// Déplacements du pion : en fonction de la couleur
movePion(board); {
    const [row, col] = this.emplacement;
    const moves = [];
    
    // Déplacement de base du pion (blanc ou noir)
    if (this.color === 'blanc') {
        moves.push([row, col + 1]); // avancer d'une case
        if (col === 1) moves.push([row, col + 2]); // avancer de deurow cases si au point de départ
    } else {
        moves.push([row, col - 1]);
        if (col === 6) moves.push([row, col - 2]);
    }

    return this.filterValidMoves(moves, board);
}

// Filtrer les mouvements pour rester dans les limites du plateau
filterValidMoves(moves, board); {
    return moves.filter(([row, col]) => row >= 0 && row < 8 && col >= 0 && col < 8);
}