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
        System.out.println("리스트 들어옴");
        User user = userRepository.findById(userSequence).get();
        List<UserBadge> list= userBadgeRepository.findAllByUser(user);
        List<Badge> result= new ArrayList<>();

        System.out.println("현재result" + result.size());
        for(UserBadge b : list){
            System.out.println(b.getBadge());
            result.add(b.getBadge());
        }

        System.out.println("현재result" + result.size());

        return result;
    }

    public List<Badge> getAll() {
        List<Badge> list = badgeRepository.findAll();
        return list;
    }
}
