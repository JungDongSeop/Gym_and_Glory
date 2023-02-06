package com.backend.api.controller;

import com.backend.api.service.FriendService;
import com.backend.db.entity.Friend;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/friend")
@CrossOrigin("*")
public class FriendController {

    public FriendService friendService;

    @Autowired
    public FriendController(FriendService friendService){
        this.friendService = friendService;
    }

    @GetMapping("/send/{send}/{get}")
    public ResponseEntity sending(@PathVariable Integer send,@PathVariable Integer get){
        friendService.send(send,get);

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/accept/{send}/{get}/{flag}")
    public ResponseEntity accept(@PathVariable Integer send,@PathVariable Integer get,
                                 @PathVariable Integer flag){
        if(flag==1){//친구요청을 받았을 때 친구목록에 추가+친구 대기목록에서 삭제
            friendService.accept(send,get);
            friendService.delete(send,get);
        }else{//친구 요청을 거절 했을 때+친구 대기목록에서 삭제
            friendService.delete(send,get);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/list/{userSequence}")
    public ResponseEntity<?> getList(@PathVariable Integer userSequence){
        List<Friend>list =  friendService.getList(userSequence);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @DeleteMapping("/list/{getSequence}/{sendSequence}")
    public ResponseEntity<?> deleteFriend(@PathVariable Integer getSequence, @PathVariable Integer sendSequence){
        friendService.deleteFriend(getSequence,sendSequence);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}

