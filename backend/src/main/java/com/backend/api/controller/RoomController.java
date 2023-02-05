package com.backend.api.controller;

import com.backend.api.request.RoomReq;
import com.backend.api.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
public class RoomController {
    private final RoomService roomService;

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

}
