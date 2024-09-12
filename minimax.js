"use strict";

let tie = false;

function isWinning(board)
{
    let isTie = true;
    for (let i = 0; i < 3; i++)
    {
        if (board[i][0] == board[i][1]
            && board[i][0] == board[i][2]
            && board[i][0] != "")
            return (true);
        if (board[0][i] == board[1][i]
            && board[0][i] == board[2][i]
            && board[0][i] != "")
            return (true);
    }
    if (board[0][0] == board[1][1]
        && board[0][0] == board[2][2]
        && board[0][0] != "")
        return (true);
    if (board[0][2] == board[1][1]
        && board[0][2] == board[2][0]
        && board[0][2] != "")
        return (true);
    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            if (board[i][j] == '')
                isTie = false;
        }
    }
    if (isTie)
    {
        tie = true;
        handleWinner();
    }
    return (false);
}

function evaluate(board)
{
    for (let i = 0; i < 3; i++)
        {
            if (board[i][0] == board[i][1]
                && board[i][0] == board[i][2]
                && board[i][0] == "X")
                return (-10);
            else if (board[i][0] == board[i][1]
                    && board[i][0] == board[i][2]
                    && board[i][0] == "O")
                    return (10);
            if (board[0][i] == board[1][i]
                && board[0][i] == board[2][i]
                && board[0][i] == "X")
                return (-10);
            else if (board[0][i] == board[1][i]
                    && board[0][i] == board[2][i]
                    && board[0][i] == "O")
                    return (10);
        }
        if (board[0][0] == board[1][1]
            && board[0][0] == board[2][2]
            && board[0][0] == "X")
            return (-10);
        else if (board[0][0] == board[1][1]
            && board[0][0] == board[2][2]
            && board[0][0] == "O")
            return (10);
        if (board[0][2] == board[1][1]
            && board[0][2] == board[2][0]
            && board[0][2] == "X")
            return (-10);
        else if (board[0][2] == board[1][1]
                && board[0][2] == board[2][0]
                && board[0][2] == "O")
                return (10);
}

function minimax(depth, isMaximizing)
{
    let score;
    let best;
    let movesLeft;
    
    movesLeft = false;
    score = evaluate(board);
    if (score == 10)
        return (score - depth);
    if (score == -10)
        return (score + depth);
    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            if (board[i][j] == "")
                movesLeft = true;
        }
    }
    if (!movesLeft)
    {
        return (0);
    }
    if (isMaximizing)
    {
        best = -1000;
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                if (board[i][j] == "")
                {
                    board[i][j] = "O";
                    best = Math.max(best, minimax(depth + 1, false));
                    board[i][j] = "";
                }
            }
        }
        return (best);
    }
    else
    {
        best = 1000;
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                if (board[i][j] == "")
                {
                    board[i][j] = "X";
                    best = Math.min(best, minimax(depth + 1, true));
                    board[i][j] = "";
                }
            }
        }
        return (best);
    }
}

function findBestMove(board)
{
    let best;
    let value;
    let bestMove = [-1, -1];

    best = -1000;
    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            if (board[i][j] == "")
            {
                board[i][j] = "O";
                value = minimax(0, false);
                board[i][j] = "";
                if (value > best)
                {
                    bestMove[0] = i;
                    bestMove[1] = j;
                    best = value;
                }
            }
        }
    }
    return (bestMove);
}

function placeAIMark(cell, list)
{
    cell.forEach(cell => {
        if (cell.getAttribute("data-row") == list[0] && cell.getAttribute("data-cell") == list[1])
        {
            cell.setAttribute("data-value", "O");
            cell.innerHTML = `<img class="icon" src="${icons[1]}">`;
        }
    })
}

function doAIMove()
{
    let move;

    move = findBestMove(board);
    if (!playerTurn && move[0] != -1 && move[1] != -1)
    {
        board[move[0]][move[1]] = "O";
        placeAIMark(cell, move);
        if (isWinning(board))
            handleWinner()
        playerTurn = true;
        switchTurn();
    }
}