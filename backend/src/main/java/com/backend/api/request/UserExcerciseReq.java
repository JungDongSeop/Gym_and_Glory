package com.backend.api.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserExcerciseReq {

    private String nickname;
    private List<Integer> exercise;
    private int damage;
}
