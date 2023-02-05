package com.backend.api.controller;

import com.backend.api.request.RoomReq;
import com.backend.api.response.RoomRes;
import com.backend.api.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin("*")
public class RoomController {
    private final RoomService roomService;

    // 방 만들기
    @PostMapping(value = "/rooms")
    public @ResponseBody ResponseEntity createRoom(@RequestBody @Valid RoomReq roomReq,
                                                   BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for(FieldError fielderror : fieldErrors) {
                sb.append(fielderror.getDefaultMessage());
            }

            return new ResponseEntity<String>(sb.toString(),
                    HttpStatus.BAD_REQUEST); // 에러 정보를 ResponseEntity 객체에 담음
        }

        String sessionKey; // 프론트에 보낼 세션 키

        try {
            System.out.println("여기까지 들어오는가?");
            // 프론트에서 넘어오는 방 입력 정보를 이용하여 방 생성 로직을 호출
            sessionKey = roomService.addRoom(roomReq);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(sessionKey, HttpStatus.OK);
    }

    // 로비로 방 조회
    @GetMapping(value = "/lobby")
    public List<RoomRes> searchAllRooms() {
        List<RoomRes> roomResList = roomService.getRoomList();
        return roomResList;
    }

    // 선택한 방 들어가기
    @PutMapping(value = "/room/{roomId}")
    public @ResponseBody ResponseEntity enterRoom
    (@PathVariable("roomId") Long roomId) {

        String sessionKey; // 프론트에 보낼 세션 키

        try {
            // 선택한 방 키를 가지고 방에 들어간다.
            // 방에 들어갈 수 있다면 sessionKey를 받을 수 있다.
            sessionKey = roomService.enterRoom(roomId);
        } catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<String>(sessionKey, HttpStatus.OK);
    }

    // 선택한 방 나가기
    @DeleteMapping(value = "/room/{roomId}")
    public @ResponseBody ResponseEntity leaveRoom
    (@PathVariable("roomID") Long roomId) {

        roomService.leaveRoom(roomId);

        // 방에 나가졌으면 OK
        return new ResponseEntity(HttpStatus.OK);
    }

}
