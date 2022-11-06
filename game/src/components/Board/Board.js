import React from 'react'
import Box from '../Box/Box'
import './Board.scss'

const Board = (props) => {
  return (
    <div className='Board'>
        {
          //map an array of 9 Box to make board
          [...Array(9)].map((_,index) => 
            <Box key={index} onClick={props.onClick} value={props.value[index]} index={index} />
          )
        }
        
    </div>
  )
}

export default Board