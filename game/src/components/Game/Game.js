import React from 'react'
import { useState } from 'react'
import Board from '../Board/Board'
import './Game.scss'


const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

//Check if player is win
const checkWin = (board) => {
    for(let i = 0; i <winCondition.length;++i){
        let [a,b,c] = winCondition[i]
        if(board[a] && board[a] === board[b] && board[c] === board[b]){
            return true
        }
    }
    return false
}
//Check if player is draw
const checkDraw = (board) => {
    for(let i = 0; i < 9;++i){
        if(!board[i]){
            return false
        }
    }
    return true
}

const computerMove = (board, player) => {
    let randomPos = Math.floor(Math.random() * 9);   
    while(board[randomPos]){
        randomPos = Math.floor(Math.random() * 9);
    }
    return randomPos
}

const Game = () => {
    const [numHumWin,setNumHumWin] = useState(0)
    const [numComWin,setNumComWin] = useState(0)
    const [numDraw,setNumDraw] = useState(0)


    const [board,setBoard] = useState(Array(9).fill(''))
    const [isGameStop, setIsGameStop] = useState(false)
    const player = {
        human : 'X',
        computer: 'O'
    }
    const handleMove = (pos) => {
        //if position has move of the player or if game is done
        if(board[pos] || isGameStop){
            return
        }
        const boardCopy = [...board]
        boardCopy[pos] = player.human 
        setBoard(boardCopy)

        if(checkWin(boardCopy)){
            let win = numHumWin + 1
            setNumHumWin(win)
            setIsGameStop(true)
            return
        }

        if(checkDraw(boardCopy)){
            let draw = numDraw + 1
            setNumDraw(draw)
            setIsGameStop(true)
            return
        }

        //computer move
        setTimeout(() => {
            const comMove = computerMove(boardCopy,player)
            const boardCopy2 = [...boardCopy]
            boardCopy2[comMove] = player.computer
            setBoard(boardCopy2)

            if(checkWin(boardCopy2)){
                let loss = numComWin + 1
                setNumComWin(loss)
                setIsGameStop(true)
                return
            }
    
            if(checkDraw(boardCopy2)){
                setIsGameStop(true)
                return
            }
        },1000)
    }

    const playAgain = () => {
        setBoard(Array(9).fill(''))
        setIsGameStop(false)
    }

  return (
    <div>
        <div className='game_name'> TIC TAC TOE</div>
        <Board value={board} onClick={handleMove}/>
        <div className='score'>
            <div className='human_score'> Human : {numHumWin} |</div>
            <div className='draw_score'> Draw : {numDraw} |</div>
            <div className='computer_score'> Computer : {numComWin}</div>
            <button className='play_again' onClick={playAgain}> Play again </button>
        </div>
    </div>
  )
}

export default Game