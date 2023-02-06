package com.backend.api.service;

import com.backend.db.entity.Friend;
import com.backend.db.entity.SendFriend;
import com.backend.db.entity.User;
import com.backend.db.repository.FriendRepository;
import com.backend.db.repository.SendFriendRepository;
import com.backend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FriendService {

    private final UserRepository userRepository;


    // 친구목록에서 유저 검색하기
    @Transactional(readOnly = true)
    public List<User> getUserSearchList(String NickName) {
        List<User> userSearchList = userRepository.findByNicknameLike(NickName);

        if(userSearchList.size() == 0) {
            throw new EntityNotFoundException("검색된 유저가 없습니다.");
        }
        return userSearchList;
    }

}
