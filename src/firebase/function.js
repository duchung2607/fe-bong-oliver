import { useEffect, useState } from 'react';
import { firestore } from '../../src/firebase/config.js';
import jwtDecode from 'jwt-decode';
// import { useSelector } from 'react-redux';

export const useNotifications = () => {
    // let userId = useSelector(state => state.user.profile.id)
    // let userId = jwtDecode(sessionStorage.getItem('token')).id
    let userId = 1
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if(!userId) userId = -1; 
        const unsubscribe = firestore.collection('notifications')
          .where('userId', '==', userId - 0).orderBy('dateCreated','desc') 
          .onSnapshot((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNotifications(data);
          });
    
        return () => {
          unsubscribe();
        };
      }, [userId]); 
    
      return notifications;

}

export const addNotification = (userId, message, url) => {
    // Thêm thông báo mới vào collection 'notifications'
    firestore.collection('notifications').add({
        userId,
        message,
        dateCreated: new Date().toISOString(),
        read: false,
        image : sessionStorage.getItem("token")? jwtDecode(sessionStorage.getItem('token')).avatar : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
        url : url
    });
};

export const markNotificationAsRead = async (notificationId) => {
    await firestore.collection('notifications').doc(notificationId).update({
        read: true,
    });
};