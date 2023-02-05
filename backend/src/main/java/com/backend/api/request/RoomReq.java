package com.backend.api.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;

@Getter @Setter
public class RoomReq {

    @NotBlank(message = "방 제목은 필수 입력 값입니다.")
    private String title;

    @NotBlank(message = "팀 명은 필수 입력 값입니다.")
    private String teamName;

    private boolean privateStatus;

    private String password;
}
