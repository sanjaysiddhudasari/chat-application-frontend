import React, { useState, useEffect,useContext } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import { useLocation } from "react-router-dom";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import Typing from "../Typing/Typing";
import Loader from '../Loader'
import { ChatContext } from "../../context/ChatContext";
let socket;

function Chat() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUsers,setTypingUsers]=useState([]);
  const [isLoadingHistory,setIsLoadingHistory]=useState(false);
  const [isLoading,setIsLoading]=useState(true);
  const [hasMore,setHasMore]=useState(true);
  const ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://chat-application-backend-ee4l.onrender.com"
    : "http://localhost:5000";  
  useEffect(() => {
    const { name, setName,room,setRoom } = useContext(ChatContext)//here
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, () => {});
    console.log(socket);
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [location.search, ENDPOINT]);//here

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages)=>[...prevMessages,message]);
    });
    socket.on('roomData',({ users })=>{
      setUsers(users);
    })
  }, []);

  // for typing state

  useEffect(()=>{
    socket.on('typing:update',(typingUsers)=>{
      setTypingUsers(typingUsers);
    })
    return ()=>{
      socket.off('typing:update');
    }
  },[]);


  //loading state

  useEffect(()=>{
    if(messages.length>0){
      setIsLoading(false);
    }
  },[messages]);

  //for reciving older messages
  useEffect(()=>{
    socket.on('olderMessages',(olderMessages)=>{
      if(olderMessages.length===0){
          setHasMore(false);
      }else{
        setMessages((prev)=>[...olderMessages,...prev]);
      }
      setIsLoadingHistory(false);
    })
    return ()=>{
      socket.off('olderMessages');
    }
  },[])

  const sendMessage=(e)=>{
      e.preventDefault();
      if(message){
        socket.emit('typing:stop',{room,name});
        socket.emit('sendMessage',message,()=>setMessage(''));
      }
  }
  console.log(messages);

  return (
    isLoading?(<Loader/>):
    (<div className="outerContainer">
      <div className="container">
        <InfoBar />
        <Messages messages={messages}  isLoadingHistory={isLoadingHistory} setIsLoadingHistory ={setIsLoadingHistory} socket={socket} hasMore={hasMore}/>
        <Typing typingUsers={typingUsers} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} socket={socket} />
      </div>
      <TextContainer users={users}/>
    </div>)
  );
}

export default Chat;
