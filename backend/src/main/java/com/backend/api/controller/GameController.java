package com.backend.api.controller;

import com.backend.api.request.RoomSessionReq;
import com.backend.api.request.TeamReq;
import com.backend.api.request.UserExcerciseReq;
import com.backend.api.service.GameService;
import com.backend.api.service.RoomService;
import com.backend.db.entity.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin("*")
public class GameController {

    private final GameService gameService;

    @PutMapping(value = "/game")
    public @ResponseBody ResponseEntity gameStart(@RequestBody RoomSessionReq roomSessionReq) {

        try {
            Room room = gameService.modifyRoomStatus(roomSessionReq.getSessionKey());
            System.out.println(room.getRoomStatus());
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    // 팀 로그 저장하기
    @PostMapping(value = "/game/teamlog")
    public @ResponseBody ResponseEntity InsertTeamLog(@RequestBody TeamReq teamReq) {

        gameService.insertTeamLogList(teamReq);
        return new ResponseEntity<>("저장 완료", HttpStatus.OK);

    }

    // 게인 로그 저장하기
    @PostMapping(value = "/game/userlog")
    public @ResponseBody ResponseEntity InsertUserLog(@RequestBody UserExcerciseReq userExcerciseReq) {

        try {
            gameService.insertUserLogList(userExcerciseReq);
        } catch (Exception e) {
            return new ResponseEntity<String>("닉네임 오류!!",HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("저장 완료", HttpStatus.OK);
    }
}
