import React from 'react'

export default function Die(props) {
    return (
        <div 
            className={props.isHeld ? 'die selected' : 'die'} 
            onClick={props.handleClick}>
                {props.value}
        </div>
    )
}
