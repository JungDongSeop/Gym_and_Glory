package com.backend.api.service;

import com.backend.api.request.TeamReq;
import com.backend.api.request.UserExcerciseReq;
import com.backend.db.constant.RoomStatus;
import com.backend.db.entity.*;
import com.backend.db.exception.NoGameStartException;
import com.backend.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.ArrayList;

@Service
@Transactional
@RequiredArgsConstructor
public class GameService {
    private final RoomRepository roomRepository;
    private final TeamLogRepository teamLogRepository;
    private final UserRepository userRepository;
    private final ExerciseRepository exerciseRepository;
    private final ExerciseLogRepository exerciseLogRepository;

    public Room modifyRoomStatus(String sessionKey) {
        Room room = roomRepository.findBySessionKey(sessionKey);
        if(room == null) {
            throw new EntityNotFoundException("현재 시작할 방이 없습니다..");
        }
        else {
            if(room.getRoomStatus() == RoomStatus.START) {
                throw new NoGameStartException("게임이 진행중입니다.");
            }
           room.modifyRoomStatus(RoomStatus.START); // 게임 시작 상태로 바꾼다.
           roomRepository.save(room); // 저장한다.
        }
//        room.modifyRoomStatus(RoomStatus.START); // 게임시작으로 상태 변경
//        roomRepository.save(room);
//        return 1;
        return room;
    }

    public void insertTeamLogList(TeamReq teamReq) {

        String teamName = teamReq.getTeamName(); // 팀명
        int clearTime = teamReq.getTime(); // 클리어타임
        List<String> teamUserList = teamReq.getNickname();
        List<TeamLogItem> teamLogItemList = new ArrayList<>();

        for(String nickName : teamUserList) {

            User user = userRepository.findByNickname(nickName);
            // 팀 인원
            TeamLogItem teamLogItem = TeamLogItem.createTeamLogItem(user);
            teamLogItemList.add(teamLogItem);

        }

        TeamLog teamLog = TeamLog.createTeamLog(teamName, clearTime, teamLogItemList); // teamLog Master Insert

        // 현재 저장한 teamSequence를 가져온다.
        teamLogRepository.saveAndFlush(teamLog);
    }

    public void insertUserLogList(UserExcerciseReq userExcerciseReq) {

        String nickName = userExcerciseReq.getNickname(); // 개인 로그 들어가야할 유저 닉네임
        int damage = userExcerciseReq.getDamage(); // 유저 경험치
        List<Integer> exerciseCntList = userExcerciseReq.getExercise(); // 운동 카운트

        User user = userRepository.findByNickname(nickName); // 닉네임을 통해 유저를 찾는다.
        if(user == null) {
            throw new EntityNotFoundException("유저가 없어요 ㅠㅠ");
        }
        int i = 0;
        for(int count : exerciseCntList) {

            Exercise exercise = exerciseRepository.getById(i+1);
            UserExerciseLog userExerciseLog = UserExerciseLog.createUserLog(user, count, exercise);
            exerciseLogRepository.save(userExerciseLog);
            i++;
        }

    }
}
