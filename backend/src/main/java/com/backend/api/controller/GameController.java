package com.backend.api.controller;

import com.backend.api.request.RoomSessionReq;
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
}
