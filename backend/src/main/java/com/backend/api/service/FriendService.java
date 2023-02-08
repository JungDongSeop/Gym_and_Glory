package com.backend.api.service;

import com.backend.api.request.FrdReq;
import com.backend.api.response.FrdRes;
import com.backend.db.entity.Friend;
import com.backend.db.entity.User;
import com.backend.db.repository.FriendRepository;
import com.backend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FriendService {

    private final UserRepository userRepository;
    private final FriendRepository friendRepository;

    // 서로 수락한 친구 조회하기
    @Transactional(readOnly = true)
    public List<FrdRes> getFrindSearchList(Integer userSequence) {
        List<FrdRes> getFriendList = friendRepository.findFrindList(userSequence);

        return getFriendList;
    }

    // 친구목록에서 유저 검색하기
    @Transactional(readOnly = true)
    public List<User> getUserSearchList(Integer userSequence, String nickName) {
        List<User> userSearchList = userRepository.findBySearchFriendNative(userSequence, nickName);

        if(userSearchList.size() == 0) {
            throw new EntityNotFoundException("검색된 유저가 없습니다.");
        }

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
       Friend findFrd = friendRepository.findByFrd(userId, frdId);

       if(findFrd !=  null) { // 아직 상대방이 친구 수락 안했다면

           // 보낸 친구의 유저 아이디를 가져온다.(나중에 리스트 조회를 위함, 보낸 친구 기준으로)
           Integer sendUserId = findFrd.getUser().getUserSequence();
           friendRepository.delete(findFrd);  // 데이터 삭제

           List<FrdRes> getFrdList= friendRepository.findSendFrdResList(sendUserId); // 보낸 친구 유저아이디를 통해 리스트 조회

           return getFrdList;

       } else {

           throw new EntityNotFoundException("상대방이 친구를 수락하였습니다.");

       }
    }

    // 받는 친구 목록 조회
    @Transactional(readOnly = true)
    public List<FrdRes> recvFrdSearch(String NickName) {

        // 닉네임으로 보낸 친구목록을 조회하려는 유저를 찾는다.
        User recvUser = userRepository.findByNickname(NickName);

        List<FrdRes> recvFrdResList = friendRepository.findRecvFrdResList(recvUser.getUserSequence());

        if(recvFrdResList.size() == 0) {
            throw new EntityNotFoundException("받은 신청 유저가 없습니다.");
        }

        return recvFrdResList;
    }


    // 받은 친구 취소
    public List<FrdRes> recvFrdCancel(Integer userId, Integer frdId) {

        // 취소하려는 친구 데이터를 찾는다.
        Friend findFrd = friendRepository.findByFrd(userId, frdId);

        if(findFrd != null) { // 아직 상대방이 친구 수락 안했다면

            // 받은 친구의 유저 아이디를 가져온다.(나중에 리스트 조회를 위함, 받은 친구의 기준으로)
            Integer recvUserId = findFrd.getUser().getUserSequence();
            friendRepository.delete(findFrd);  // 데이터 삭제

            List<FrdRes> getFrdList= friendRepository.findRecvFrdResList(recvUserId); // 보낸 친구 유저아이디를 통해 리스트 조회

            return getFrdList;

        } else {

            throw new EntityNotFoundException("상대방이 친구를 수락하였습니다.");
        }
    }


    // 받은 친구 수락
    public List<FrdRes> recvFrdOk(Integer userId, Integer frdId) {

        // 수락하려는 친구 데이터를 찾는다.
        Friend findFrd = friendRepository.findByFrd(userId, frdId);

        if(findFrd != null) {

            Integer recvUserId = findFrd.getUser().getUserSequence();
            findFrd.setReceive(true);
            friendRepository.save(findFrd);

            List<FrdRes> getFrdList = friendRepository.findRecvFrdResList(recvUserId);

            return getFrdList;
        } else {
            throw new EntityNotFoundException("수락할 친구가 없습니다.");
        }
    }
}
