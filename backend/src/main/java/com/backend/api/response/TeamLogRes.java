package com.backend.api.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Data
public class TeamLogRes {
    private Time clear_time;
    private String nickname1;
    private String nickname2;
    private String nickname3;
    private String nickname4;

    public TeamLogRes(Time clear_time, String nickname1, String nickname2, String nickname3, String nickname4) {
        this.clear_time = clear_time;
        this.nickname1 = nickname1;
        this.nickname2 = nickname2;
        this.nickname3 = nickname3;
        this.nickname4 = nickname4;
    }
}
