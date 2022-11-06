import React from 'react'
import './Box.scss'
const Box = (props) => {
  return (
    <button className='Box' onClick={() =>  props.onClick(props.index)}>
        {props.value}
    </button>
  )
}

export default Box