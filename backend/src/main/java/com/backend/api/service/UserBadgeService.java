package com.backend.api.service;

import com.backend.db.entity.Badge;
import com.backend.db.entity.User;
import com.backend.db.entity.UserBadge;
import com.backend.db.repository.BadgeRepository;
import com.backend.db.repository.UserBadgeRepository;
import com.backend.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserBadgeService {

    private final UserBadgeRepository userBadgeRepository;
    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;

    @Autowired
    public UserBadgeService(UserBadgeRepository userBadgeRepository
            ,UserRepository userRepository
            ,BadgeRepository badgeRepository){
        this.userBadgeRepository = userBadgeRepository;
        this.userRepository = userRepository;
        this.badgeRepository = badgeRepository;
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

    public List<Badge> getAll() {
        List<Badge> list = badgeRepository.findAll();
        return list;
    }
}
