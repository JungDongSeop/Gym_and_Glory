package com.backend.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Time;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="teamlog")
public class TeamLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_sequence")
    private Integer teamSequence;

    @Column(name = "clear_time")
    private Time clearTime;

    @Column(name = "user_sequence1")
    private Integer userSequence1;
    @Column(name = "user_sequence2")
    private Integer userSequence2;
    @Column(name = "user_sequence3")
    private Integer userSequence3;
    @Column(name = "user_sequence4")
    private Integer userSequence4;

}
