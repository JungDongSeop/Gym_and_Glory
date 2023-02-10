package com.backend.api.response;

import lombok.Getter;
import lombok.Setter;

import java.sql.Time;

@Getter @Setter
public class TeamLogRes {
    private String teamName;
    private Time clearTime;
    private String users;



    public TeamLogRes(String teamName, Time clearTime, String users) {
        this.teamName = teamName;
        this.clearTime = clearTime;
        this.users = users;
    }
}
