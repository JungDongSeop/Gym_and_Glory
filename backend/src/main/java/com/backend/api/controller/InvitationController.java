package com.backend.api.controller;

import com.backend.api.request.InvitationReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class InvitationController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public InvitationController( SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/messages")
    public void chat(@Valid InvitationReq invitationReq) {

        simpMessagingTemplate.convertAndSend("/subscribe/rooms/" + invitationReq.getRoomSequence(), invitationReq.getRoomSessionKey());

    }
}