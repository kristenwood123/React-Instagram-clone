import React from 'react'
import Inst from './images/inst.JPG'

const Login = () => {
  return (
    <div className='login'>
      <h1 className='login__heading'><img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/></h1>
        <div className='img__wrapper'>
          <img src={Inst}  
          style={{width: 100, height: 100, borderRadius: 400/ 2}} alt=""/>
      <button className='login__button'>Continue as kristenn_michelle</button>
      <p>Not kristenn_michelle?<span className='login__color'> Switch accounts</span></p> </div>   
    </div>
  )
}

export default Login
