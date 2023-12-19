import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Chat.css'
import logo from './a.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlaneTop } from "@fortawesome/free-solid-svg-icons";
import { sendMessage, useChat } from '../../firebase/chat'
import jwtDecode from 'jwt-decode'

function Chat(props) {
    const [show, setShowBoxChat] = useState(false)
    const [message, setMessage] = useState('')
    const messages = useChat()
    console.log(messages)

    const handleSendMessage = () => {
        sendMessage(sessionStorage.getItem('token') ? jwtDecode(sessionStorage.getItem('token')).id : 2, 1, message)
        setMessage('')
    }
    return (
        <div className='main-chat'>
            {
                sessionStorage.getItem('token') &&
                <div className='icon-chat' onClick={() => setShowBoxChat(!show)} >
                    <i className="bi bi-chat-dots"/>
                </div>
            }
            {
                show &&
                <div className='box-chat'>
                    <div className='main-box-chat'>
                        <div className='header-box-chat'>
                            <div className='logo'>
                                <img className='img-chat-logo' src={logo}></img>
                            </div>
                            <div className='title'>
                                Bổng Oliver
                            </div>
                            <div style={{
                                height: "25px",
                                width: "25px",
                                backgroundColor: "rgba(190, 190, 190, 0.7)",
                                borderRadius: "50%",
                                color: "#000",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                                onClick={() => setShowBoxChat(false)}
                            >
                                <i class="bi bi-dash-lg"></i>
                            </div>
                        </div>
                        <div className='content-box-chat'>
                            {
                                messages.map((message, index) => (
                                    <div className='message'>
                                        {
                                            message.sender == 1 ?
                                                <>
                                                    <div className='info-message' style={{
                                                        justifyContent: "left"
                                                    }}>
                                                        <img className='avatar' src={logo}></img>
                                                        Admin
                                                    </div>
                                                    <div className='text-message message-admin'>
                                                        {message.message}
                                                    </div>
                                                </> :
                                                <>
                                                    <div className='info-message' style={{
                                                        justifyContent: "right"
                                                    }}>
                                                        {sessionStorage.getItem('token') ? jwtDecode(sessionStorage.getItem('token')).fullname : ""}
                                                        <img className='avatar' src={sessionStorage.getItem('token') ? jwtDecode(sessionStorage.getItem('token')).avatar : ""}></img>
                                                    </div>
                                                    <div className='text-message message-user'>
                                                        {message.message}
                                                    </div>
                                                </>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className='footer-box-chat'>
                            <input className='message' placeholder='Bạn hỏi gì đi...' value={message}
                                onChange={(e) => setMessage(e.target.value)}></input>
                            <i className="bi bi-send-fill" onClick={handleSendMessage}></i>
                            {/* <FontAwesomeIcon icon={faPaperPlaneTop} /> */}
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default Chat