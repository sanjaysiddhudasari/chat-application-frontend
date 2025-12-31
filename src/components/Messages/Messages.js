import React, { useEffect,useRef, useState } from 'react'
import './Messages.css'
import Message from '../Message/Message'
import downIcon from '../../icons/arrow-down-solid-full.svg'



function Messages({ messages, name, room, isLoadingHistory, setIsLoadingHistory, socket, hasMore }) {

  const containerRef=useRef(null);
  const prevScrollHeightRef = useRef(0);
  const justPrependedRef = useRef(false);
  const [isShowDown,setIsShowDown]=useState(false);

  //load more messages
  const handleScroll=()=>{
    const el=containerRef.current;
    if(!el||messages.length===0)return;
    if(el.scrollTop<=10&&!isLoadingHistory&&hasMore){
      setIsLoadingHistory(true);
      justPrependedRef.current=true;  
      prevScrollHeightRef.current=el.scrollHeight;
      socket.emit('loadMoreMessages',{room,cursor:messages[0].createdAt});
    }
    const threshold = 40;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setIsShowDown(distanceFromBottom > threshold);
  }

  //auto scrolling feature
  useEffect(()=>{
    const el=containerRef.current;
    if(!el)return;
    if(justPrependedRef.current){
      const diff=el.scrollHeight-prevScrollHeightRef.current;
      el.scrollTop=diff;
      justPrependedRef.current=false;
    }else{
      el.scrollTop=el.scrollHeight;
    }
  },[messages]);

  const handleClick=()=>{
    const el=containerRef.current;
    if(!el)return ;
    el.scrollTo({top:el.scrollHeight,behavior:'smooth'})
  }

  return (
    <div className='messages' ref={containerRef} onScroll={handleScroll}>
      {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
      {isShowDown&&(<button className='scrollDownBtn' onClick={handleClick}> <img src={downIcon}/> </button> )}   
    </div>
  )
}

export default Messages