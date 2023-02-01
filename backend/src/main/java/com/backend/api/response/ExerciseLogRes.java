package com.backend.api.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ExerciseLogRes {
    private LocalDateTime date;
    private Integer count;

    public ExerciseLogRes(LocalDateTime date, Integer count) {
        this.date = date;
        this.count = count;
    }
}
