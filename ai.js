function boardValue(){
    let value = 0;
    for(let row = 0; row < 8; row++){
        for(let colm = 0; colm < 8; colm++){
            if(typeof testBoard[row][colm]?.color === "undefined")
                continue;
            
            let side = -1;
            
            if(testBoard[row][colm]?.color == "B")
                side = 1;

            if(testBoard[row][colm] instanceof pawn)
                value += 1*side;
            else if(testBoard[row][colm] instanceof queen)
                value += 9*side;                
            else if(testBoard[row][colm] instanceof bisiop || testBoard[row][colm] instanceof knight)
                value += 3*side;
            else if(testBoard[row][colm] instanceof rook)
                value += 5*side;
        }
    }
    return value;
}

function findMove(black,depth){
    var bestMove; //piece, move, value
    for(let row of testBoard){
        for(let piece of row){
            if(piece !== null && (piece?.color == "B" && black) || (piece?.color == "W" && !black)){
                for(let move of piece.validMoves()){
                    let moveRow = Math.floor(move/8);
                    let moveColm = move%8;

                    let movesMade = tryMove([piece.row,piece.colm],[moveRow,moveColm],[]);
                    let value;
                    if(depth > 0){
                        value = findMove(!black,depth-1).value;
                    }
                    else
                        value = boardValue();

                    if(!bestMove || (value > bestMove.value && black) || ((value < bestMove.value && !black)) )
                        bestMove = {piece:piece, move:[moveRow,moveColm], value:value};
                    
                    testBoard;
                    backUp(movesMade);
                }
            }
        }
    }
    if(!bestMove && black)
        return {value: -10000}
    else if(!bestMove && !black)
        return {value: 10000}
        
    return bestMove;
}

function AImove(){
    let bestMove = findMove(true,2);
    bestMove.piece.move(bestMove.move);
}