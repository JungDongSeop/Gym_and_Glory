package com.backend.api.controller;

import com.backend.api.request.SignUpReq;
import com.backend.api.service.UserService;
import com.backend.db.entity.User;
import com.backend.db.repository.UserRepository;
import com.backend.util.RequestUtil;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
import java.net.UnknownHostException;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    FirebaseAuth firebaseAuth;


    @PostMapping("/signup")
    public ResponseEntity signup(@RequestHeader("Authorization") String authorization, @RequestBody SignUpReq signUpReq) throws UnknownHostException, MessagingException {
        // TOKEN을 가져온다.
        FirebaseToken decodedToken;
        try {
            String token = RequestUtil.getAuthorizationToken(authorization);
            decodedToken = firebaseAuth.verifyIdToken(token);
        } catch (IllegalArgumentException | FirebaseAuthException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "{\"code\":\"INVALID_TOKEN\", \"message\":\"" + e.getMessage() + "\"}");
        }
        // 사용자를 등록한다.
        userService.signup(signUpReq);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody SignUpReq signUpReq) throws UnknownHostException, MessagingException {
        System.out.println("------------------------------------------------------잘하자");

        User user = null;
        user = userService.findUserByEmail(signUpReq.getEmail());

        if(user.getPassword().equals(signUpReq.getPassword())){
            return new ResponseEntity(HttpStatus.OK);
        }
        else{
            System.out.println("실패");
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/check_email")
    public ResponseEntity<?> check_email(@RequestParam(required = true) String email){
        boolean flag= userService.checkDuplicateEmail(email);
        if(flag){
            return new ResponseEntity(HttpStatus.OK);
        }else{
            return new ResponseEntity(HttpStatus.ACCEPTED);
        }
    }

    @GetMapping("/check_nickname")
    public ResponseEntity<?> check_nickname(@RequestParam(required = true) String nickname){
        boolean flag= userService.checkDuplicateNickname(nickname);
        if(flag){
            return new ResponseEntity(HttpStatus.OK);
        }else{
            System.out.println("실패");
            return new ResponseEntity(HttpStatus.ACCEPTED);
        }
    }

    @DeleteMapping("/user/{userSequence}")
    public ResponseEntity deleteUser( @PathVariable int userSequence){
        System.out.println("안들어오노 ㅠ");
        userService.deleteUser(userSequence);

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/user/{userSequence}")
    public String getNick(@PathVariable Integer userSequence){
        return userService.getNick(userSequence);
    }

}
