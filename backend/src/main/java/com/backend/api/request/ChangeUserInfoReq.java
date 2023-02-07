package com.backend.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChangeUserInfoReq {
    private Integer userSequence;
    private String nickName;
    private String telNumber;
}
