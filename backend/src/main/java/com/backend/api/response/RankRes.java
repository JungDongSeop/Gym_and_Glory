package com.backend.api.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter @Setter
public class RankRes {

    List<TeamLogRes> teamLogResList;
    List<UserRankRes> userRankResList;
}
