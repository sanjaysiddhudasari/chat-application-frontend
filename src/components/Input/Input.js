import React from 'react'
import './Input.css';

function Input({message,setMessage,sendMessage,socket,room,name}) {
  return (
   <form className='form'>
        <input
            className='input'
            type='text'
            placeholder='type a message'
            value={message}
            onChange={(e)=>{
              setMessage(e.target.value);
              socket.emit('typing:start',{room,name});
            }}
            onKeyDown={e=>e.key==='Enter'?sendMessage(e):null}
        />
        <button className='sendButton' onClick={(event)=>sendMessage(event)}>Send</button>
   </form>
  )
}
{/* <input value={message} onChange={(e) => setMessage(e.target.value)}
          onKeyDown={e=>e.key==='Enter'?sendMessage(e):null}
        /> */}
export default Input