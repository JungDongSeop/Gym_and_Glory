package com.backend.api.controller;

import com.backend.api.request.FrdReq;
import com.backend.api.response.FrdRes;
import com.backend.api.service.FriendService;
import com.backend.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin("*")
public class FriendController {

    private final FriendService friendService;

    // 내 친구 목록 조회 ( 보내고 수락하고 다 한 경우 )
    @GetMapping(value="/friend/{userSequence}")
    public  @ResponseBody ResponseEntity getFriendList(@PathVariable Integer userSequence ) {
        List<FrdRes> getFriendList = friendService.getFrindSearchList(userSequence);

        return new ResponseEntity<>(getFriendList, HttpStatus.OK);
    }

    // 서로 수락한 친구 삭제
    @PostMapping(value="/friend")
    public @ResponseBody ResponseEntity delFriend(@RequestBody FrdReq frdReq) {
        List<FrdRes> getFriendList = friendService.delFriendList(frdReq);

        return new ResponseEntity<>(getFriendList, HttpStatus.OK);
    }

    // 친구목록의 유저 검색
    @GetMapping(value = "/friend/search")
    public ResponseEntity<?> getSearchUser(@RequestParam(value = "userSequence") Integer userSequence, @RequestParam(value = "nickName") String nickName) {
        List<User> searchUserList = friendService.getUserSearchList(userSequence, nickName);

        return new ResponseEntity<>(searchUserList, HttpStatus.OK);
    }
    
    // 친구 신청 보내기
    @PostMapping(value = "/friend/send")
    public @ResponseBody ResponseEntity sendFriend(@RequestBody FrdReq frdReq) {

        try {
            friendService.sendFriend(frdReq);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<String>("친구 신청이 완료되었습니다.", HttpStatus.OK);
    }

    // 보낸 사람 친구 목록 조회
    @GetMapping(value="/friend/send")
    public ResponseEntity<?> sendFrdSearch(@RequestParam String nickName) {

        List<FrdRes> sendFrdList = friendService.sendFrdSearch(nickName);

        return new ResponseEntity<>(sendFrdList, HttpStatus.OK);
    }

    // 보낸 사람이 친구 취소
    // 보낸 사람 관점에서 받을 때
    // userId가 보낸 사람
    // frdUserId가 내가 보낸 사람
    @PostMapping(value="/friend/send/cancel")
    public @ResponseBody ResponseEntity sendFriendCancel(@RequestBody FrdReq frdReq) {

        List<FrdRes> sendFrdList = friendService.sendFrdCancel(frdReq.getSendFrd(), frdReq.getRecvFrd());

        return new ResponseEntity<>(sendFrdList, HttpStatus.OK);
    }

    // 받은 사람 친구 목록 조회
    // userId가 나한테 보낸 친구이다.
    @GetMapping(value="/friend/receive")
    public ResponseEntity<?> recvFrdSearch(@RequestParam String nickName) {

        List<FrdRes> recvFrdList = friendService.recvFrdSearch(nickName);

        return new ResponseEntity<>(recvFrdList, HttpStatus.OK);

    }

    // 받은 사람이 친구 취소
    // userId를 가져와야 한다.
    // userId가 나한테 보낸 사람
    // frdUserId가 나!
    @PostMapping(value="/friend/receive/cancel")
    public @ResponseBody ResponseEntity recvFriendCancel(@RequestBody FrdReq frdReq) {

        List<FrdRes> recvFrdList = friendService.recvFrdCancel(frdReq.getSendFrd(), frdReq.getRecvFrd());

        return new ResponseEntity<>(recvFrdList, HttpStatus.OK);
    }

    // 받은 사람 친구 수락
    @PutMapping(value="/friend/receive/ok")
    public @ResponseBody ResponseEntity recvFriendOk(@RequestBody FrdReq frdReq) {

        List<FrdRes> recvFrdList = friendService.recvFrdOk(frdReq.getSendFrd(), frdReq.getRecvFrd());

        return new ResponseEntity<>(recvFrdList, HttpStatus.OK);
    }
}

