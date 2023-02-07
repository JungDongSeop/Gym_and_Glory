package com.backend.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name= "friends")
@Getter
@Setter
public class Friend {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "friend_id")
    private Long id; // 친구 PK

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "frd_user_id")
    private User frdUser; // 유저 B(친구)

    // 친구 신청하면 친구 수락 => N
    // 친구 신청해서 받으면 친구 수락 => Y
    // 친구 데이터가 유저 B가 기준이 되는 유저 A가 친구인 데이터 하나 더 새로 만들어진다.

    @Column(name = "is_rev")
    private boolean isReceive; // 친구 수락 여부

    // 유저가 다른 유저에게 친구 신청을 보낼 때
    public static Friend sendFriend(User sendUser, User recvUser) {
        Friend sendFrd = new Friend();
        sendFrd.setUser(sendUser); // 신청한 유저
        sendFrd.setFrdUser(recvUser); // 친구 신청한 유저
        sendFrd.setReceive(false); // 친구 수락 여부
        return sendFrd;
    }
}
