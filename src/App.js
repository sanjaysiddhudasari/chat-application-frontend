import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'
import { ChatContext } from './context/ChatContext'

function App() {

    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    return (
        <ChatContext.Provider value={{name,setName,room,setRoom}} >
        <Router>
            <Routes>
                <Route path='/' element={<Join />}></Route>
                <Route path='/chat' element={<Chat />}></Route>
            </Routes>
        </Router>
        </ChatContext.Provider>
    )
}

export default App