package com.backend.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChangeNickReq {
    private Integer userSequence;
    private String nickName;
}
