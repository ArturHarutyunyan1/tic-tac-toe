'use strict'

window.onload = () => {
    "use strict"
  
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js")
    }
}

const cell = document.querySelectorAll(".cell");
const restartBtn   = document.querySelector('.restart');
const icons        = ['./img/icon-x.svg', './img/icon-o.svg']
const turns        = ['./img/icon-x-silver.svg', './img/icon-o-silver.svg']
const outlines     = ['./img/icon-x-outline.svg', './img/icon-o-outline.svg']

let playerTurn = true;
let board =
[
    ['','',''],
    ['','',''],
    ['','','']
];
initGame();
switchTurn();
function initGame(){
    cell.forEach(cell => {
        cell.addEventListener('mouseover', showMarker)
        cell.addEventListener('mouseleave', removeMarker)
        cell.addEventListener('click', handleClick)
    })

    restartBtn.addEventListener('click', restartGame)
    modalBtn.addEventListener('click', hideModal)
}
