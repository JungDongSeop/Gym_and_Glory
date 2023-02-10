package com.backend.api.controller;
;
import com.backend.api.response.RankRes;
import com.backend.api.response.TeamLogRes;
import com.backend.api.response.UserRankRes;
import com.backend.api.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping("/api")
@CrossOrigin("*")
@RequiredArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    @GetMapping(value = "/ranking")
    public @ResponseBody ResponseEntity getRanking() {

        List<TeamLogRes> teamLogRes = rankingService.getTeamRankingList();
        List<UserRankRes> userRankRes = rankingService.getUserRankingList();
//
//        // 팀, 개인 랭킹 정보
        RankRes rankRes = new RankRes();
        rankRes.setTeamLogResList(teamLogRes);
        rankRes.setUserRankResList(userRankRes);

        return new ResponseEntity<>(rankRes, HttpStatus.OK);
    }
}
