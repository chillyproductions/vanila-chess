function check(color){
    let row = whiteKing[1];
    let colm = whiteKing[2];
    if(color == "W"){
        row = blackKing[1];
        colm = blackKing[2];
    }

    let checkAmount = 0;
    let checkLocation = null;
    //pawn
    if(color == "B"){
        if(testBoard?.[row-1]?.[colm-1] instanceof pawn && testBoard?.[row-1]?.[colm-1]?.color == "B"){
            checkAmount++;
            checkLocation = [row-1,colm-1];
        }
        if(testBoard?.[row-1]?.[colm+1] instanceof pawn && testBoard?.[row-1]?.[colm+1]?.color == "B"){
            checkAmount++;
            checkLocation = [row-1,colm+1];
        }
    }
    else{
        if(testBoard?.[row+1]?.[colm-1] instanceof pawn && testBoard?.[row+1]?.[colm-1]?.color == "W"){
            checkAmount++;
            checkLocation = [row+1,colm-1];
        }
        if(testBoard?.[row+1]?.[colm+1] instanceof pawn && testBoard?.[row+1]?.[colm+1]?.color == "W"){
            checkAmount++;
            checkLocation = [row+1,colm+1];
        }
    }
    

    //bisiop and queen
    let irow = row-1;
    let icolm = colm-1;
    while(icolm >= 0 && irow >= 0){
        if(testBoard[irow][icolm] !== null){
            if((testBoard[irow][icolm] instanceof bisiop || testBoard[irow][icolm] instanceof queen) && testBoard[irow][icolm]?.color == color){
                checkAmount++;
                checkLocation = [irow,icolm];
            }
            break;
        }
        irow--;
        icolm--;
    }
    
    irow = row-1;
    icolm = colm+1;
    while(icolm < 8 && irow >= 0){
        if(testBoard[irow][icolm] !== null){
            if((testBoard[irow][icolm] instanceof bisiop || testBoard[irow][icolm] instanceof queen) && testBoard[irow][icolm]?.color == color){
                checkAmount++;
                checkLocation = [irow,icolm];
            }
            break;
        }
        irow--;
        icolm++;
    } 

    irow = row+1;
    icolm = colm-1;
    while(icolm >= 0 && irow < 8){
        if(testBoard[irow][icolm] !== null){
            if((testBoard[irow][icolm] instanceof bisiop || testBoard?.[irow]?.[icolm] instanceof queen) && testBoard[irow][icolm]?.color == color){
                checkAmount++;
                checkLocation = [irow,icolm];
            }
            break;
        }
        irow++;
        icolm--;
    }

    irow = row+1;
    icolm = colm+1;
    while(icolm < 8 && irow < 8){
        if(testBoard[irow][icolm] !== null){
            if((testBoard[irow][icolm] instanceof bisiop || testBoard[irow][icolm] instanceof queen) && testBoard[irow][icolm]?.color == color){
                checkAmount++;
                checkLocation = [irow,icolm];
            }
            break;
        }
        irow++;
        icolm++;
    }

    //rook and queen
    for(let irow = row -1; irow >= 0; irow--){
        if(testBoard[irow][colm] !== null){
            if((testBoard[irow][colm] instanceof rook || testBoard[irow][colm] instanceof queen) && testBoard[irow][colm]?.color == color){
                checkAmount++;
                checkLocation = [irow,colm];
            }
            break;
        }
    }

    for(let irow = row +1; irow < 8; irow++){
        if(testBoard[irow][colm] !== null){
            if((testBoard[irow][colm] instanceof rook || testBoard[irow][colm] instanceof queen) && testBoard[irow][colm]?.color == color){
                checkAmount++;
                checkLocation = [irow,colm];
            }
            break;
        }
    }

    for(let icolm = colm -1; icolm >= 0; icolm--){
        if(testBoard[row][icolm] !== null){
            if((testBoard[row][icolm] instanceof rook || testBoard[row][icolm] instanceof queen) && testBoard[row][icolm]?.color == color){
                checkAmount++;
                checkLocation = [row,icolm];
            }
            break;
        }
    }

    for(let icolm = colm +1; icolm < 8; icolm++){
        if(testBoard[row][icolm] !== null){
            if((testBoard[row][icolm] instanceof rook || testBoard[row][icolm] instanceof queen) && testBoard[row][icolm]?.color == color){
                checkAmount++;
                checkLocation = [row,icolm];
            }
            break;
        }
    }
    
    //knight
    if(testBoard?.[row-2]?.[colm-1] instanceof knight && testBoard?.[row-2]?.[colm-1]?.color == color){
        checkAmount++;
        checkLocation = [row-2,colm-1];
    }
    if(testBoard?.[row-2]?.[colm+1] instanceof knight && testBoard?.[row-2]?.[colm+1]?.color == color){
        checkAmount++;
        checkLocation = [row-2,colm+1];
    }
    if(testBoard?.[row-1]?.[colm+2] instanceof knight && testBoard?.[row-1]?.[colm+2]?.color == color){
        checkAmount++;
        checkLocation = [row-1,colm+2];
    }
    if(testBoard?.[row+1]?.[colm+2] instanceof knight && testBoard?.[row+1]?.[colm+2]?.color == color){
        checkAmount++;
        checkLocation = [row+1,colm+2];
    }
    if(testBoard?.[row+2]?.[colm+1] instanceof knight && testBoard?.[row+2]?.[colm+1]?.color == color){
        checkAmount++;
        checkLocation = [row+2,colm+1];
    }
    if(testBoard?.[row+2]?.[colm-1] instanceof knight && testBoard?.[row+2]?.[colm-1]?.color == color){
        checkAmount++;
        checkLocation = [row+2,colm-1];
    }
    if(testBoard?.[row+1]?.[colm-2] instanceof knight && testBoard?.[row+1]?.[colm-2]?.color == color){
        checkAmount++;
        checkLocation = [row+1,colm-2];
    }
    if(testBoard?.[row-1]?.[colm-2] instanceof knight && testBoard?.[row-1]?.[colm-2]?.color == color){
        checkAmount++;
        checkLocation = [row-1,colm-2];
    }

    //king
    if(testBoard?.[row-1]?.[colm-1] instanceof king && testBoard?.[row-1]?.[colm-1]?.color === color){
        checkAmount++;
        checkLocation = [row-1,colm-1];
    }
    if(testBoard?.[row-1]?.[colm] instanceof king && testBoard?.[row-1]?.[colm]?.color === color){
        checkAmount++;
        checkLocation = [row-1,colm];
    }
    if(testBoard?.[row-1]?.[colm+1] instanceof king && testBoard?.[row-1]?.[colm+1]?.color === color){
        checkAmount++;
        checkLocation = [row-1,colm+1];
    }
    if(testBoard?.[row]?.[colm+1] instanceof king && testBoard?.[row]?.[colm+1]?.color === color){
        checkAmount++;
        checkLocation = [row,colm+1];
    }
    if(testBoard?.[row+1]?.[colm+1] instanceof king && testBoard?.[row+1]?.[colm+1]?.color === color){
        checkAmount++;
        checkLocation = [row+1,colm+1];
    }
    if(testBoard?.[row+1]?.[colm] instanceof king && testBoard?.[row+1]?.[colm]?.color === color){
        checkAmount++;
        checkLocation = [row+1,colm];
    }
    if(testBoard?.[row+1]?.[colm-1] instanceof king && testBoard?.[row+1]?.[colm-1]?.color === color){
        checkAmount++;
        checkLocation = [row+1,colm-1];
    }
    if(testBoard?.[row]?.[colm-1] instanceof king && testBoard?.[row]?.[colm-1]?.color === color){
        checkAmount++;
        checkLocation = [row,colm-1];
    }
    
    return(checkAmount)

}

