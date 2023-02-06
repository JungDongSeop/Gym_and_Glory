import React, { Component } from "react";
import Chat from "./Chat";
import "./Chats.css";

const Chats = (props) => {
  const { chats } = props;
  return chats.map((chat, i) => {
    return (
      <div className={chat.chatClass} key={i}>
        <Chat
          text={chat.text}
          userNick={chat.userNick}
          chatOwner={chat.chatClass}
        />
      </div>
    );
  });
};

export default Chats;
