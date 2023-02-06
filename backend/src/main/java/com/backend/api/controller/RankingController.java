package com.backend.api.controller;

import com.backend.api.response.TeamLogRes;
import com.backend.api.service.RankingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/ranking")
@CrossOrigin("*")
public class RankingController {

    private RankingService rankingService;

    @Autowired
    public RankingController (RankingService rankingService){
        this.rankingService = rankingService;
    }

    @GetMapping("/list")
    public ResponseEntity<?> getList(){
        System.out.println("컨트롤러까지들어옴");
        List<TeamLogRes> TeamList = rankingService.getList();
        return new ResponseEntity<List<TeamLogRes>>(TeamList,HttpStatus.OK);
    }
}
