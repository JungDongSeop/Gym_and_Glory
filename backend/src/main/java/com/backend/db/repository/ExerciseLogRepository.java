package com.backend.db.repository;

import com.backend.db.entity.UserExerciseLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseLogRepository extends JpaRepository <UserExerciseLog, Integer>{

}
