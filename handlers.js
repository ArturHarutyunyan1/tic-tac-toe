"use strict"

const statusBar    = document.querySelector('.status-bar');
const modal        = document.querySelector('.modal');
const modalBtn     = document.querySelector('.continue');
let marker        = document.createElement('img');


function handleClick(e)
{
    let parent;
    let row;
    let col;

    parent = e.target;
    row = parent.getAttribute("data-row");
    col = parent.getAttribute("data-cell");
    if (playerTurn && parent.getAttribute("data-value") == "")
    {
        parent.innerHTML = `<img class="icon" src="${icons[0]}">`;
        parent.setAttribute("data-value", "X");
        board[row][col] = "X";
        if (isWinning(board))
            handleWinner();
        playerTurn = false;
        switchTurn();
        setTimeout(()=>{
            doAIMove();
        },200)
    }
}

function showMarker(e){
    let cell = e.currentTarget
    let icon = cell.querySelector('.icon')

    if(!cell.contains(icon)){
        if(playerTurn)
            marker.src = outlines[0]
        cell.append(marker)
    }
}

function removeMarker(e){
    let cell = e.currentTarget

    if(cell.contains(marker)){
        cell.removeChild(marker)
    }
}

function switchTurn()
{
    if (playerTurn)
        statusBar.innerHTML = 
        `
        <img src="${turns[0]}">
        <h3>TURN</h3>`
    else
        statusBar.innerHTML = 
        `
        <img src="${turns[1]}">
        <h3>TURN</h3>`
}

function restartGame(){
    playerTurn = true;
    tie = false;
    board =
    [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    cell.forEach(cell => {
        cell.innerHTML = '';
        cell.setAttribute("data-value", "");
    })
    switchTurn();
}

function handleWinner()
{
    const msg = document.querySelector('.message');
    if (!playerTurn)
    {
        modal.classList.add("active");
        msg.innerHTML = 
        `
        <img src="${icons[1]}">
        <h1 class="o_class">Takes the round!</h1>
        `
    }
    else
    {
        modal.classList.add("active");
        msg.innerHTML = 
        `
        <img src="${icons[0]}">
        <h1 class="o_class">Takes the round!</h1>
        `
    }
    if (tie)
    {
        modal.classList.add("active");
        msg.innerHTML = 
        `
        <h1 class="x_class">TIE</h1>
        `
    }
}

function hideModal(){
    if(modal.classList.contains('active')){
        modal.classList.remove('active');
        restartGame();
    }
}