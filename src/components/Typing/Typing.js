import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext';

function Typing({typingUsers}) {
    const {name,room}=useContext(ChatContext)
    const usersInRoom = typingUsers.filter(
    (user) => user.room === room&&user.name!==name
  );
  if (usersInRoom.length === 0) return null;

  const names = usersInRoom.map((user) => user.name);

  let text = "";
  if (names.length === 1) {
    text = `${names[0]} is typing...`;
  } else if (names.length === 2) {
    text = `${names[0]} and ${names[1]} are typing...`;
  } else {
    text = `${names[0]}, ${names[1]} and ${
      names.length - 2
    } others are typing...`;
  };
  return (
    <p>{text}</p>
  )
}

export default Typing