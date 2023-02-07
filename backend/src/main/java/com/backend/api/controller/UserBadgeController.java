package com.backend.api.controller;

import com.backend.api.service.UserBadgeService;
import com.backend.db.entity.Badge;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/badge")
@CrossOrigin("*")
public class UserBadgeController {


    private UserBadgeService userBadgeService;

    @Autowired
    public UserBadgeController(UserBadgeService userBadgeService){
        this.userBadgeService = userBadgeService;
    }

    //유저별 뱃지 목록 조회
    @GetMapping("/list/{userSequence}")
    public ResponseEntity<?> getList(@PathVariable Integer userSequence){

        List<Badge> list = userBadgeService.getList(userSequence);
        Badge badge = list.get(0);
        System.out.println(badge.getDescription());
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //전체 뱃지 목록 조회
    @GetMapping("/list")
    public ResponseEntity<?> AllList(){
        List<Badge> list = userBadgeService.getAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }



}
