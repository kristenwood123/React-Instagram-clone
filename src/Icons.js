import React from 'react'
import homeIcon from './images/home.jpg.png'
import messengerIcon from './images/messenger.png'
import heartIcon from './images/heart.png'
import locationIcon from './images/location.png'
import './Icons.css'

function Icons() {
  return (
    <div className ='icons'>
      <img className='icons__home' src={homeIcon} alt="home icon"/>
      <img className='icons__messenger' src={messengerIcon} alt="home icon"/>
      <img className='icons__location' src={locationIcon} alt="home icon"/>
      <img className='icons__heart' src={heartIcon} alt="home icon"/>
    </div>
  )
}

export default Icons
