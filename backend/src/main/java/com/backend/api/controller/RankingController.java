package com.backend.api.controller;

import com.backend.api.request.TeamReq;
import com.backend.api.response.TeamLogRes;
import com.backend.api.service.RankingService;
import com.google.api.Http;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping("/api/ranking")
@CrossOrigin("*")
@RequiredArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    // 팀 로그 저장하기
    @PostMapping(value = "/teamlog")
    public @ResponseBody ResponseEntity InsertTeamLog(@RequestBody TeamReq teamReq) {

        rankingService.insertTeamLogList(teamReq);
        return new ResponseEntity("저장 완료", HttpStatus.OK);

    }
}
