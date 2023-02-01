package com.backend.api.controller;

import com.backend.api.response.ExerciseLogRes;
import com.backend.api.service.ExerciseLogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/exerciseLog")
public class ExerciseLogController {

    public ExerciseLogService exerciseLogService;

    @Autowired
    public ExerciseLogController(ExerciseLogService exerciseLogService){
        this.exerciseLogService= exerciseLogService;
    }

    @GetMapping("/list/{userSequence}/{div}")
    public ResponseEntity<?> getList(@PathVariable Integer userSequence, @PathVariable Integer div){

        List<ExerciseLogRes> list= exerciseLogService.getList(userSequence,div);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
