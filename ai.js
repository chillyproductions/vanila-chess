function boardValue(){
    let value = 0;
    for(let row = 0; row < 8; row++){
        for(let colm = 0; colm < 8; colm++){
            let side = -1;

            if(typeof testBoard[row][colm]?.color === "undefined"){
                side = 0;
                continue;
            }
            else if(testBoard[row][colm]?.color == "B")
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

function AImove(enemy){
    let bestMove; //piece, move, value
    for(let row of testBoard){
        for(let piece of row){
            if(piece !== null && piece?.color == "B"){
                for(let move of piece.validMoves()){
                    let moveRow = Math.floor(move/8);
                    let moveColm = move%8;

                    let movesMade = tryMove([piece.row,piece.colm],[moveRow,moveColm],[]);
                    let value = boardValue();

                    if(!bestMove || value > bestMove.value)
                        bestMove = {piece:piece, move:[moveRow,moveColm], value:value};
                    
                    testBoard;
                    backUp(movesMade);
                }
            }
        }
    }
    bestMove.piece.move(bestMove.move);
}