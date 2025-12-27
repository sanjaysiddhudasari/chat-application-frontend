import React, { useEffect } from 'react'
import ScrollToBottom, { useSticky, useAtTop } from 'react-scroll-to-bottom'
import './Messages.css'
import Message from '../Message/Message'



function Messages({ messages, name, room, isLoadingHistory, setIsLoadingHistory, socket, hasMore }) {

  const atTop = useAtTop();
  const [sticky]=useSticky();
  useEffect(() => {
    if(sticky)return;
    if (atTop && !isLoadingHistory &&
      hasMore &&
      messages.length > 0) {
      setIsLoadingHistory(true);
      const oldestMessage = messages[0];
      socket.emit('loadMoreMessages', { room: room, cursor: oldestMessage.createdAt });
    }
  }, [atTop,sticky]);
  return (
    <ScrollToBottom className='messages' mode={isLoadingHistory ? 'top' : 'bottom'}>
      {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
    </ScrollToBottom>
  )
}

export default Messages