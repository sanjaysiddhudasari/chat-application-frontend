import React from 'react'
import './InfoBar.css'
import { Link } from 'react-router-dom'
import onlineIcon from '../../icons/onlineIcon.png'
import closeIcon from '../../icons/closeIcon.png'

function InfoBar({room}) {
  return (
    <div className='infoBar'>
        <div className='leftInnerContainer'>
            <img className='onlineIcon' src={onlineIcon} alt='online Image'/>
            <h3>{room}</h3>
        </div>
        <div className='rightInnerContainer'>
            <Link to={'/'}><img src={closeIcon} alt='closeImg'/></Link>
        </div>
    </div>
  )
}

export default InfoBar