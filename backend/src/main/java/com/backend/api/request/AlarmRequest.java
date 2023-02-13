package com.backend.api.request;

public class AlarmRequest {
    private Integer user1Id;
    private Integer user2Id;

    public AlarmRequest(Integer user1Id, Integer user2Id) {
        this.user1Id = user1Id;
        this.user2Id = user2Id;
    }

    public Integer getUser1Id() {
        return user1Id;
    }

    public Integer getUser2Id() {
        return user2Id;
    }
}
