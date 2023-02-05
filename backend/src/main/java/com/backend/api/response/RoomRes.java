package com.backend.api.response;

import com.backend.db.constant.RoomStatus;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RoomRes {
    private Long id;
    private String title; // 방제목

    private String teamName; // 팀명

    private boolean privateStatus; // 비밀방여부

    private String password; // 비밀번호

    private RoomStatus roomStatus; // 방 게임 상태 (1: READY, 2: START)

    private int count; // 인원 수
    
    private String sessionKey; // 방 세션 키

    public RoomRes(Long id, String title, String teamName, boolean privateStatus,
                   String password, RoomStatus roomStatus, int count,
                   String sessionKey) {
        this.id = id;
        this.title = title;
        this.teamName = teamName;
        this.privateStatus = privateStatus;
        this.password = password;
        this.roomStatus = roomStatus;
        this.count = count;
        this.sessionKey = sessionKey;
    }
}
