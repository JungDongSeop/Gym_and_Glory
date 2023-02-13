import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Stomp from 'stompjs';

const TmpMessage = () => {

  const {userSequence} = useContext(AuthContext);

  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setConnected] = useState(false);
  
  const connect = () => {
    const socket = new WebSocket('ws://localhost:8080/ws-connection');
    setStompClient(Stomp.over(socket));
    stompClient.connect({}, () => {
      console.log("WebSocket");
      setConnected(true);
      // stompClient.subscribe('ws://localhost:8080/subscribe/rooms/5', (greeting) => {
      //   console.log(greeting.body);
      // });
    });
  };
  
  useEffect(() => {
    connect();
    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    stompClient.send('ws://localhost:8080/publish/messages', {}, JSON.stringify({
      message: document.getElementById('name').value,
      senderId: 7,
      receiverId: 14,
      roomId: 5,
    }));
  };

  return (
    <div>
      <input type="text" id="name" />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default TmpMessage;
