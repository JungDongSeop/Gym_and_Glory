package com.backend.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class BoardPostReq {
    private Integer articleSequence;
    private String title;
    private String contents;
    @LastModifiedDate
    private LocalDateTime modifyDate;
}
