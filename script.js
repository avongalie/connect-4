//UPDATES:
//make use div for puck instead of imgs

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
const textControls = document.getElementById('textControls');
const mouseButton = document.getElementById("mouse");
const keyboardButton = document.getElementById("keyboard");
const winPlayerText = document.getElementById("winningPlayer");
const player1puckimg = document.getElementById("i1");
const player2puckimg = document.getElementById("i2");


let moves = 0;
let currentchoice = 0;
let currentcolor = 'Red';
let color1 = 'Red'
let color2 = "Yellow"
let win = false;
let tie = false;
let player1 = "";
let player2 = "";
let controls = "keyboard";


restartButton.onclick = playAgain;
nameSwitchButton.onclick = switchNames;
startButton.onclick = startGame;
mouseButton.onclick = toggleControls;
keyboardButton.onclick = toggleControls;

//switchs controls variable
function toggleControls(){
    if(controls === 'keyboard'){
        controls = 'mouse';
    }else{
        controls = 'keyboard';
    }
    textControls.innerText = `Controls: ${controls}`
}

//begins game from start page
function startGame(){
    player1 = name1Input.value.trim();
    player2 = name2Input.value.trim();
    //wont start if no name
    //if(player1 === "" || player2 === "") return;
    startPage.classList.add("hidden");
    gamePage.classList.remove("hidden");
    if(controls === 'keyboard') keyboardControls();
    if(controls === 'mouse') mouseControls();
    //toggle controls in game
    mouseButton.onclick = mouseControls;
    keyboardButton.onclick = keyboardControls;
    play1.innerHTML = player1;
    play2.innerHTML = player2;
    setPlayerPuckimg();
}

//sets icons for players
function setPlayerPuckimg(){
    let p1img = puckimg(color1);
    let p2img = puckimg(color2);
    p1img.style.width = "50px";
    p2img.style.width = "50px";
    play1.append(p1img);
    play2.append(p2img);

}

//controls keyboard listeners
function keyboardControls(){
    //play.children[currentchoice].innerHTML = "";
    controls = 'keyboard';
    //removesmouse controls
    play.removeEventListener('mouseover', mousec);
    play.onclick = "";

    //sets keyboard controls
    play.children[currentchoice].classList.add(`${currentcolor}puck`);
    window.addEventListener('keydown', keyc)
    textControls.innerText = `Controls: ${controls}`
}

//keyboard control functionality
function keyc(event){
    console.log(event);
    switch(event.key){
        case 'ArrowRight': 
        if(currentchoice === 6) return;
        play.children[currentchoice].classList.remove(`${currentcolor}puck`);
        currentchoice ++;
        play.children[currentchoice].classList.add(`${currentcolor}puck`);
        break;
        case 'ArrowLeft': 
        if(currentchoice === 0) return;
        play.children[currentchoice].classList.remove(`${currentcolor}puck`);
        currentchoice --;
        play.children[currentchoice].classList.add(`${currentcolor}puck`);
        break;
        case 'Enter':
        playerTurn(currentchoice, currentcolor);
    }
}

//controls mouse listeners
function mouseControls(){
    //play.children[currentchoice].innerHTML = "";
    controls = 'mouse';
    //removes keyboard controls
    window.removeEventListener('keydown', keyc);
    //sets mouse controls
    play.addEventListener('mouseover', mousec)
    play.onclick = function(){
        playerTurn(currentchoice, currentcolor);
    }
    textControls.innerText = `Controls: ${controls}`;
}

//mouse control functionality
function mousec(event){
    let e = event.target;
    if(e.id === "play" || e.id === "")return;
    play.children[currentchoice].className = "";
    currentchoice = e.id-1;
    let p = puckimg(currentcolor);
    p.style.opacity = "0.5";
    play.children[currentchoice].classList.add(`${currentcolor}puck`)
    play.children[currentchoice].style.opacity = "0.5";
    
}

//stops mosue and keyboard listeners
function stopControls(){
    play.removeEventListener('mouseover', mousec);
    play.onclick = "";
    window.removeEventListener('keydown', keyc);
}

//switchs color of puck
function toggleColor(){
    if(currentcolor === color1){
        currentcolor = color2
    }else{
        currentcolor = color1
    }
}

//creates new puck image (now only used in player icons + end screen)
function puckimg(color){
    let x = document.createElement("img");
    x.style.width = "93px";
    x.src =`images/${color}_puck.png`;
    return x;
}


//places puck in correct space and acts as a turn
function playerTurn(x, color){
    if(gameboard.children[x+35].classList[0] === "empty"){
        //gameboard.children[x+35].appendChild(puckimg(color));
        gameboard.children[x+35].classList.remove("empty");
        gameboard.children[x+35].classList.add(`${currentcolor}filled`)
        prepNextTurn();

    }else if(gameboard.children[x+28].classList[0] === "empty"){
        gameboard.children[x+28].classList.remove("empty");
        gameboard.children[x+28].classList.add(`${currentcolor}filled`)
        prepNextTurn();

    }else if(gameboard.children[x+21].classList[0] === "empty"){
        gameboard.children[x+21].classList.remove("empty");
        gameboard.children[x+21].classList.add(`${currentcolor}filled`)
        prepNextTurn();

    }else if(gameboard.children[x+14].classList[0] === "empty"){
        gameboard.children[x+14].classList.remove("empty");
        gameboard.children[x+14].classList.add(`${currentcolor}filled`)
        prepNextTurn();
        
    }else if(gameboard.children[x+7].classList[0] === "empty"){
        gameboard.children[x+7].classList.remove("empty");
        gameboard.children[x+7].classList.add(`${currentcolor}filled`)
        prepNextTurn();

    }else if(gameboard.children[x].classList[0] === "empty"){
        gameboard.children[x].classList.remove("empty");
        gameboard.children[x].classList.add(`${currentcolor}filled`)
        prepNextTurn();
        
    }else{
        return;
    }
}

//sets up next turn
function prepNextTurn(){
    moves++;
    if(moves > 6) checkWin();
    play.children[currentchoice].classList.remove(`${currentcolor}puck`);
    if(win === true||tie === true){
        stopControls();
        endGame();
        return;
    }
    toggleColor();
    //currentchoice = 0;
    play.children[currentchoice].classList.add(`${currentcolor}puck`);
}

//checks board to see if anyone won
function checkWin(){
    let currentboard = [];
    for(let i = 0; i < gameboard.children.length; i++){
        if(gameboard.children[i].className === `${currentcolor}filled`){
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
    if(moves === 42) tie = true;
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
function endGame(){
    gamePage.classList.add("hidden");
    endPage.classList.remove("hidden");
    if(win === true){
        winPlayerText.innerHTML = `${currentcolor} Won!`
        winpuck.src = `images/${currentcolor}_puck.png`
    }
    if(tie === true){
        winPlayerText.innerHTML = "Tie!"
        winpuck.src = "";
    }
}

//restart game
function restartGame(){
    moves = 0;
    tie = false;
    win = false;
    clearboard();
    endPage.classList.add("hidden");  
}

//enables play again function
function playAgain(){
    restartGame();
    gamePage.classList.remove("hidden");
    if(controls === 'keyboard') keyboardControls();
    if(controls === 'mouse') mouseControls();
    
}

//allows players to switch names before replaying
function switchNames(){
    restartGame();
    startPage.classList.remove("hidden");
    name1Input.value = "";
    name2Input.value = "";
}

//clears board
function clearboard(){
    for(let i = 0; i < gameboard.children.length; i++){
        gameboard.children[i].className = "";
        gameboard.children[i].classList.add("empty");
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