package com.backend.db.entity;

import com.backend.api.request.RoomReq;
import com.backend.db.constant.RoomStatus;
import com.backend.db.exception.OutOfCountException;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name= "rooms")
@Getter
@Setter
public class Room {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "room_id")
    private Long id; // 방 코드

    private String title; // 방 제목

    @Column(name = "team_name")
    private String teamName; // 팀 명

    @Column(name = "is_private")
    private boolean privateStatus; // 비밀방 여부

    @Column(name = "room_pwd")
    private String password; // 방 비밀번호

    @Column(name = "is_start")
    @Enumerated(EnumType.ORDINAL)
    private RoomStatus roomStatus; // 방 게임 상태

    @Column(name = "count")
    private int count; // 방 인원 수

    @Column(name = "session_key")
    private String sessionKey; // 방 세션 키

    public static Room createRoom(RoomReq roomReq, String sessionKey) {
        Room room = new Room();
        room.setTitle(roomReq.getTitle()); // 방제목
        room.setTeamName(roomReq.getTeamName()); // 팀명

        // 비밀번호가 없으면
        if(roomReq.getPassword() == null || roomReq.getPassword() == "") {
            room.setPrivateStatus(false); //비밀방여부 X
        } else { // 비밀번호가 있으면
            room.setPrivateStatus(true); // 비밀방여부 O
        }
        room.setPassword(roomReq.getPassword()); //비밀번호
        room.setRoomStatus(RoomStatus.READY); //방 생성되면 준비상태
        room.setCount(1); // 방을 만들면 인원 수 1로 고정
        room.setSessionKey(sessionKey); // 세션키 만든 후 세션키 저장
        return room; // room 반환
    }

    public void addCount(int countNumber) { // 사람이 들어왔을 때
        int restCount = this.count + countNumber; // countNumber는 1이 들어온다.
        if(restCount == 4) {
            throw new OutOfCountException("선택하신 방의 인원이 다 찼습니다.");
        }
        this.count = restCount;
    }

    public void removeCount(int countNumber) { // 사람이 나갔을 때
        int restCount = this.count - countNumber;
        this.count = restCount;
    }
    
}
