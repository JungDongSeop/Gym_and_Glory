package com.backend.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TelEmailReq {

    private String telNum;
    private String email;

}
