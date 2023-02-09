package com.backend.api.controller;

import com.backend.api.response.ExerciseLogRes;
import com.backend.api.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
@CrossOrigin("*")
public class MyPageController {

    private final MyPageService mypageService;
    //운동 기록 받아오기
    @GetMapping("/{userSequence}/{div}")
    public ResponseEntity<?> getList(@PathVariable Integer userSequence, @PathVariable Integer div){

        List<ExerciseLogRes> list= mypageService.getList(userSequence,div);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //운동 시간 받아오기
    @GetMapping("/grace/{userSequence}")
    public ResponseEntity<?> getTimeList(@PathVariable Integer userSequence){

        List<String> list = mypageService.getTime(userSequence);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
}
