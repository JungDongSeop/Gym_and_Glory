package com.backend.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name ="teamlog")
@Getter
@Setter
public class TeamLog {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "team_sequence")
    private Integer teamSequence;

    @Column(name = "team_name")
    private String teamName;

    @Column(name = "clear_time")
    private int clearTime;

    public static TeamLog createTeamLog(String teamName, int clearTime) {

        TeamLog teamLog = new TeamLog();
        teamLog.setTeamName(teamName);
        teamLog.setClearTime(clearTime);
        return teamLog;
    }

}
