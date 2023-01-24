package com.backend.api.request;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Getter
@NoArgsConstructor
public class SignUpReq {

    @Email(message = "이메일 형식이 아닙니다.")
    @Size(min = 3, max = 50)
    private String email;
    private String password;
    private String nickname;
    private Integer gender;// 여자0 남자1
    private String telNumber;

}
