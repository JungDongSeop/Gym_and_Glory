package com.backend.api.request;

import lombok.*;

import javax.persistence.Column;

@Getter @Setter
@NoArgsConstructor
public class WriteReq {

    @Column(name = "user_sequence")
    private Integer userSequence;
    private String title;
    private String contents;
    private Integer div;
    private String imagePath;

}
