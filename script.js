const startPage = document.getElementById("startPage");
const gamePage = document.getElementById("gamePage");
const endPage = document.getElementById("endPage");
const play = document.getElementById("play");
const gameboard = document.getElementById("gameboard");
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
const nameSwitchButton = document.getElementById("nameSwitch");
const name1Input = document.getElementById("name1");
const name2Input = document.getElementById("name2");
const play1 = document.getElementById("p1");
const play2 = document.getElementById("p2");
const winpuck = document.getElementById("winpuck");

let currentchoice = 0;
let currentcolor = 'red';
let win = false;
let player1 = "";
let player2 = "";
let controls = "mouse";

function toggleControls(){
    if(controls === 'keyboard'){
        currentcolor = 'mouse'
    }else{
        currentcolor = 'keyboard'
    }
}

function startGame(){
    player1 = name1Input.value;
    player2 = name2Input.value;
    startPage.classList.add("hidden");
    gamePage.classList.remove("hidden");
    if(controls === 'keyboard') keyboardControls();
    if(controls === 'mouse') mouseControls();
    //create some function to toggle controls in game
    play1.innerHTML = player1;
    play2.innerHTML = player2;
}
startButton.onclick = startGame;

//for keyboard;

//for mouse - start with no puck


//controls keyboard listeners
function keyboardControls(){
play.children[0].appendChild(puckimg(currentcolor))
window.addEventListener('keydown', keyc)
}

function keyc(event){
    console.log(event);
    let p = puckimg(currentcolor);
    switch(event.key){
        case 'ArrowRight': 
        if(currentchoice === 6) return;
        play.children[currentchoice].innerHTML = "";
        currentchoice ++;
        play.children[currentchoice].appendChild(p);
        break;
        case 'ArrowLeft': 
        if(currentchoice === 0) return;
        play.children[currentchoice].innerHTML = "";
        currentchoice --;
        play.children[currentchoice].appendChild(p);
        break;
        case 'Enter':
        playerTurn(currentchoice, currentcolor);
    }
}

function mouseControls(){
    play.addEventListener('mouseover', mousec)
    play.onclick = function(){
        playerTurn(currentchoice, currentcolor);
    }
}

function mousec(event){
    let e = event.target;
    //console.log(e.id)
    if(e.id === "play" || e.id === "")return;
    //console.log(currentchoice)
    play.children[currentchoice].innerHTML = "";
    currentchoice = e.id-1;
    let p = puckimg(currentcolor);
    p.style.opacity = "0.5";
    play.children[currentchoice].appendChild(p);
    
}

function stopControls(){
    play.removeEventListener('mouseover', mousec);
    play.onclick = "";
    window.removeEventListener('keydown', keyc);
}

//switchs color of puck
function toggleColor(){
    if(currentcolor === 'red'){
        currentcolor = 'yellow'
    }else{
        currentcolor = 'red'
    }
}

//creates new puck image
function puckimg(color){
    let x = document.createElement("img");
    x.style.width = "93px";
    x.src =`images/${color}_puck.png`;
    return x;
}

//places puck in correct space and acts as a turn
function playerTurn(x, color){
    if(gameboard.children[x+35].innerHTML === ""){
        gameboard.children[x+35].appendChild(puckimg(color));
        prepNextTurn();

    }else if(gameboard.children[x+28].innerHTML === ""){
        gameboard.children[x+28].appendChild(puckimg(color));
        prepNextTurn();

    }else if(gameboard.children[x+21].innerHTML === ""){
        gameboard.children[x+21].appendChild(puckimg(color));
        prepNextTurn();

    }else if(gameboard.children[x+14].innerHTML === ""){
        gameboard.children[x+14].appendChild(puckimg(color));
        prepNextTurn();
        
    }else if(gameboard.children[x+7].innerHTML === ""){
        gameboard.children[x+7].appendChild(puckimg(color));
        prepNextTurn();

    }else if(gameboard.children[x].innerHTML === ""){
        gameboard.children[x].appendChild(puckimg(color));
        prepNextTurn();
        
    }else{
        return;
    }
   // console.log(gameboard.children[x+35].innerHTML);
}