function cleanChecks(from,moves,color){
    
    for(let i = 0; i < moves.length; i++){
        let row = Math.floor(moves[i]/8);
        let colm = moves[i]%8;

        let movesTested = tryMove(from,[row,colm],[]);
        if(check(color,testBoard)) {moves.splice(i,1); i--;}
        backUp(movesTested);
    }
    return moves
}

function tryMove(from,to,movesTested){
    if(testBoard[from[0]][from[1]] instanceof king){
        if(testBoard[from[0]][from[1]].color == "W"){
            whiteKing[1] = to[0];
            whiteKing[2] = to[1];
        }
        else{
            blackKing[1] = to[0];
            blackKing[2] = to[1];
        }
    }

    if(testBoard[from[0]][from[1]] instanceof pawn){
        if(testBoard[from[0]][from[1]].color == "W" && to[0] == 0)
            testBoard[to[0]][to[1]] = new queen(to[0],to[1],"W")
        else if(testBoard[from[0]][from[1]].color == "B" && to[0] == 7)
            testBoard[to[0]][to[1]] = new queen(to[0],to[1],"B");
        else
            testBoard[to[0]][to[1]] = testBoard[from[0]][from[1]];
    }
    else
        testBoard[to[0]][to[1]] = testBoard[from[0]][from[1]];
    testBoard[from[0]][from[1]] = null;


    if(!movesTested.length)
        movesTested.push(from);
    movesTested.push(to);
    return movesTested;
}

function backUp(movesTested){
    for(move of movesTested){
        testBoard[move[0]][move[1]] = board[move[0]][move[1]];
    }
    whiteKing[1] = whiteKing[0].row;
    whiteKing[2] = whiteKing[0].colm;
    blackKing[1] = blackKing[0].row;
    blackKing[2] = blackKing[0].colm;
}

function mate(color){
    for(let row = 0; row < 8; row++){
        for(let colm = 0; colm < 8; colm++){
            if(testBoard[row][colm]?.color == color)
                if(testBoard[row][colm].validMoves().length != 0)
                    return false;
        }
    }
    return true;
}