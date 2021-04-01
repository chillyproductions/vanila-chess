class piece{
    moves = [];
    enemyColor = "W";
    constructor(row, colm, color){
        this.row = row;
        this.colm = colm;
        this.color = color;
        if(color == "W")
            this.enemyColor = "B"
    }

    move(to){
        board[to[0]][to[1]] = board[this.row][this.colm];
        testBoard[to[0]][to[1]] = board[this.row][this.colm];
        board[this.row][this.colm] = null;
        testBoard[this.row][this.colm] = null;
        document.getElementById(this.row*8+this.colm).style.backgroundImage = null;
    
        let color = 'white';
        if((this.row + this.colm) % 2== 0)
            color = 'brown';
        document.getElementById(this.row*8+this.colm).style.backgroundColor = color;
        this.clearMoves();
    
        document.getElementById(to[0]*8+to[1]).style.backgroundImage = "url("+this.img+")";
    
        this.row = to[0];
        this.colm = to[1];
        whitesTurn = !whitesTurn;
    }

    cancelMove(){
        let color = 'white';
        if((this.row + this.colm) % 2 == 0)
            color = 'brown';
        document.getElementById(this.row*8+this.colm).style.backgroundColor = color;
        this.clearMoves();

        currentPiece = null;
    }
    
    clearMoves(){
        for(let move of moves){
            let moveRow = move % 8;
            let moveColm = Math.floor(move / 8);
            
            let color = 'white';
            if((moveRow + moveColm) % 2== 0)
                color = 'brown';
            document.getElementById(move).style.backgroundColor = color;
            moves = [];
        }
    }

    showMoves(){
        for(let move of moves)
            document.getElementById(move).style.backgroundColor = 'green';
    }
}

class pawn extends piece{
    constructor(row,colm,color){
        super(row,colm,color);
        if(color == "W")
            this.img = './imgs/white_pawn.png';
        else 
            this.img = './imgs/black_pawn.png';
    }
    move(to){
        let upgrade;
        if(this.color == "W" && to[0] == 0){
            upgrade = new queen(to[0],to[1],"W")
            board[to[0]][to[1]] = upgrade;
            testBoard[to[0]][to[1]] = upgrade;
        }
        else if(this.color == "B" && to[0] == 7){
            upgrade = new queen(to[0],to[1],"B")
            board[to[0]][to[1]] = upgrade;
            testBoard[to[0]][to[1]] = upgrade;
        }
        else{
            board[to[0]][to[1]] = board[this.row][this.colm];
            testBoard[to[0]][to[1]] = board[this.row][this.colm];
        }

        board[this.row][this.colm] = null;
        testBoard[this.row][this.colm] = null;
        document.getElementById(this.row*8+this.colm).style.backgroundImage = null;
    
        let color = 'white';
        if((this.row + this.colm) % 2== 0)
            color = 'brown';
        document.getElementById(this.row*8+this.colm).style.backgroundColor = color;
        this.clearMoves();
    
        if(upgrade)
            document.getElementById(to[0]*8+to[1]).style.backgroundImage = "url("+upgrade.img+")";
        else
            document.getElementById(to[0]*8+to[1]).style.backgroundImage = "url("+this.img+")";


        this.row = to[0];
        this.colm = to[1];
        whitesTurn = !whitesTurn;
    }

    validMoves(){
        let moves = []
        if(this.color == "W"){
            if(testBoard[this.row-1][this.colm] == null){
                moves.push((this.row-1)*8+this.colm);
                if(testBoard[this.row-2]?.[this.colm] == null && this.row == 6)
                    moves.push((this.row-2)*8+this.colm);
            }
            if(testBoard[this.row-1][this.colm-1]?.color == "B")
                moves.push((this.row-1)*8+this.colm-1);
            if(testBoard[this.row-1][this.colm+1]?.color == "B")
                moves.push((this.row-1)*8+this.colm+1);
            return cleanChecks([this.row,this.colm],moves,this.enemyColor);
        }
        
        if(testBoard[this.row+1][this.colm] == null){
            moves.push((this.row+1)*8+this.colm);
            if(testBoard[this.row+2]?.[this.colm] == null && this.row == 1)
                moves.push((this.row+2)*8+this.colm);
        }
        if(testBoard[this.row+1][this.colm-1]?.color == "W")
            moves.push((this.row+1)*8+this.colm-1);
        if(testBoard[this.row+1][this.colm+1]?.color == "W")
            moves.push((this.row+1)*8+this.colm+1);
        
        return cleanChecks([this.row,this.colm],moves,this.enemyColor);
    }
}

