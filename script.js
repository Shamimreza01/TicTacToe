
let boxes=document.querySelectorAll(".box"); //get access to the all boxes
let showResult=document.querySelector(".winnerResult"); //get access to the result printing div
let newGamebutton=document.querySelector("#newGame-btn"); // access to the new gane button 
let resetGamebutton=document.querySelector("#reset-btn"); //access to the reset game button
let submit=document.querySelector(".submit"); // name submit button access
let playerNameX="playerX";   // default set player1 name as playerX
let playerNameY="playerY"; // default set player2 name as playerY
let scoreX=0; //at first the score is zero
let scoreY=0; //at first the sore of the playerY is zero
submit.addEventListener('click',()=>{       // make functionality for the submit button 
     playerNameX=document.querySelector("#getNameX").value;  // get and set player name 
     playerNameY=document.querySelector("#getNameY").value;
     document.querySelector("#playerNameX").textContent=playerNameX; // display the player name
     document.querySelector("#playerNameY").textContent=playerNameY;
     document.querySelector(".playerNameInput").classList.add("hide"); //hide the input box
     document.querySelector(".playerName").classList.remove("hide"); //show the player name box 
     document.querySelector(".point").classList.remove("hide");
    
})

let playerX=true;  // first the turn is playerX
let winResult="";  //first no one is the winner
let isComplete=false;  //to track when the game is complete 
let winingPattern=[   // the possible winning pattern
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box)=>{    // clickable all the boxes and set the value for playeX or playerY 
    box.addEventListener('click',()=>{
        if(playerX){
            box.textContent="X";
            playerX=false;
            box.classList.add("playerX");
        }else{
            box.textContent="O";
            playerX=true;
            box.classList.add("playerY");
       }
       box.disabled=true;
       checkWinner(); // every time check the winning result 
       if(isComplete){
        boxes.forEach((box)=>{
            box.disabled=true;
        })
       }
    })
 
});


const checkWinner=()=>{  // the function for check the winning pattern 
    for(let pattern of winingPattern){
        if(boxes[pattern[0]].textContent==='X' && boxes[pattern[1]].textContent==='X' && boxes[pattern[2]].textContent==='X'){
           winResult=playerNameX;
           isComplete=true;
           scoreX++;
        }else if(boxes[pattern[0]].textContent==='O' && boxes[pattern[1]].textContent==='O' && boxes[pattern[2]].textContent==='O'){
         winResult=playerNameY;
         isComplete=true;
         scoreY++;
        }
    }
    winner(); // to print the winner 
}

let winner=()=>{
   
   if(winResult===""){
    showResult.textContent=`No one is winner, the game is draw`;
   }else{
    showResult.classList.remove("hide");
   showResult.textContent=`the winner is ${winResult}`
   document.querySelector("#pointPlayerX").textContent=scoreX;
   document.querySelector("#pointPlayerY").textContent=scoreY;
   }
}

let newGame=()=>{  // functionility of new game button 
    boxes.forEach((box)=>{ // if one click the newgame button then it enable all the boxes and set empty value for the boxes
        if(box.textContent==="X"){
            box.classList.remove("playerX");
        }else if(box.textContent==="O"){
            box.classList.remove("playerY");
        }
        box.textContent="";
        box.disabled=false;
        isComplete=false;
        winResult="";
        scoreX=0;
        scoreY=0;
        document.querySelector("#pointPlayerX").textContent=scoreX;
        document.querySelector("#pointPlayerY").textContent=scoreY;
        showResult.classList.add("hide");
    })
}

let resetGame=()=>{ //functionility for the resetGame button , it only change the present game don't affect the total score 
    boxes.forEach((box)=>{
        if(box.textContent==="X"){
            box.classList.remove("playerX");
        }else if(box.textContent==="O"){
            box.classList.remove("playerY");
        }
        box.textContent="";
        box.disabled=false;
        isComplete=false;
        winResult="";
        showResult.classList.add("hide");
    })
}

newGamebutton.addEventListener('click',newGame);      
resetGamebutton.addEventListener('click',resetGame);