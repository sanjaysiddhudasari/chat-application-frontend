import React,{useContext} from 'react'
import './InfoBar.css'
import { Link } from 'react-router-dom'
import onlineIcon from '../../icons/onlineIcon.png'
import closeIcon from '../../icons/closeIcon.png'
import { ChatContext } from '../../context/ChatContext'

function InfoBar() {
  const { room} = useContext(ChatContext)
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