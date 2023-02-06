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
    //유저 아이디 하나 넘어오면 뱃지리스트 쫙
    @GetMapping("/list/{userSequence}")
    public ResponseEntity<?> getList(@PathVariable Integer userSequence){

        log.info("이게 된다고?");
        //DTO가 원래 있어야된다.
        //ENTITY넘기면 안도ㅒ!!!!!!!!!!!!!!!!
        List<Badge> list = userBadgeService.getList(userSequence);
        Badge badge = list.get(0);
        System.out.println(badge.getDescription());
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
