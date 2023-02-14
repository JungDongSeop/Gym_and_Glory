import React,{ useState } from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient = null;

const ChatRoom =() =>{
    const [publicChats,setPublicChats] = userState([]);
    const [privateChats,setPrivateChats]= userState(new Map());
    const [userData,setUserData] =useState({
        username:"",
        recievername:"",
        connected:false,
        message:""
    })

    const handleUserName =(event) =>{
        const {value}=event.target;
        setUserData({...userData,"username":value});
    }

    const registerUser = ()=>{
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient =over(Sock);
        stompClient.connect({},onConneted,onError);
    }

    const onConneted = ()=>{
        setUserData({...userData,"connected":true});
        stompClient.subscribe('/chatroom/public',onPubilcMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessageReceived);
    }

    const onPubilcMessageReceived =(payload) => {
        let payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }

    const onPrivateMessageReceived =(payload)=>{
        let payloadData = JSON.parse(payload);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError=(err)=>{
        console.log(err);
    }

    return(
        <div className='container'>
            {userData.connected?
            <div className='chat-box'>
                <div className='member-list'>
                    <ul>
                        <li>chatroom</li>
                        {[...privateChats.keys()].map((name,index)=>(
                            <li className='member' key={index}>
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='chat-content'>
                </div>
            </div>
            :
            <div className='register'>
                <input
                id='user-name'
                placeholder='Enter the user name'
                value={userData.username}
                onChange={handleUserName}
                />
                <button type='button' onClick={registerUser}>
                    connect
                </button>
            </div>}
        </div>
        )
}

export default ChatRoom