package com.backend.api.controller;

import com.backend.api.request.ChangeUserInfoReq;
import com.backend.api.request.CheckEmailAndNumber;
import com.backend.api.request.TelEmailReq;
import com.backend.api.request.SignUpReq;
import com.backend.api.service.UserService;
import com.backend.db.entity.User;
import com.backend.util.RequestUtil;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
import java.net.UnknownHostException;
import java.util.List;

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

    @PostMapping("reset_pwd")
    public ResponseEntity<?> reset_pwd(@RequestBody CheckEmailAndNumber checkEmailAndNumber){
        Boolean flag = userService.doubleCheck(checkEmailAndNumber);

        return new ResponseEntity<>(flag,HttpStatus.OK);
    }

    @PostMapping("/login")
    public User login(@RequestBody SignUpReq signUpReq,@RequestHeader("Authorization") String authorization) throws UnknownHostException, MessagingException {
        System.out.println("들어오냐 로그인에 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
        System.out.println(authorization);

        FirebaseToken decodedToken;
        //인증
        try {
            String token = RequestUtil.getAuthorizationToken(authorization);
            decodedToken = firebaseAuth.verifyIdToken(token);
        } catch (IllegalArgumentException | FirebaseAuthException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "{\"code\":\"INVALID_TOKEN\", \"message\":\"" + e.getMessage() + "\"}");
        }

        User user = userService.getFindByEmail(signUpReq.getEmail());
        return user;
    }

    @GetMapping("/check_email")
    public ResponseEntity<?> check_email(@RequestParam String email){
        boolean flag= userService.checkDuplicateEmail(email);
        if(flag){
            return new ResponseEntity("중복X",HttpStatus.OK);
        }else{

            return new ResponseEntity("중복O",HttpStatus.OK);
        }
    }

    @GetMapping("/check_nickname")
    public ResponseEntity<?> check_nickname(@RequestParam String nickname){
        boolean flag= userService.checkDuplicateNickname(nickname);
        if(flag){
            return new ResponseEntity("중복X",HttpStatus.OK);
        }else{

            return new ResponseEntity("중복O",HttpStatus.OK);
        }
    }

    @DeleteMapping("/user/{userSequence}")
    public ResponseEntity deleteUser( @PathVariable int userSequence){;
        userService.deleteUser(userSequence);

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/user/{userSequence}")
    public String getNick(@PathVariable Integer userSequence){
        return userService.getNick(userSequence);
    }

    @GetMapping("/user/detail/{userSequence}")
    public ResponseEntity<?> getDetail(@PathVariable Integer userSequence){
        User user = userService.getOne(userSequence);

        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @GetMapping("/user/getInfo/{nickname}")
    public ResponseEntity<?> getInfoByNic(@PathVariable String  nickname){
        User user = userService.FindByNick(nickname);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/user/modify/nickname")
    public ResponseEntity<?> modifyNick(@RequestBody ChangeUserInfoReq changeUserInfoReq){
        userService.changeNick(changeUserInfoReq.getUserSequence(), changeUserInfoReq.getNickName());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/user/modify/telNumber")
    public ResponseEntity<?> modifyTel(@RequestBody ChangeUserInfoReq changeUserInfoReq){
        userService.changeTel(changeUserInfoReq.getUserSequence(), changeUserInfoReq.getTelNumber());
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/cross_check")
    public ResponseEntity<?> passwordReset(@RequestBody TelEmailReq telEmailReq){
        boolean flag = userService.crossCheck(telEmailReq);
        if(flag==true)
            return new ResponseEntity<>(HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/search/nickname/{word}")
    public ResponseEntity<?> searchList(@PathVariable String word){
        List<User> result = userService.searchByNick(word);
        if(result.size()>0){
            return new ResponseEntity<>(result,HttpStatus.OK);
        }
        return new ResponseEntity<>("검색된 개수 0",HttpStatus.OK);
    }

}
