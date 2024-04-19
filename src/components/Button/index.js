import React from 'react'
import './styles.css'




const Button = ({text,onClick,blue,disabled}) => {
  return (
    <div onClick={onClick} disabled={disabled}
     className={blue ? "btn btn-blue":"btn"}>{text}</div>
  )
}

export default Button;