class knight extends piece{
    constructor(row,colm,color){
        super(row,colm,color);
        if(color == "W")
            this.img = './imgs/white_knight.png';
        else 
            this.img = './imgs/black_knight.png';
    }
    validMoves(){
        let moves = [];

        if(testBoard?.[this.row-2]?.[this.colm-1] === null || testBoard?.[this.row-2]?.[this.colm-1]?.color == this.enemyColor){
            moves.push((this.row-2)*8 + this.colm-1);
        }
        if(testBoard?.[this.row-2]?.[this.colm+1] === null || testBoard?.[this.row-2]?.[this.colm+1]?.color == this.enemyColor){
            moves.push((this.row-2)*8 + this.colm+1);
        }
        if(testBoard?.[this.row-1]?.[this.colm+2] === null || testBoard?.[this.row-1]?.[this.colm+2]?.color == this.enemyColor){
            moves.push((this.row-1)*8 + this.colm+2);
        }
        if(testBoard?.[this.row+1]?.[this.colm+2] === null || testBoard?.[this.row+1]?.[this.colm+2]?.color == this.enemyColor){
            moves.push((this.row+1)*8 + this.colm+2);
        }
        if(testBoard?.[this.row+2]?.[this.colm+1] === null || testBoard?.[this.row+2]?.[this.colm+1]?.color == this.enemyColor){
            moves.push((this.row+2)*8 + this.colm+1);
        }
        if(testBoard?.[this.row+2]?.[this.colm-1] === null || testBoard?.[this.row+2]?.[this.colm-1]?.color == this.enemyColor){
            moves.push((this.row+2)*8 + this.colm-1);
        }
        if(testBoard?.[this.row+1]?.[this.colm-2] === null || testBoard?.[this.row+1]?.[this.colm-2]?.color == this.enemyColor){
            moves.push((this.row+1)*8 + this.colm-2);
        }
        if(testBoard?.[this.row-1]?.[this.colm-2] === null || testBoard?.[this.row-1]?.[this.colm-2]?.color == this.enemyColor){
            moves.push((this.row-1)*8 + this.colm-2);
        }
        
        return cleanChecks([this.row,this.colm],moves,this.enemyColor);
    }
}

class bisiop extends piece{
    constructor(row,colm,color){
        super(row,colm,color);
        if(color == "W")
            this.img = './imgs/white_bisiop.png';
        else 
            this.img = './imgs/black_bisiop.png';
    }
    validMoves(){
        let moves = [];

        let irow = this.row-1;
        let icolm = this.colm-1;
        while(icolm >= 0 && irow >= 0){
            if(testBoard[irow][icolm] != null){
                if(testBoard[irow][icolm].color == this.enemyColor)
                    moves.push(irow*8+icolm);
                break;
            }
            moves.push(irow*8+icolm);
            irow--;
            icolm--;
        }

        irow = this.row-1;
        icolm = this.colm+1;
        while(icolm < 8 && irow >= 0){
            if(testBoard[irow][icolm] != null){
                if(testBoard[irow][icolm].color == this.enemyColor)
                    moves.push(irow*8+icolm);
                break;
            }
            moves.push(irow*8+icolm);
            irow--;
            icolm++;
        }

        irow = this.row+1;
        icolm = this.colm-1;
        while(icolm >= 0 && irow < 8){
            if(testBoard[irow][icolm] != null){
                if(testBoard[irow][icolm].color == this.enemyColor)
                    moves.push(irow*8+icolm);
                break;
            }
            moves.push(irow*8+icolm);
            irow++;
            icolm--;
        }

        irow = this.row+1;
        icolm = this.colm+1;
        while(icolm < 8 && irow < 8){
            if(testBoard[irow][icolm] != null){
                if(testBoard[irow][icolm].color == this.enemyColor)
                    moves.push(irow*8+icolm);
                break;
            }
            moves.push(irow*8+icolm);
            irow++;
            icolm++;
        }

        return cleanChecks([this.row,this.colm],moves,this.enemyColor);
    }
}

class rook extends piece{
    constructor(row,colm,color){
        super(row,colm,color);
        if(color == "W")
            this.img = './imgs/white_rook.png';
        else 
            this.img = './imgs/black_rook.png';
    }

