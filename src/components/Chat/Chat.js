import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import { useLocation } from "react-router-dom";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
let socket;

function Chat() {
  const location = useLocation();
  const [name, setName] = useState();
  const [room, setRoom] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://chat-application-backend-ee4l.onrender.com/"||"http://localhost:5000";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, () => {});
    console.log(socket);
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [location.search, ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage=(e)=>{
      e.preventDefault();
      if(message){
        socket.emit('sendMessage',message,()=>setMessage(''));
      }
  }
  console.log(message,messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;
