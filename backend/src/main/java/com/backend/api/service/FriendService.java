package com.backend.api.service;

import com.backend.api.request.FrdReq;
import com.backend.api.response.FrdRes;
import com.backend.db.entity.FrdInterface;
import com.backend.db.entity.Friend;
import com.backend.db.entity.User;
import com.backend.db.repository.FriendRepository;
import com.backend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import javax.persistence.Tuple;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FriendService {

    private final UserRepository userRepository;
    private final FriendRepository friendRepository;

    // 서로 수락한 친구 조회하기
    @Transactional(readOnly = true)
    public List<FrdRes> getFrindSearchList(Integer userSequence) {
        List<Tuple> frdResTuples = friendRepository.findFrindList(userSequence);
        List<FrdRes> frdResList = frdResTuples.stream()
                .map(t -> new FrdRes(
                        t.get(0,Integer.class),
                        t.get(1,Integer.class),
                        t.get(2,String.class),
                        t.get(3,String.class)
                )).collect(Collectors.toList());

        return frdResList;
    }

    // 서로 수락한 친구 삭제
    public List<FrdRes> delFriendList(FrdReq frdReq) {

        Friend frd = friendRepository.findBySendFrdTrue(frdReq.getSendFrd(), frdReq.getRecvFrd());
        System.out.println("유저 닉네임"+ frd.getFrdUser().getNickname());

        if(frd == null) { // 보냈을 때 상대방이 수락한 경우가 없다면 받아서 수락한 유저이다.

            frd = friendRepository.findByRecvFrdTrue(frdReq.getSendFrd(), frdReq.getRecvFrd());
        }

        Integer userSequence = frd.getUser().getUserSequence(); // 현재 로그인된 유저 아이디를 가져온다.
        System.out.println("시퀀스는 현재 로그인된 유저 아디는??"+userSequence);
        friendRepository.delete(frd);

        List<Tuple> frdResTuples = friendRepository.findFrindList(userSequence);
        List<FrdRes> frdResList = frdResTuples.stream()
                .map(t -> new FrdRes(
                        t.get(0,Integer.class),
                        t.get(1,Integer.class),
                        t.get(2,String.class),
                        t.get(3,String.class)
                )).collect(Collectors.toList());

        return frdResList;
    }

    // 친구목록에서 유저 검색하기
    @Transactional(readOnly = true)
    public List<User> getUserSearchList(Integer userSequence, String nickName) {
        List<User> userSearchList = userRepository.findBySearchFriendNative(userSequence, nickName);

        return userSearchList;
    }


    // 친구 신청하기
    public void sendFriend(FrdReq frdReq) {

        // 보낸 사람이 현재 DB에 있는지
        User sendUser = userRepository.findById(frdReq.getSendFrd())
                .orElseThrow(EntityNotFoundException::new);

        // 받은 사람이 현재 DB에 있는지
        User recvUser = userRepository.findById(frdReq.getRecvFrd())
                .orElseThrow(EntityNotFoundException::new);

        // 둘다 서로 있는 것이 확인되면 => 친구를 만든다.
        Friend sendFrd = Friend.sendFriend(sendUser, recvUser);
        friendRepository.save(sendFrd);
    }

    // 보낸 친구 목록 조회
    @Transactional(readOnly = true)
    public List<FrdRes> sendFrdSearch(String NickName) {

        // 닉네임으로 보낸 친구목록을 조회하려는 유저를 찾는다.
        User sendUser = userRepository.findByNickname(NickName);

        List<FrdRes> frdResList = friendRepository.findSendFrdResList(sendUser.getUserSequence());

        return frdResList;
    }

//    // 보낸 친구 취소
    public List<FrdRes> sendFrdCancel(Integer userId, Integer frdId) {

        // 취소하려는 친구 데이터를 찾는다.
       Friend findFrd = friendRepository.findByFrdFalse(userId, frdId);

       // 보낸 친구의 유저 아이디를 가져온다.(나중에 리스트 조회를 위함, 보낸 친구 기준으로)
       Integer sendUserId = findFrd.getUser().getUserSequence();
       friendRepository.delete(findFrd);  // 데이터 삭제

       List<FrdRes> getFrdList= friendRepository.findSendFrdResList(sendUserId); // 보낸 친구 유저아이디를 통해 리스트 조회

       return getFrdList;

    }

    // 받는 친구 목록 조회
    @Transactional(readOnly = true)
    public List<FrdRes> recvFrdSearch(String NickName) {

        // 닉네임으로 보낸 친구목록을 조회하려는 유저를 찾는다.
        User recvUser = userRepository.findByNickname(NickName);

        List<FrdRes> recvFrdResList = friendRepository.findRecvFrdResList(recvUser.getUserSequence());
        return recvFrdResList;
    }


    // 받은 친구 취소
    public List<FrdRes> recvFrdCancel(Integer userId, Integer frdId) {

        // 취소하려는 친구 데이터를 찾는다.
        Friend findFrd = friendRepository.findByFrdFalse(userId, frdId);

        // 받은 친구의 유저 아이디를 가져온다.(나중에 리스트 조회를 위함, 받은 친구의 기준으로)
        Integer recvUserId = findFrd.getUser().getUserSequence();
        friendRepository.delete(findFrd);  // 데이터 삭제

        List<FrdRes> getFrdList= friendRepository.findRecvFrdResList(recvUserId); // 받은 친구 유저아이디를 통해 리스트 조회

        return getFrdList;

    }


    // 받은 친구 수락
    public List<FrdRes> recvFrdOk(Integer userId, Integer frdId) {

        // 수락하려는 친구 데이터를 찾는다.
        Friend findFrd = friendRepository.findByFrdFalse(userId, frdId);

        Integer recvUserId = findFrd.getUser().getUserSequence();
        findFrd.setReceive(true);
        friendRepository.save(findFrd);

        List<FrdRes> getFrdList = friendRepository.findRecvFrdResList(recvUserId);

        return getFrdList;

    }

    public Boolean crossCheck(Integer user1Id, Integer user2Id) {
        Friend friend1 = friendRepository.findBySendFrdTrue(user1Id,user2Id);
        Friend friend2 = friendRepository.findBySendFrdTrue(user2Id,user1Id);

        if(friend1.isReceive()==true && friend2.isReceive()==true)return true;
        return false;
    }
}