    validMoves(){
        let moves = [];
        for(let irow = this.row -1; irow >= 0; irow--){
            if(testBoard[irow][this.colm] != null){
                if(testBoard[irow][this.colm].color == this.enemyColor)
                    moves.push(irow*8+this.colm)
                break;
            }
            moves.push(irow*8+this.colm);
        }
        for(let irow = this.row +1; irow < 8; irow++){
            if(testBoard[irow][this.colm] != null){
                if(testBoard[irow][this.colm].color == this.enemyColor)
                    moves.push(irow*8+this.colm)
                break;
            }
            moves.push(irow*8+this.colm);
        }
        for(let icolm = this.colm -1; icolm >= 0; icolm--){
            if(testBoard[this.row][icolm] != null){
                if(testBoard[this.row][icolm].color == this.enemyColor)
                    moves.push(this.row*8+icolm)
                break;
            }
            moves.push(this.row*8+icolm);
        }
        for(let icolm = this.colm +1; icolm < 8; icolm++){
            if(testBoard[this.row][icolm] != null){
                if(testBoard[this.row][icolm].color == this.enemyColor)
                    moves.push(this.row*8+icolm)
                break;
            }
            moves.push(this.row*8+icolm);
        }
        
        return cleanChecks([this.row,this.colm],moves,this.enemyColor);
    }
}

class queen extends bisiop{
    constructor(row,colm,color){
        super(row,colm,color);
        if(color == "W")
            this.img = './imgs/white_queen.png';
        else
            this.img = './imgs/black_queen.png';
    }
    validMoves(){
        let moves = super.validMoves();

        for(let irow = this.row -1; irow >= 0; irow--){
            if(testBoard[irow][this.colm] != null){
                if(testBoard[irow][this.colm].color == this.enemyColor)
                    moves.push(irow*8+this.colm)
                break;
            }
            moves.push(irow*8+this.colm);
        }
        for(let irow = this.row +1; irow < 8; irow++){
            if(testBoard[irow][this.colm] != null){
                if(testBoard[irow][this.colm].color == this.enemyColor)
                    moves.push(irow*8+this.colm)
                break;
            }
            moves.push(irow*8+this.colm);
        }
        for(let icolm = this.colm -1; icolm >= 0; icolm--){
            if(testBoard[this.row][icolm] != null){
                if(testBoard[this.row][icolm].color == this.enemyColor)
                    moves.push(this.row*8+icolm)
                break;
            }
            moves.push(this.row*8+icolm);
        }
        for(let icolm = this.colm +1; icolm < 8; icolm++){
            if(testBoard[this.row][icolm] != null){
                if(testBoard[this.row][icolm].color == this.enemyColor)
                    moves.push(this.row*8+icolm)
                break;
            }
            moves.push(this.row*8+icolm);
        }
        
        return cleanChecks([this.row,this.colm],moves,this.enemyColor);
    }
}

class king extends piece{
    constructor(row,colm,color){
        super(row,colm,color);
        if(color == "W"){
            this.img = './imgs/white_king.png';
        }
        else
            this.img = './imgs/black_king.png';
    }
    move(to){
        super.move(to);
        if(this.color == "W"){
            whiteKing[1] = this.row;
            whiteKing[2] = this.colm;
        }
        else{
            blackKing[1] = this.row;
            blackKing[2] = this.colm;
        }
    }
    validMoves(){
        let moves = [];

        if(testBoard?.[this.row-1]?.[this.colm-1] === null || testBoard?.[this.row-1]?.[this.colm-1]?.color === this.enemyColor){
            moves.push((this.row-1)*8+this.colm-1);
        }
        if(testBoard?.[this.row-1]?.[this.colm] === null || testBoard?.[this.row-1]?.[this.colm]?.color === this.enemyColor){
            moves.push((this.row-1)*8+this.colm);
        }
        if(testBoard?.[this.row-1]?.[this.colm+1] === null || testBoard?.[this.row-1]?.[this.colm+1]?.color === this.enemyColor){
            moves.push((this.row-1)*8+this.colm+1);
        }
        if(testBoard?.[this.row]?.[this.colm+1] === null || testBoard?.[this.row]?.[this.colm+1]?.color === this.enemyColor){
            moves.push(this.row*8+this.colm+1);
        }
        if(testBoard?.[this.row+1]?.[this.colm+1] === null || testBoard?.[this.row+1]?.[this.colm+1]?.color === this.enemyColor){
            moves.push((this.row+1)*8+this.colm+1);
        }
        if(testBoard?.[this.row+1]?.[this.colm] === null || testBoard?.[this.row+1]?.[this.colm]?.color === this.enemyColor){
            moves.push((this.row+1)*8+this.colm);
        }
        if(testBoard?.[this.row+1]?.[this.colm-1] === null || testBoard?.[this.row+1]?.[this.colm-1]?.color === this.enemyColor){
            moves.push((this.row+1)*8+this.colm-1);
        }
        if(testBoard?.[this.row]?.[this.colm-1] === null || testBoard?.[this.row]?.[this.colm-1]?.color === this.enemyColor){
            moves.push(this.row*8+this.colm-1);
        }
        
        return cleanChecks([this.row,this.colm],moves,this.enemyColor);
    }
}