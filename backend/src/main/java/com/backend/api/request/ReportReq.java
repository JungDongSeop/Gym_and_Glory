package com.backend.api.request;


import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Getter
@NoArgsConstructor
public class ReportReq {
    private Integer sendSequence;
    private Integer getSequence;
    private Integer kind;
    private String contents;
}
