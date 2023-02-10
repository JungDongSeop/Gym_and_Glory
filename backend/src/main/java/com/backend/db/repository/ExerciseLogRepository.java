package com.backend.db.repository;

import com.backend.db.entity.Exercise;
import com.backend.db.entity.User;
import com.backend.db.entity.UserExerciseLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ExerciseLogRepository extends JpaRepository <UserExerciseLog, Integer>{

    @Query("select ue " +
            "from UserExerciseLog ue " +
            "where ue.user.userSequence =:userSequence " +
            "and ue.exercise.exerciseCode =:exerciseCode")
    List<UserExerciseLog> findByUserExerciseLogList(@Param("userSequence") Integer userSequence, @Param("exerciseCode") Integer exerciseCode);

    @Query("select ue " +
            "from UserExerciseLog ue " +
            "where ue.user.userSequence =:userSequence")
    List<UserExerciseLog> findByUserSequenceList(@Param("userSequence") Integer userSequence);

    @Query("select SUM(se.count) from UserExerciseLog se where se.user=:user and se.exercise=:exercise ")
    int sumByDivAndUser(User user, Exercise exercise);
}
