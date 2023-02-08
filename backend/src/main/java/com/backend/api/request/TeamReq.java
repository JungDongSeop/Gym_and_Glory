package com.backend.api.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class TeamReq {

    private List<String> nickNameList;
    private int clearTime;
    private String teamName;
}
