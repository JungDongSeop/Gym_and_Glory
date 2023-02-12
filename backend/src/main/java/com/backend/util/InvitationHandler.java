package com.backend.util;

import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

// The WebSockets handler to handle incoming connections and broadcast invitations
public class InvitationHandler extends TextWebSocketHandler {

    // A messaging template to broadcast messages to all connected clients
    private final SimpMessageSendingOperations messagingTemplate;

    public InvitationHandler(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // Method to handle incoming text messages
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Broadcast the received message to all clients subscribed to the "/topic/invitation" topic
        messagingTemplate.convertAndSend("/topic/invitation", message.getPayload());
    }
}