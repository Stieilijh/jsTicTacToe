const NUMBEROFSQUARES =9;
const gameBoardFactory=()=>{
    const gameBoard = document.querySelector(".gameBoard");
    let gameBoardArray=[];
    const createNewGameBoard=()=>{
        
            for(let i=0;i<NUMBEROFSQUARES;i++){
            const cell = document.createElement("button");
            cell.className = "cells";
            cell.id="cell"+i;
            cell.textContent=i;
            gameBoard.appendChild(cell);
            gameBoardArray[i]=cell.textContent;
            }
    }
    return{createNewGameBoard};
}




let player1 = {name:"Player1",mark:"X"};
let player2 = {name:"Player2",mark:"O"};

const players = [player1,player2];


function change(){}

window.onload = function(){
const gameBoard = gameBoardFactory();
gameBoard.createNewGameBoard();
}