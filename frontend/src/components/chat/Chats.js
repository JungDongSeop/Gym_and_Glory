import React from "react";
import Chat from "./Chat";

const Chats = (props) => {
  const { chats } = props;
  return chats.map((chat, i) => {
    <div className={chat.chatClass} key={i}>
      <Chat text={chat.text} userNick={chat.userNick} />
    </div>;
  });
};

export default Chats;
