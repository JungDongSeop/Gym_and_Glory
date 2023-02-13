package com.backend.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class CommentReq {
    private Integer userSequence;
    private Integer articleSequence;
    private String contents;
    private String goodCount;
    private Integer open;
}
