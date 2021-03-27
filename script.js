var board = [
    [10,9,8,11,12,8,9,10],
    [7,7,7,7,7,7,7,7],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1],
    [4,3,2,5,6,2,3,4]
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

var currentPeice = null;
var whitesTurn = true;

function create_board(){
    let s = "<table border='1'>";
    for(let row = 0; row < 8; row++){
        s+="<tr>";
        for(let colm = 0; colm < 8; colm++){
            let color = 'white';
            if((row + colm) % 2== 0)
                color = 'brown';

            s+="<td onclick='onClickEvt(this.id);' style='width:60px; height:60px; background-color:"+color+"; background-image:url("+img_array[board[row][colm]]+")' id='"+ (row*8+colm) +"'>";
            s+="</td>";
        }
        s+="</tr>";
    }
    s+="</table>"

    document.getElementById("board").innerHTML = s;
}

function move(from, to, pcc){
    board[from[0]][from[1]] = 0;
    board[to[0]][to[1]] = pcc;
    document.getElementById(from[0]*8+from[1]).style.backgroundImage = null;

    let color = 'white';
    if((from[0] + from[1]) % 2== 0)
        color = 'brown';
    document.getElementById(from[0]*8+from[1]).style.backgroundColor = color;

    document.getElementById(to[0]*8+to[1]).style.backgroundImage = "url("+img_array[pcc]+")";

    whitesTurn = !whitesTurn;
}

function cancelMove(){
    let color = 'white';
    if((from[0] + from[1]) % 2== 0)
        color = 'brown';
    document.getElementById(currentPeice[0]*8+currentPeice[1]).style.backgroundColor = color;

    currentPeice = null;
}

function onClickEvt(id){
    let row = Math.floor(parseInt(id)/8);
    let colm = parseInt(id)%8;


    if(currentPeice !== null){
        if(validMove(row,colm)){
            move([currentPeice[1],currentPeice[2]], [row,colm], currentPeice[0]);
            currentPeice = null;
            return;
        }
        cancelMove();
        return;
    }

    if(rightColor(row,colm)){
        currentPeice = [board[row][colm],row,colm];
        document.getElementById(row*8+colm).style.backgroundColor = "yellow";
        //calculateValidMoves();
    }
}

function rightColor(row,colm){
    if(board[row][colm] == 0) return false;
    if(whitesTurn && board[row][colm] <= 6) return true;
    if(!whitesTurn && board[row][colm] > 6) return true;
    return false;
}



create_board();