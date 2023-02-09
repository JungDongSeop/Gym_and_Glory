package com.backend.api.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class TeamReq {

    private String teamName;
    private List<String> nickname;
    private int time;

}
