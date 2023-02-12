package com.backend.api.request;

import com.google.firebase.database.annotations.NotNull;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class InvitationReq {
    /**
     * 송신자 id
     */
    @NotNull
    private Integer senderSequence;

    /**
     * 수신자 id
     */
    @NotNull
    private Integer receiverSequence;

    /**
     * 채팅방 id
     */
    @NotNull
    private Integer roomSequence;

    /**
     * 메시지 내용
     */
    @NotBlank
    private String RoomSessionKey;

    public InvitationReq(Integer senderSequence, Integer receiverSequence, Integer roomSequence, String roomSessionKey) {
        this.senderSequence = senderSequence;
        this.receiverSequence = receiverSequence;
        this.roomSequence = roomSequence;
        RoomSessionKey = roomSessionKey;
    }
}
