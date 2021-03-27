function validMove(row,colm){
    switch(board[row][colm]){
        case 1 || 7:
            if (pawnmoves()[row][colm] == 1) return true

    }
}

function pawnmoves(row,colm){
    let side = 1
    if(whitesTurn){
        side = -1;
    }

    let Moves = [];
}
