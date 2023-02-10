package com.backend.api.service;

import com.backend.api.request.TeamReq;
import com.backend.api.response.FrdRes;
import com.backend.api.response.TeamLogRes;
import com.backend.api.response.UserRankRes;
import com.backend.db.entity.TeamLog;
import com.backend.db.repository.ExerciseLogRepository;
import com.backend.db.repository.TeamLogRepository;
import com.backend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.EntityNotFoundException;
import javax.persistence.Tuple;
import java.math.BigInteger;
import java.sql.Time;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class RankingService {

    private final TeamLogRepository teamLogRepository;
    private final UserRepository userRepository;

    // 팀 랭킹 조회
    @Transactional(readOnly = true)
    public List<TeamLogRes> getTeamRankingList() {

        List<Tuple>  teamLogResTuples = teamLogRepository.findTeamRankigList();

        List<TeamLogRes> teamRankList = teamLogResTuples.stream()
                .map(t -> new TeamLogRes(
                        t.get(0,String.class),
                        t.get(1, Time.class),
                        t.get(2,String.class)
                )).collect(Collectors.toList());

        return teamRankList;

    }

    // 개인 랭킹 조회
    @Transactional(readOnly = true)
    public List<UserRankRes> getUserRankingList() {

        List<Tuple>  userLogResTuples = userRepository.findByUserRankingList();

        List<UserRankRes> userRankList = userLogResTuples.stream()
                .map(t -> new UserRankRes(
                        t.get(0, String.class),
                        t.get(1, BigInteger.class),
                        t.get(2, Float.class)
                )).collect(Collectors.toList());

        return userRankList;

    }

}
