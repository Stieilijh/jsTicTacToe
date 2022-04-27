const NUMBEROFSQUARES =9;
let playerOneTurn =true;

const Player =(name,playerNumber)=>{
    const player1char = "X";
    const player2char = "O";
    const getPlayerChar =()=>{
        if(playerNumber==1){
            return player1char;
        }else if(playerNumber==2){
            return player2char;
        }else{
            throw new Error(" Invalid playerNumber is "+playerNumber);
        }
    }
    return {name,getPlayerChar};
}

//get player number from the symbol
function getPlayerNumber(char="X"){
    if(char==="X")return 1 ;
    else if(char ==="O") return 2;
    else throw new Error("PlayerNumber for this char"+char +" does not exist");
}

//function to display gameboard and make the form dissapear
function displayGame(){
    document.querySelector(".gameScreen").style.display="flex";
    document.querySelector(".setName").style.display="none";
}

window.onload = function(){
let player1Name,player2Name;
//gameBoard Module

const gameBoardModule=(()=>{
    const gameBoard = document.querySelector(".gameBoard");
    let player1,player2;
    const setPlayers = (name1="",name2="")=>{
        player1= Player(name1.toUpperCase(),1);
        player2= Player(name2.toUpperCase(),2);
    }
    let gameBoardArray=[];
    const createNewGameBoard=()=>{
        playerOneTurn=true;
        document.querySelector("#victoryText").
        textContent="";
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
        if(gameBoardArray[index]===""){
        if(playerOneTurn){
            gameBoardArray[index]=player1.getPlayerChar();
        }else{
            gameBoardArray[index]=player2.getPlayerChar();
        }
        setDisplay();
        if(checkWinner(gameBoardArray)!==false){
            if(checkWinner(gameBoardArray)==="tie"){
                document.querySelector("#victoryText").
                textContent="Match tied";
            }else{
            document.querySelector("#victoryText").
            textContent=getPlayer(checkWinner(gameBoardArray)).name+" Wins";
            }
            const cells =document.querySelectorAll(".cells");
            cells.forEach((cell)=>{
                let new_element = cell.cloneNode(true);
                cell.parentNode.replaceChild(new_element, cell);
            });
        };
        playerOneTurn=!playerOneTurn;
    }
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
    displayHeaderText();
    gameBoardModule.createNewGameBoard();
    document.querySelector("#setNameForm").reset();
});
//function that displays/changes the headertext of gameBoard
function displayHeaderText(){
    const headerText = document.querySelector("#headerText");
    headerText.textContent=player1Name+"  VS  "+player2Name;
}
//checks if a person has won the match
function checkWinner(gameBoard=[]){
    
    if(!gameBoard.length===9){
        throw new Error("Length of gameboard not 9");
    }
    //column wise
    for(let i =0;i<gameBoard.length;i+=3){
        if(gameBoard[i]===gameBoard[i+1]&&
            gameBoard[i+2]===gameBoard[i]&&
            gameBoard[i]!=="")return getPlayerNumber(gameBoard[i]);
            
    }
    //row wise
    for(let i=0;i<3;i++){
        if(gameBoard[i]===gameBoard[i+3]&&
            gameBoard[i+6]===gameBoard[i]&&
            gameBoard[i]!=="") return getPlayerNumber(gameBoard[i]);
            
    }
    //diagonally
    if(gameBoard[0]===gameBoard[4]&&gameBoard[8]===gameBoard[0]
        &&gameBoard[0]!=="")return getPlayerNumber(gameBoard[0]);
    if(gameBoard[2]===gameBoard[4]&&gameBoard[6]===gameBoard[2]
        &&gameBoard[2]!=="")return getPlayerNumber(gameBoard[4]);
    //check for tie    
    let count=0;
    for(let cell in gameBoard){
        if(gameBoard[cell]!=="")count++;
    }
    if(count===9)return "tie";
    
    return  false;
    }
//Reset names button
document.querySelector("#resetNames").addEventListener("click",()=>{
    document.querySelector(".gameScreen").style.display="none";
    document.querySelector(".setName").style.display="block";
});

//Restart button
document.querySelector("#restart").addEventListener("click",()=>{
    gameBoardModule.createNewGameBoard();
});
//Events 
document.querySelector(".gameScreen").style.display="none";


}

//minimax algorithm for the difficult cpu
