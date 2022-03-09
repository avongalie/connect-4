const play = document.getElementById("play");
const gameboard = document.getElementById("gameboard");

let currentchoice = 0;
let currentcolor = 'red';


//for keyboard;
play.children[0].appendChild(puckimg(currentcolor))

//for mouse - start with no puck


//controls keyboard listeners
function keyboardControls(){
window.addEventListener('keydown', function(event){
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
})
}

function mouseControls(){
    play.addEventListener('mouseover', function(event){
        let e = event.target;
        //console.log(e.id)
        if(e.id === "play" || e.id === "")return;
        //console.log(currentchoice)
        play.children[currentchoice].innerHTML = "";
        currentchoice = e.id-1;
        let p = puckimg(currentcolor);
        p.style.opacity = "0.5";
        play.children[currentchoice].appendChild(p);
        
    })
    play.onclick = function(){
        playerTurn(currentchoice, currentcolor);
    }
}

mouseControls();

//switchs color of puck
function toggleColor(){
    if(currentcolor === 'red'){
        currentcolor = 'yellow'
    }else{
        currentcolor = 'red'
    }
}

0
7
14
21
28
35

//creates new puck image
function puckimg(color){
    let x = document.createElement("img");
    x.style.width = "93px";
    switch(color){
        case 'red':
            x.src ="images/red_puck.png";
            return x;
            break;
        case 'yellow':
            x.src ="images/yellow_puck.png";
            return x;
    }
}

//places puck in correct space
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
    toggleColor();
    play.children[currentchoice].innerHTML = "";
    currentchoice = 0;
    play.children[currentchoice].appendChild(puckimg(currentcolor))
}




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
                    console.log("Winner")
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