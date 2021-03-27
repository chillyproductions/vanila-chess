var validMoves = [];

function validMove(row,colm){
    if(validMoves[row][colm] == 1) return true;
    validMoves = [];
    return false;
}

function pawnmoves(row,colm){
    let side = 1
    if(whitesTurn){
        side = -1;
    }

    let Moves = [];
}