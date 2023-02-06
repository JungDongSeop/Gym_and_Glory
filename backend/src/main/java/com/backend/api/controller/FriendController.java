package com.backend.api.controller;

import com.backend.api.service.FriendService;
import com.backend.db.entity.Friend;
import com.backend.db.entity.Room;
import com.backend.db.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/friend")
@CrossOrigin("*")
public class FriendController {

    private final FriendService friendService;

    // 친구목록의 유저 검색
    @GetMapping(value = {"/search"})
    public ResponseEntity<?> searchRoom(@RequestParam String nickName) {

        List<User> searchUserList = friendService.getUserSearchList(nickName);

        return new ResponseEntity(searchUserList, HttpStatus.OK);
    }

}

