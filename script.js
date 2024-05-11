let step = 1;

//player factory function
function createPlayer(number, name){
    const getNumber = () => number;
    const getName = () => name;
    const setName = (new_name) =>{
        name = new_name;
    } 

    return {getNumber, getName, setName};
}

//create player objects
let player1 = createPlayer(1, "player 1");
let player2 = createPlayer(2, "player 2");


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

        switch(player.getNumber()){
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

    //restart
    const restart = () =>{
        for(let i=0; i < 3; i++){
            for(let j=0; j < 3; j++){
                board[i][j] = 0;
            }
        }
    }


    return {action, show, getBoard, restart};
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

//function to unlock all cells
const unlockCells = function(){
    const board = document.querySelectorAll(".board > button");
    for(let i=0; i < 9; i++){
        board[i].disabled = false;
        board[i].addEventListener("mouseover", hover);
    }
}

//function to reset cell content
const resetCells = function(){
    const board = document.querySelectorAll(".board > button");
    for(let i=0; i < 9; i++){
        board[i].textContent = '';
    }
}


const clicked = function(i, cell){
    const container = document.querySelector(".container");

    //player 1
    if(step % 2 === 1){
        cell.textContent = 'x';
        cell.disabled = true;
        GameBoard.action(player1, [i % 3, Math.floor(i/3)]);
    }
    //player 2
    else{
        cell.textContent = 'o';
        cell.disabled = true;
        GameBoard.action(player2, [i % 3, Math.floor(i/3)])
    }

    //check board
    if(check(GameBoard.getBoard()) === 1){
        console.log(`${player1.getName()} wins`);
        const p1 = document.createElement("div");
        p1.classList.add("end");
        p1.textContent = `${player1.getName()} wins!`;
        container.appendChild(p1);
        lockCells();
        return;

    }
    else if(check(GameBoard.getBoard()) === -1){
        console.log(`${player2.getName()} wins`);
        const p2 = document.createElement("div");
        p2.classList.add("end");
        p2.textContent = `${player2.getName()} wins!`;
        container.appendChild(p2);
        lockCells();
        return;
    }
    step++;
    //endgame if 9 steps taken
    if(step === 10){
        const end = document.createElement("div");
        end.classList.add("end");
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




//prompt name
const dialog = document.querySelector("dialog");
dialog.showModal();


//submit button
const form = document.querySelector("form");

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    let name1 = document.querySelector("#player1").value;
    let name2 = document.querySelector("#player2").value;
    player1.setName(name1);
    player2.setName(name2);
    dialog.close();
})



//restart function
const restart = function(){
    //reset the board array
    GameBoard.restart();

    //unlock all cells
    unlockCells();

    //clear all cells
    resetCells();

    //reset global step variable
    step = 1;

    //remove result announcement
    const result = document.querySelector(".end");
    const container = document.querySelector(".container"); 
    container.removeChild(result);
}

//restart button
const restart_button = document.querySelector(".restart");
restart_button.addEventListener("click", restart);



















