package com.backend.api.request;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Getter
@NoArgsConstructor
public class WriteReq {

    @Column(name = "user_sequence")
    private Integer userSequence;
    private String title;
    private String contents;

}