//sets up next turn
function prepNextTurn(){
    checkWin();
    play.children[currentchoice].innerHTML = "";
    if(win === true){
        stopControls();
        endGame();
        return;
    }
    toggleColor();
    currentchoice = 0;
    play.children[currentchoice].appendChild(puckimg(currentcolor))
}

//checks board to see if anyone won
function checkWin(){
    let currentboard = [];
    for(let i = 0; i < gameboard.children.length; i++){
        if(gameboard.children[i].innerHTML === `<img src="images/${currentcolor}_puck.png" style="width: 93px;">`){
            currentboard.push(1)
        }else{
            currentboard.push(0);
        }
    }
    //rows
    let row1 = currentboard.slice(0,7);
    let row2 = currentboard.slice(7,14);
    let row3 = currentboard.slice(14,21);
    let row4 = currentboard.slice(21,28);
    let row5 = currentboard.slice(28,35);
    let row6 = currentboard.slice(35);
    //columns
    let col1 = getColumn(currentboard, 0);
    let col2 = getColumn(currentboard, 1);
    let col3 = getColumn(currentboard, 2);
    let col4 = getColumn(currentboard, 3);
    let col5 = getColumn(currentboard, 4);
    let col6 = getColumn(currentboard, 5);
    let col7 = getColumn(currentboard, 6);
    //A diagonals
    let diag1A = getDiagonal(currentboard,14,8);
    let diag2A = getDiagonal(currentboard,7,8);
    let diag3A = getDiagonal(currentboard,8,8);
    let diag4A = getDiagonal(currentboard,9,8);
    let diag5A = getDiagonal(currentboard,10,8);
    //B diagonal
    let diag1B = getDiagonal(currentboard,20,6);
    let diag2B = getDiagonal(currentboard,13,6);
    let diag3B = getDiagonal(currentboard,12,6);
    let diag4B = getDiagonal(currentboard,11,6).slice(0,5);
    let diag5B = getDiagonal(currentboard,10,6).slice(0,4);

    let winPossibilites = [];
    winPossibilites.push(row1, row2, row3, row4, row5, row6);
    winPossibilites.push(col1, col2, col3, col4, col5, col6, col7);
    winPossibilites.push(diag1A, diag2A, diag3A, diag4A, diag5A);
    winPossibilites.push(diag1B, diag2B, diag3B, diag4B, diag5B);
    //console.log(winPossibilites);

    winPossibilites.forEach(function(item){
        //console.log(item);
        let c = 0;
        for(let i = 0; i < item.length; i++){
            if(item[i] === 1){
                c++;
                if(c === 4){
                    win = true;
                    break;
                }
            }else{
                c = 0;
            }
        }

    })
}

//returns columns of board
function getColumn(a,index){
    let r = [];
    for(let i = index; i < 36+index; i+=7){
        r.push(a[i])
    }
    return r;
}

// return diagonals of board (excludes last two)
function getDiagonal(a, index, increment){
    let r = [];
    for(let i = index; i < 42; i+=increment){
        r.push(a[i])
    }
    return r;
}

//ends Game and displays winner
//need to add tie funcitions
function endGame(){
    if(win === true){
        gamePage.classList.add("hidden");
        endPage.classList.remove("hidden");
        winpuck.src = `images/${currentcolor}_puck.png`
    }
}

//restart game withe same characters
function restartGame(){
    win = false;
    endPage.classList.add("hidden");
    gamePage.classList.remove("hidden");
    clearboard();
    if(controls === 'keyboard') keyboardControls();
    if(controls === 'mouse') mouseControls();
    //create some function to toggle controls in game
    play1.innerHTML = player1;
    play2.innerHTML = player2;

}

restartButton.onclick = restartGame;

//clears board
function clearboard(){
    for(let i = 0; i < gameboard.children.length; i++){
        gameboard.children[i].innerHTML = "";
    }
}

/*
board game represented by numbers to demonstrate win conditionals
0  1  2  3  4  5  6
7  8  9  10 11 12 13
14 15 16 17 18 19 20
21 22 23 24 25 26 27
28 29 30 31 32 33 34
35 36 37 38 39 40 41

14,22,30,38
7,15,23,31,39
8,16,24,32,40
9,17,25,33,41
10,18,26,34

20,26,32,38
13,19,25,31,37
12,18,24,30,36
11,17,23,29,35
10,16,22,28

*/