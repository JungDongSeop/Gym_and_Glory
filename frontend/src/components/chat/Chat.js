import React, { Component } from "react";
import styled from "styled-components";

const ChatContainer = styled.div`
  width: 100px;
`;

const Text = styled.p`
  font-size: 1rem;
`;

const Nickname = styled.p`
  font-size: 0.8rem;
`;

class Chat extends Component {
  render() {
    const { text, userNick } = this.props;

    return (
      <ChatContainer>
        <Nickname>{userNick}</Nickname>
        <Text>{text}</Text>
      </ChatContainer>
    );
  }
}

export default Chat;
