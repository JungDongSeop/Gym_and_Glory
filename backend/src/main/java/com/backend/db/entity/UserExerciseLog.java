package com.backend.db.entity;

import com.backend.api.request.UserExcerciseReq;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name ="user_exercise_log")
public class UserExerciseLog extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_exercise_sequence")
    private Integer userExerciseSequence; // 운동 로그 PK

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user; // 유저 PK

    @CreatedDate
    @Column(name = "exercise_date")
    private LocalDateTime date; // 운동한 datetime

    private Integer count; // 운동 카운트

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_code")
    private Exercise exercise; // 운동 종류 코드

    public static UserExerciseLog createUserLog(User user, int count, Exercise exercise) {
        UserExerciseLog userExerciseLog = new UserExerciseLog();

        userExerciseLog.setUser(user);
        userExerciseLog.setCount(count);
        userExerciseLog.setExercise(exercise);

        return userExerciseLog;
    }

}
