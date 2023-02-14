import React,{ useState } from 'react'
import {over} from ;

const ChatRoom =() =>{

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

    const registerUser = ()={
        let
    }

    return(
        <div className='container'>
            {userData.connected?
            <div>
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