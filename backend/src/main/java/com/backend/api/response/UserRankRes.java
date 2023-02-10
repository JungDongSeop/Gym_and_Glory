package com.backend.api.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;

@Getter @Setter
public class UserRankRes {

    private String nickName;
    private BigInteger level;
    private Float exp;

    public UserRankRes(String nickName, BigInteger level, Float exp) {
        this.nickName = nickName;
        this.level = level;
        this.exp = exp;
    }
}
