import React from 'react'
import homeIcon from './images/home.png'
import messengerIcon from './images/messenger.png'
import heartIcon from './images/heart.png'
import compassIcon from './images/compass.png'
import './Icons.css'

function Icons() {
  return (
    <div className ='icons'>
      <img className='icons__home' src={homeIcon} alt="home icon"/>
      <img className='icons__messenger' src={messengerIcon} alt="home icon"/>
      <img className='icons__compass' src={compassIcon} alt="home icon"/>
      <img className='icons__heart' src={heartIcon} alt="home icon"/>
    </div>
  )
}

export default Icons
