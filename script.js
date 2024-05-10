let step = 1;

//create gameboard object
const GameBoard =   (function(){
    let board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];

    //action method
    const action = function(player, position){
        const [x,y] = position;
        console.log(`action at ${position}`);

        switch(player){
            case 1:
                board[x][y] = 1;
                break;
            
            case 2:
                board[x][y] = -1;
        }
    };

    //display board
    const show = ()=>{ 
        console.log(JSON.stringify(board));
    };

    //get board
    const getBoard = () => board;


    return {action, show, getBoard};
})();

//check board for win
const check = function(board){
    //check verticals and horizontals
    for(let i=0; i < 3; i++){
        let row_sum = 0;
        let column_sum = 0;
        for(let j=0; j < 3; j++){
            row_sum += board[i][j];
            column_sum += board[j][i]
        }
        if(column_sum === 3) return 1;
        if(row_sum === 3) return 1;
        if(column_sum === -3) return -1;
        if(row_sum === -3) return -1;
    }

    //check diagonals
    if(board[0][0] + board[1][1] + board[2][2] === 3) return 1;
    if(board[0][2] + board[1][1] + board[2][0] === 3) return 1;
    if(board[0][0] + board[1][1] + board[2][2] === -3) return -1;
    if(board[0][2] + board[1][1] + board[2][0] === -3) return -1;

    return 0;
}

//function to lock all cells
const lockCells = function(){
    const board = document.querySelectorAll(".board > button");
    for(let i=0; i < 9; i++){
        board[i].disabled = true;
        board[i].removeEventListener("mouseover", hover);
    }
}


const clicked = function(i, cell){
    const container = document.querySelector(".container");

    //player 1
    if(step % 2 === 1){
        cell.textContent = 'x';
        cell.disabled = true;
        GameBoard.action(1, [i % 3, Math.floor(i/3)]);
    }
    //player 2
    else{
        cell.textContent = 'o';
        cell.disabled = true;
        GameBoard.action(2, [i % 3, Math.floor(i/3)])
    }

    //check board
    if(check(GameBoard.getBoard()) === 1){
        console.log("player 1 wins");
        const p1 = document.createElement("div");
        p1.textContent = "Player 1 wins!";
        container.appendChild(p1);
        lockCells();

    }
    else if(check(GameBoard.getBoard()) === -1){
        console.log("player 2 wins");
        const p2 = document.createElement("div");
        p2.textContent = "Player 2 wins!";
        container.appendChild(p2);
        lockCells();
    }
    step++;
    //endgame if 9 steps taken
    if(step === 10){
        const end = document.createElement("div");
        end.textContent = "Draw!";
        container.appendChild(end);
    }
}



//function to make element border red when called
hover = function(e){
    e.target.style.borderColor = "red";
}

//add event listeners for divs in the game table
const board = document.querySelectorAll(".board > button");
for(let i=0; i < 9; i++){
    //cursor enters each box
    board[i].addEventListener("mouseover", hover);
    //cursor leaves box
    board[i].addEventListener("mouseout", ()=>{
        board[i].style.borderColor = "black";
    })
    //box is clicked
    board[i].addEventListener("click", () => {
        clicked(i, board[i])
        board[i].removeEventListener("mouseover", hover);
    });
}





























//start game function
const start = function(){
    const p1 = prompt("Choose player 1 symbol: x/y}");
    GameBoard.show();
    
    let i = 1;
    while(i<=9){
        //player 1 turn
        if(i % 2 === 1){
            console.log("player 1 turn");
            let x = prompt("Enter x-coordinate: ");
            let y = prompt("Enter y-coordinate: ");

            GameBoard.action(1, [Number(x), Number(y)]);
            GameBoard.show();
        }
        //player 2 turn
        else{
            console.log("player 2 turn");
            let x = prompt("Enter x-coordinate: ");
            let y = prompt("Enter y-coordinate: ");

            GameBoard.action(2, [Number(x), Number(y)]);
            GameBoard.show();
        }

        //check board
        if(check(GameBoard.getBoard()) === 1){
            console.log("Player 1 won!");
            return;
        }
        else if(check(GameBoard.getBoard()) === -1){
            console.log("Player 2 won!");
            return;
        }

        i++;
    }
    console.log("It's a draw!");
    return;
}
