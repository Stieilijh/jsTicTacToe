const NUMBEROFSQUARES =9;
let playerOneTurn =true;

const Player =(name,playerNumber)=>{
    const getPlayerChar =()=>{
        if(playerNumber==1){
            return "X";
        }else if(playerNumber==2){
            return "O";
        }else{
            throw new Error(" Invalid playerNumber is "+playerNumber);
        }
    }
    return {name,getPlayerChar};
}

window.onload = function(){
//gameBoard Module

const gameBoardModule=(()=>{
    const gameBoard = document.querySelector(".gameBoard");
    let player1,player2;
    const setPlayers = (name1="",name2="")=>{
        player1= Player(name1,1);
        player2= Player(name2,2);
    }
    let gameBoardArray=[];
    const createNewGameBoard=()=>{
        gameBoard.innerHTML="";
        for(let i=0;i<NUMBEROFSQUARES;i++){
        const cell = document.createElement("button");
        cell.className = "cells";
        cell.id="cell"+i;
        cell.addEventListener("click",addListnerToCell);
        gameBoard.appendChild(cell);
        gameBoardArray[i]=cell.textContent;
        }
    }
    const addListnerToCell=(event)=>{
        const index=event.target.id[4];
        if(playerOneTurn){
            gameBoardArray[index]=player1.getPlayerChar();
        }else{
            gameBoardArray[index]=player2.getPlayerChar();
        }
        playerOneTurn=!playerOneTurn;
        setDisplay();
    }
    const setDisplay=()=>{
        const cells =document.querySelectorAll(".cells");
        for(let i=0;i<NUMBEROFSQUARES;i++){
            cells[i].textContent=gameBoardArray[i];
        }
    }
    const getCell=(pos=9)=>{
        return (-1<pos&&pos<9)?
        gameBoardArray[pos]:"Pos Not In Range";
    }
    const setCell= (pos=0,char="O")=>{
        gameBoardArray[pos]=char;
        setDisplay();
    }
    const getGameBoard=()=>{
        return gameBoardArray;
    }
    return{setPlayers,createNewGameBoard, getCell,setCell,getGameBoard};
})();
//
gameBoardModule.createNewGameBoard();
gameBoardModule.setPlayers("Jeff","Elon");
//Restart button
const restartbtn=document.querySelector("#restart");
restartbtn.addEventListener("click",()=>{
    gameBoardModule.createNewGameBoard();
});
}