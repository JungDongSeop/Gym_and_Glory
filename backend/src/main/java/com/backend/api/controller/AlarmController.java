package com.backend.api.controller;

import com.backend.api.request.AlarmRequest;
import com.backend.api.response.AlarmResponse;
import com.backend.api.service.FriendService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
public class AlarmController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final FriendService friendService;
    public AlarmController(SimpMessageSendingOperations messagingTemplate,
                           FriendService friendService) {
        this.messagingTemplate = messagingTemplate;
        this.friendService =friendService;
    }

    @MessageMapping("/alarm")
    public void handleAlarmRequest(AlarmRequest request) {
        // Check if the two users are friends and both are currently logged in
        boolean areFriends = checkIfFriends(request.getUser1Id(), request.getUser2Id());
        boolean bothLoggedIn = checkIfBothLoggedIn(request.getUser1Id(), request.getUser2Id());

        if (areFriends && bothLoggedIn) {
            // Start the alarm session
            messagingTemplate.convertAndSend("/topic/alarm", new AlarmResponse("Alarm started!"));
        } else {
            // Send an error message
            messagingTemplate.convertAndSend("/topic/alarm", new AlarmResponse("Alarm failed to start."));
        }
    }

    private boolean checkIfFriends(Integer user1Id, Integer user2Id) {
        Boolean flag = friendService.crossCheck(user1Id,user2Id);
        return true;
    }

    private boolean checkIfBothLoggedIn(Integer user1Id, Integer user2Id) {
        // You can check if both user1Id and user2Id are currently logged in from your database or cache here
        // For this example, we'll just assume that they are both logged in
        return true;
    }
}