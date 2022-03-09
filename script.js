const play = document.getElementById("play");
const gameboard = document.getElementById("gameboard");

// console.log(play.children[0])
// console.log(gameboard)

let currentchoice = 0;
let currentcolor = 'red';

// play.onclick = function(event){
//     play.children[currentchoice].innerHTML = "";
//     let targete = event.target
//     console.log(targete.id)
//     let x = document.createElement("img");
//     x.src ="images/red_puck.png";
//     x.style.width = "93px";
//     currentchoice = targete.id-1;
//     targete.appendChild(x);
// }

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
        console.log(e.id)
        if(e.id === "play" || e.id === "")return;
        console.log(currentchoice)
        play.children[currentchoice].innerHTML = "";
        //console.log(e);
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
        toggleColor();
        play.children[currentchoice].innerHTML = "";
        currentchoice = 0;
        play.children[currentchoice].appendChild(puckimg(currentcolor))

    }else if(gameboard.children[x+28].innerHTML === ""){
        gameboard.children[x+28].appendChild(puckimg(color));
        toggleColor();
        play.children[currentchoice].innerHTML = "";
        currentchoice = 0;
        play.children[currentchoice].appendChild(puckimg(currentcolor))

    }else if(gameboard.children[x+21].innerHTML === ""){
        gameboard.children[x+21].appendChild(puckimg(color));
        toggleColor();
        play.children[currentchoice].innerHTML = "";
        currentchoice = 0;
        play.children[currentchoice].appendChild(puckimg(currentcolor))

    }else if(gameboard.children[x+14].innerHTML === ""){
        gameboard.children[x+14].appendChild(puckimg(color));
        toggleColor();
        play.children[currentchoice].innerHTML = "";
        currentchoice = 0;
        play.children[currentchoice].appendChild(puckimg(currentcolor))

    }else if(gameboard.children[x+7].innerHTML === ""){
        gameboard.children[x+7].appendChild(puckimg(color));
        toggleColor();
        play.children[currentchoice].innerHTML = "";
        currentchoice = 0;
        play.children[currentchoice].appendChild(puckimg(currentcolor))

    }else if(gameboard.children[x].innerHTML === ""){
        gameboard.children[x].appendChild(puckimg(color));
        toggleColor();
        play.children[currentchoice].innerHTML = "";
        currentchoice = 0;
        play.children[currentchoice].appendChild(puckimg(currentcolor))
        
    }else{
        return;
    }
    console.log(gameboard.children[x+35].innerHTML);
}

// let currentboard = [];
// for(let i = 0; i < gameboard.children.length; i++){
//     if(gameboard.children[i].innerHTML = ""){
//         currentboard.push(0);
//     }else if()
// }