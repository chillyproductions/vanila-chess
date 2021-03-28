function check(color,row,colm){
    let king = false;
    if(!row)
        king= true;

    if(king){
        row = whiteKing.row;
        colm = whiteKing.colm;
        if(color == "B"){
            row = blackKing.row;
            colm = blackKing.colm;
        }
    }
    let checkAmount = 0;
    let checkLocation = [];
    //pawn
    if(king){
        if(color == "W"){
            if(board[row-1][colm-1] instanceof pawn) checkAmount++;
            if(board[row-1][colm+1] instanceof pawn) checkAmount++;
        }
        else{
            if(board[row+1][colm-1] instanceof pawn) checkAmount++;
            if(board[row+1][colm+1] instanceof pawn) checkAmount++;
        }
    }
    else{
        
    }
}

function cleanChecks(moves,color){

}