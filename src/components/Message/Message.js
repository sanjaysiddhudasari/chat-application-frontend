import React, { useContext } from 'react'
import './Message.css'
import ReactEmoji from 'react-emoji';
import { ChatContext } from '../../context/ChatContext';

function Message({ message }) {

  const {name}=useContext(ChatContext)
  let isSentByCurrentUser=false;
  const trimmedName=name.trim().toLowerCase();
  const {user,text,createdAt}=message;
  const ndate=new Date(createdAt);

  if(user===trimmedName){
    isSentByCurrentUser=true;
  }

  return (
    isSentByCurrentUser?
    (
        <div className='messageContainer justifyEnd'>
            <p className='sentText pr-10'>
                {trimmedName}
            </p>
            <div className='messageBox backgroundBlue'>
                <p className='messageText colorWhite'>
                    {ReactEmoji.emojify(text)}
                </p>
                <p className='messageText colorWhite'>{ndate.toLocaleTimeString('en-US')}</p>
            </div>
        </div>
    ):
    (
         <div className='messageContainer justifyStart'>
            <div className='messageBox backgroundLight'>
                <p className='messageText colorDark'>
                    {ReactEmoji.emojify(text)}
                </p>
                <p className='messageText colorDark'>{ndate.toLocaleTimeString('en-US')}</p>
            </div>
            <p className='sentText pl-10'>
                {user}
            </p>
        </div>
    )
)
}

export default Message