import React from 'react'
import './styles.css'




const Button = ({text,onClick,blue}) => {
  return (
    <div onClick={onClick} className={blue ? "btn btn-blue":"btn"}>{text}</div>
  )
}

export default Button;

