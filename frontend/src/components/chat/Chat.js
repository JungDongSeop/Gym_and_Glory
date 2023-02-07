import React, { Component } from "react";
import styled from "styled-components";
import "./Chats.css";

const ChatContainer = styled.div`
  width: 140px;
`;

const Text = styled.p`
  font-size: 0.9rem;
  margin-top: 4px;
  padding: 10px;
  border-radius: 5px;
  background-color: #69f388;
  margin-bottom: 5px;
`;

const Nickname = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  padding: 3px;
  border-radius: 10px;
  margin-bottom: 4px;
  margin-top: 4px;
`;

class Chat extends Component {
  render() {
    const { text, userNick } = this.props;
    console.log(this.props.chatOwner);

    return (
      <ChatContainer>
        <Nickname>{userNick}</Nickname>
        <Text
          className={
            this.props.chatOwner === "my-chat" ? "back-green" : "back-white"
          }
        >
          {text}
        </Text>
      </ChatContainer>
    );
  }
}

export default Chat;
