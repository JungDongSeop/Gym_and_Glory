package com.backend.api.service;

import com.backend.api.response.TeamLogRes;
import com.backend.db.entity.TeamLog;
import com.backend.db.entity.User;
import com.backend.db.repository.RankingRepository;
import com.backend.db.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class RankingService {

    private RankingRepository rankingRepository;
    private UserRepository  userRepository;
    @Autowired
    public RankingService(RankingRepository rankingRepository,UserRepository userRepository){
        this.rankingRepository = rankingRepository;
        this.userRepository = userRepository;
    }

    public List<TeamLogRes> getList() {
        List<TeamLog> list = rankingRepository.orderByTime(Sort.by("clearTime"));
        List<TeamLogRes>result = new ArrayList<>();
        System.out.println("여기까지들어왔따");
        System.out.println("list의 길이"+ list.size());
        for(int i=0; i<list.size();i++){
            User user1 = userRepository.findByUserSequence(list.get(i).getUserSequence1());
            User user2 = userRepository.findByUserSequence(list.get(i).getUserSequence2());
            User user3 = userRepository.findByUserSequence(list.get(i).getUserSequence3());
            User user4 = userRepository.findByUserSequence(list.get(i).getUserSequence4());
            TeamLogRes teamLogRes = new TeamLogRes(list.get(i).getClearTime(),
                    user1.getNickname(),user2.getNickname(),
                    user3.getNickname(),user4.getNickname());
            result.add(teamLogRes);

        }
        return result;
    }
}
