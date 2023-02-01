package com.backend.api.controller;

import com.backend.api.response.ExerciseLogRes;
import com.backend.api.service.ExerciseLogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/exerciseLog")
@CrossOrigin("*")
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
