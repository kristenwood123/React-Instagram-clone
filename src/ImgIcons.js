import React from 'react'
import bookmark from './images/bookmark.png'
import heart from './images/heart.png'
import letter from './images/letter.png'
import speech from './images/speech.png'
import './ImgIcons.css'

function ImgIcons() {
  return (
    <div className="imgicons">
      <img src={heart} alt="heart"/>
      <img src={speech} alt="speech"/>
      <img src={letter} alt="letter"/> 
      <div className='bookmark__container'>
        <img className='imgicons__bookmark' src={bookmark} alt="bookmark"/>
      </div>
        
      
    </div>
  )
}

export default ImgIcons
