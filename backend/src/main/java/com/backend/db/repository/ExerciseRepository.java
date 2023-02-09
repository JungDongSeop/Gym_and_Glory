package com.backend.db.repository;

import com.backend.db.entity.Exercise;
import com.backend.db.entity.UserExerciseLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {

}
