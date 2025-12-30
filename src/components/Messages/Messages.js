import React, { useEffect,useRef } from 'react'
import './Messages.css'
import Message from '../Message/Message'



function Messages({ messages, name, room, isLoadingHistory, setIsLoadingHistory, socket, hasMore }) {

  const containerRef=useRef(null);
  const prevScrollHeightRef = useRef(0);
  const justPrependedRef = useRef(false);

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

  return (
    <div className='messages' ref={containerRef} style={{height:"400px",overflowY:"auto"}} onScroll={handleScroll}>
      {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
    </div>
  )
}

export default Messages