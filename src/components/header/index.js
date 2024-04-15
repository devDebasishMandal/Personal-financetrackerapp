import React from 'react'
import "./styles.css";
const Header = () => {


function LogoutFun(){
    alert("logout");
}



  return (
    <div className='navbar'>
        <h3 className='logo'>CoinSavvy</h3>
        <p className='logo link' onClick={LogoutFun}>Logout</p>
    </div>
  )
}

export default Header