import React from "react";
import Chatbot_v2 from '../Chatbot/Chatbot_v2'
import '../styles/App.css'

function App() {
    return (
        <div className='App--container'>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Chatbot_v2 />
            </div>
        </div>
    )
}

export default App
