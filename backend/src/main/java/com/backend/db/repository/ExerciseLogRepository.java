package com.backend.db.repository;

import com.backend.db.entity.UserExerciseLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseLogRepository extends JpaRepository <UserExerciseLog,Integer>{

    List<UserExerciseLog> findByUserSequenceAndDiv(Integer userSequence, Integer div);
}
