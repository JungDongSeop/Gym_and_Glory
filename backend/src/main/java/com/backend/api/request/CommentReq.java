package com.backend.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentReq {
    private Integer userSequence;
    private Integer articleSequence;
    private String contents;
    private String goodCount;
    private Integer open;
}
