package com.backend.api.service;

import com.backend.api.response.ExerciseLogRes;
import com.backend.db.entity.UserExerciseLog;
import com.backend.db.repository.ExerciseLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.ArrayList;
@Service
@Transactional
@RequiredArgsConstructor
public class MyPageService {

    private final ExerciseLogRepository exerciseLogRepository;

    public List<ExerciseLogRes> getList(Integer userSequence, Integer code) {
        List<ExerciseLogRes>list = new ArrayList<>();

        List<UserExerciseLog> cur = exerciseLogRepository.findByUserExerciseLogList(userSequence,code);
        for(int i =0; i<cur.size(); i++){
            list.add(new ExerciseLogRes(cur.get(i).getDate(),cur.get(i).getCount()));
        }
        return list;
    }

    public List<String> getTime(Integer userSequence) {
        List<UserExerciseLog> list = exerciseLogRepository.findByUserSequenceList(userSequence);

        List<String > result= new ArrayList<>();
        for(int i =0; i<list.size(); i++){
            result.add(String.valueOf(list.get(i).getDate())) ;
        }
        return result;
    }

}
