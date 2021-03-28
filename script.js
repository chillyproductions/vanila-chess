var board = [
    [new rook(0,0,"B"),null,null,null,null,null,null,new rook(0,7,"B")],
    [new pawn(1,0,"B"),new pawn(1,1,"B"),new pawn(1,2,"B"),new pawn(1,3,"B"),new pawn(1,4,"B"),new pawn(1,5,"B"),new pawn(1,6,"B"),new pawn(1,7,"B")],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,new pawn(5,2,"B"),null,null,null,null,null],
    [new pawn(6,0,"W"),new pawn(6,1,"W"),new pawn(6,2,"W"),new pawn(6,3,"W"),new pawn(6,4,"W"),new pawn(6,5,"W"),new pawn(6,6,"W"),new pawn(6,7,"W")],
    [new rook(7,0,"W"),null,null,null,null,null,null,new rook(7,7,"W")],
];

var img_array = [null, "./imgs/white_pawn.png",
 "./imgs/white_bisiop.png",
  "./imgs/white_knight.png",
  "./imgs/white_rook.png",
  "./imgs/white_queen.png",
  "./imgs/white_king.png",
  "./imgs/black_pawn.png",
  "./imgs/black_bisiop.png",
  "./imgs/black_knight.png",
  "./imgs/black_rook.png",
  "./imgs/black_queen.png",
  "./imgs/black_king.png"];

var currentPiece = null;
var whitesTurn = true;

function create_board(){
    let s = "<table border='1'>";
    for(let row = 0; row < 8; row++){
        s+="<tr>";
        for(let colm = 0; colm < 8; colm++){
            let color = 'white';
            if((row + colm) % 2== 0)
                color = 'brown';

            s+="<td onclick='onClickEvt(this.id);' style='width:60px; height:60px; background-color:"+color+"; background-image:url("+board[row][colm]?.img+")' id='"+ (row*8+colm) +"'>";
            s+="</td>";
        }
        s+="</tr>";
    }
    s+="</table>"

    document.getElementById("board").innerHTML = s;
}

function onClickEvt(id){
    let row = Math.floor(parseInt(id)/8);
    let colm = parseInt(id)%8;


    if(currentPiece){    
        if(currentPiece.validMoves().includes(row*8+colm)){
            currentPiece.move([row,colm]);
            currentPiece = null;
            return;
        }
        currentPiece.cancelMove();
        return;
    }

    if(rightColor(row,colm)){
        currentPiece = board[row][colm];
        document.getElementById(row*8+colm).style.backgroundColor = "yellow";
    }
}

function rightColor(row,colm){
    if(whitesTurn && board[row][colm]?.color == "W") return true;
    if(!whitesTurn && board[row][colm]?.color == "B") return true;
    return false;
}

create_board();