import React from 'react'
import * as classes from './Input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps>= (props) => {
    return (
        <input className={classes.Input} {...props}>

        </input>
    )
}

export default Input