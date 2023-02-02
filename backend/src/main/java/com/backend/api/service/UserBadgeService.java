package com.backend.api.service;

import com.backend.db.entity.Badge;
import com.backend.db.entity.User;
import com.backend.db.entity.UserBadge;
import com.backend.db.repository.UserBadgeRepository;
import com.backend.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserBadgeService {

    private UserBadgeRepository userBadgeRepository;
    private UserRepository userRepository;

    @Autowired
    public UserBadgeService(UserBadgeRepository userBadgeRepository,UserRepository userRepository){
        this.userBadgeRepository = userBadgeRepository;
        this.userRepository = userRepository;
    }

    public List<Badge> getList(Integer userSequence) {
        User user = userRepository.findById(userSequence).get();
        List<UserBadge> list= userBadgeRepository.findAllByUser(user);
        List<Badge> result= new ArrayList<>();
        for(UserBadge b : list){
            result.add(b.getBadge());
        }
        return result;
    }
}
