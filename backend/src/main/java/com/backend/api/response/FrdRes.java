package com.backend.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FrdRes {

    private Integer userId;
    private Integer frdUserId;
    private String sendNickName;
    private String recvNickName;

    // 보낸 유저의 아이디, 친구 수락 전 유저 아이디, 친구 수락 전 유저 닉네임
    public FrdRes(Integer userId, Integer frdUserId,
                  String sendNickName, String recvNickName) {
        this.userId = userId;
        this.frdUserId = frdUserId;
        this.sendNickName = sendNickName;
        this.recvNickName = recvNickName;
    }
}

