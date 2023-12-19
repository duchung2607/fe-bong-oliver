import { useEffect, useState } from 'react';
import { firestore } from '../../src/firebase/config.js';
import jwtDecode from 'jwt-decode';

export const useChat = () => {
    let sender = sessionStorage.getItem('token') ? parseInt(jwtDecode(sessionStorage.getItem('token')).id) : 2
    let receiver = 1
    // let userId = 1
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore.collection('messages')
            .where('sender', 'in', [sender, receiver])
            .where('receiver', 'in', [sender, receiver])
            .orderBy('dateCreated', 'asc')
            .onSnapshot((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(data);
            });

        return () => {
            unsubscribe();
        };
    }, [sender]);
    console.log(messages)
    return messages;

}

export const sendMessage = (sender, receiver, message) => {
    firestore.collection('messages').add({
        sender: parseInt(sender),
        receiver: receiver,
        dateCreated: new Date().toLocaleString(),
        message: message,
    });

    firestore.collection('users').add({
        id : parseInt(sender),
        name: sessionStorage.getItem('token') ? jwtDecode(sessionStorage.getItem('token')).fullname :  "Khách",
        avatar : sessionStorage.getItem('token') ? jwtDecode(sessionStorage.getItem('token')).avatar :  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
        currentChat: message,
    });
};