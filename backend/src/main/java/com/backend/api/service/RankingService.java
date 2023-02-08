package com.backend.api.service;

import com.backend.api.request.TeamReq;
import com.backend.db.entity.TeamLog;
import com.backend.db.repository.TeamLogItemRepository;
import com.backend.db.repository.TeamLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RankingService {

    private final TeamLogRepository teamLogRepository;
    private final TeamLogItemRepository teamLogItemRepository;

    public void insertTeamLogList(TeamReq teamReq) {

        String teamName = teamReq.getTeamName(); // 팀명
        int clearTime = teamReq.getClearTime(); // 클리어타임

        TeamLog teamLog = TeamLog.createTeamLog(teamName, clearTime); // teamLog Master Insert

        // 현재 저장한 teamSequence를 가져온다.
        Integer teamSequence = teamLogRepository.save(teamLog).getTeamSequence();

        List<String> TeamUserList = teamReq.getNickNameList(); // 팀 유저

        for()

    }

}
