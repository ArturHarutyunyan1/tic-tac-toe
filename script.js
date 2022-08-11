window.onload = () => {
    "use strict"
  
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js")
    }
}

const cells        = document.querySelectorAll('.cell')
const statusBar    = document.querySelector('.status-bar')
const restartBtn   = document.querySelector('.restart')
const modal        = document.querySelector('.modal')
const msg          = document.querySelector('.message')
const modalBtn     = document.querySelector('.continue')
const x_score      = document.querySelector('.x-score')
const o_score      = document.querySelector('.o-score')
const ties         = document.querySelector('.ties')
const icons        = ['./img/icon-x.svg', './img/icon-o.svg']
const turns        = ['./img/icon-x-silver.svg', './img/icon-o-silver.svg']
const outlines     = ['./img/icon-x-outline.svg', './img/icon-o-outline.svg']

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let board         = ['', '', '', '', '', '', '', '', '']
let currentPlayer = 'X'
let isRunning     = false
let x             = 0
let o             = 0
let tie           = 0
let marker        = document.createElement('img')


initGame()

function initGame(){
    cells.forEach(cell => {
        cell.addEventListener('mouseover', showMarker)
        cell.addEventListener('mouseleave', removeMarker)
        cell.addEventListener('click', cellClick)
    })

    restartBtn.addEventListener('click', restartGame)
    modalBtn.addEventListener('click', hideModal)

    isRunning = true

}

function showMarker(e){
    let cell = e.currentTarget
    let icon = cell.querySelector('.icon')

    if(!cell.contains(icon)){
        if(currentPlayer == 'X'){
            marker.src = outlines[0]
        }else if(currentPlayer == 'O'){
            marker.src = outlines[1]
        }
        cell.append(marker)
    }
}

function removeMarker(e){
    let cell = e.currentTarget

    if(cell.contains(marker)){
        cell.removeChild(marker)
    }
}

function cellClick(){
    const index = this.getAttribute('data-cell')

    if(board[index] != '' || !isRunning){
        return
    }
    if(currentPlayer == 'O'){
        statusBar.innerHTML = 
        `
        <img src="${turns[0]}">
        <h3>TURN</h3>
        `
    }
    if(currentPlayer == 'X'){
        statusBar.innerHTML = 
        `
        <img src="${turns[1]}">
        <h3>TURN</h3>
        `
    }

    placeMarker(this, index)
    checkWinner()
}

function placeMarker(cell, index){
    board[index] = currentPlayer
    if(currentPlayer == 'X'){
        cell.innerHTML = `<img class="icon" src="${icons[0]}">`
    }else if(currentPlayer == 'O'){
        cell.innerHTML = `<img class="icon" src="${icons[1]}">`
    }
}

function changePlayer(){
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X' 
}

function checkWinner(){
    let roundWon = false

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i]

        const cellA = board[condition[0]]
        const cellB = board[condition[1]]
        const cellC = board[condition[2]]

        if(cellA == '' || cellB == '' || cellC == ''){
            continue
        }

        if(cellA == cellB && cellB == cellC){
            roundWon = true
            break
        }
    }

    if(roundWon){
        modal.classList.add('active')
        if(currentPlayer == 'X'){
            update_X_score(1)
            msg.innerHTML = 
            `
            <img src="${icons[0]}">
            <h1 class="x_class">Takes the round!</h1>
            `
        }else if(currentPlayer == 'O'){
            update_O_score(1)
            msg.innerHTML = 
            `
            <img src="${icons[1]}">
            <h1 class="o_class">Takes the round!</h1>
            `
        }
        isRunning = false
    }else if(!board.includes('')){
        update_Tie_score(1)
        
        modal.classList.add('active')
        
        msg.innerHTML = 
        `
        <h1 class="tie_class">Tie!</h1>
        `
        
        isRunning = false
    }else{
        changePlayer()
    }
}

function restartGame(){
    currentPlayer = 'X'
    board = ['', '', '', '', '', '', '', '', '']
    cells.forEach(cell => {
        cell.innerHTML = ''
    })
    statusBar.innerHTML = 
    `
    <img src="${turns[0]}">
    <h3>TURN</h3>
    `
    isRunning = true
}

function hideModal(){
    if(modal.classList.contains('active')){
        modal.classList.remove('active')
    }
}

function update_X_score(){
    x += 1
    x_score.innerHTML = x
    localStorage.setItem('x-score', x)
}

function update_O_score(){
    o += 1
    o_score.innerHTML = o
    localStorage.setItem('o-score', o)
}

function update_Tie_score(){
    tie += 1
    ties.innerHTML = x
    localStorage.setItem('ties', tie)
}

let xValue = localStorage.getItem('x-score', x)
let oValue = localStorage.getItem('o-score', o)
let tieValue = localStorage.getItem('ties', tie)

if(xValue){
    x_score.innerHTML = x = JSON.parse(localStorage.getItem('x-score', x))
}
if(oValue){ 
    o_score.innerHTML = o = JSON.parse(localStorage.getItem('o-score', o))
}
if(tieValue){
    ties.innerHTML = tie = JSON.parse(localStorage.getItem('ties', tie))
}