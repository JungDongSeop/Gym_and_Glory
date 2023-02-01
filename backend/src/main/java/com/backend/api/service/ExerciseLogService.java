package com.backend.api.service;

import com.backend.api.response.ExerciseLogRes;
import com.backend.db.entity.UserExerciseLog;
import com.backend.db.repository.ExerciseLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExerciseLogService {

    ExerciseLogRepository exerciseLogRepository;

    @Autowired
    public ExerciseLogService(ExerciseLogRepository exerciseLogRepository){
        this.exerciseLogRepository = exerciseLogRepository;
    }

    public List<ExerciseLogRes> getList(Integer userSequence, Integer div) {
        List<ExerciseLogRes>list = new ArrayList<>();

        List<UserExerciseLog> cur = exerciseLogRepository.findByUserSequenceAndDiv(userSequence,div);
        for(int i =0; i<cur.size(); i++){
            list.add(new ExerciseLogRes(cur.get(i).getDate(),cur.get(i).getCount()));
//            list.get(i).setDate(cur.get(i).getDate());
//            list.get(i).setCount(cur.get(i).getCount());
        }
        return list;
    }
}
