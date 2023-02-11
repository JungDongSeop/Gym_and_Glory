package com.backend.api.service;

import com.backend.api.request.TeamReq;
import com.backend.api.request.UserExcerciseReq;
import com.backend.db.compositkey.UserBadgePK;
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
    private final UserBadgeRepository userBadgeRepository;
    private final BadgeRepository badgeRepository;

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
        float damage = (float) userExcerciseReq.getDamage(); // 유저 경험치
        List<Integer> exerciseCntList = userExcerciseReq.getExercise(); // 운동 카운트

        User user = userRepository.findByNickname(nickName); // 닉네임을 통해 유저를 찾는다.
        if(user == null) {
            throw new EntityNotFoundException("유저가 없어요 ㅠㅠ");
        }

        user.setExp(damage);
        userRepository.save(user); // 유저 경험치 저장

        int i = 0;
        Badge badge = null;
        UserBadge userBadge = null;
        for(int count : exerciseCntList) {

            Exercise exercise = exerciseRepository.getById(i+1);
            UserExerciseLog userExerciseLog = UserExerciseLog.createUserLog(user, count, exercise);
            exerciseLogRepository.save(userExerciseLog);

            int before = exerciseLogRepository.sumByDivAndUser(user, exercise);


            if(before>=1000){//운동 1000개 돌파
                //운동 종류에 따른 분기처리
                if(exercise.getExerciseCode()==1){
                    badgeInsert(user,2);
                }else if(exercise.getExerciseCode()==2){
                    badgeInsert(user,3);
                }else if(exercise.getExerciseCode()==3){
                    badgeInsert(user,4);
                }else if(exercise.getExerciseCode()==4){
                    badgeInsert(user,5);
                }

            }else if(before >= 5000){//운동 5000개 돌파
                //운동 종류에 따른 분기처리
                if(exercise.getExerciseCode()==1){
                    badgeInsert(user,6);
                }else if(exercise.getExerciseCode()==2){
                    badgeInsert(user,7);
                }else if(exercise.getExerciseCode()==3){
                    badgeInsert(user,8);
                }else if(exercise.getExerciseCode()==4){
                    badgeInsert(user,9);
                }

            }else if(before >=10000){//운동 10000개 돌파
                //운동 종류에 따른 분기처리
                if(exercise.getExerciseCode()==1){
                    badgeInsert(user,10);
                }else if(exercise.getExerciseCode()==2){
                    badgeInsert(user,11);
                }else if(exercise.getExerciseCode()==3){
                    badgeInsert(user,12);
                }else if(exercise.getExerciseCode()==4){
                    badgeInsert(user,13);
                }

            }

            i++;
        }

    }

    private void badgeInsert(User user, int i) {
        Badge badge = badgeRepository.findById(i).get();
        UserBadge userBadge = new UserBadge(user,badge);
        userBadgeRepository.save(userBadge);
    }

}
