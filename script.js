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

//function to display gameboard and make the form dissapear
function displayGame(){
    document.querySelector(".gameBoard").style.display="grid";
    document.querySelector("#optionButtons").style.display="block";
    document.querySelector(".setName").style.display="none";
}

window.onload = function(){
let player1Name,player2Name;
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
    const getPlayer=(num=1)=>{
        if(num==1){
            return player1;
        }else if(num==2){
            return player2;
        }else{
            throw new Error("Player-"+num+" Doesn't exist");
        }
    }
    return{getPlayer,setPlayers,createNewGameBoard, getCell,setCell,getGameBoard};
})();
//set name form on submit method
document.querySelector("#setNameForm").addEventListener("submit",(event)=>{
    event.preventDefault();
    player1Name=document.querySelector("#player1Name").value;
    player2Name=document.querySelector("#player2Name").value;
    gameBoardModule.setPlayers(player1Name,player2Name);
    displayGame();
    gameBoardModule.createNewGameBoard();
    document.querySelector("#setNameForm").reset();
});
//reset names button
document.querySelector("#resetNames").addEventListener("click",()=>{
    document.querySelector(".gameBoard").style.display="none";
    document.querySelector("#optionButtons").style.display="none";
    document.querySelector(".setName").style.display="block";
});

//Restart button
document.querySelector("#restart").addEventListener("click",()=>{
    gameBoardModule.createNewGameBoard();
    playerOneTurn=true;
});
//Events 
document.querySelector(".gameBoard").style.display="none";
document.querySelector("#optionButtons").style.display="none";
}