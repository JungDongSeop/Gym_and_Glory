package com.backend.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name ="teamlog")
@Getter
@Setter
public class TeamLog extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "team_sequence")
    private Integer teamSequence;

    @Column(name = "team_name")
    private String teamName;

    @Column(name = "clear_time")
    private int clearTime;

    @OneToMany(mappedBy = "teamLog", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TeamLogItem> teamLogItems = new ArrayList<>();

    public void addTeamLogItem(TeamLogItem teamLogItem) {
        teamLogItems.add(teamLogItem);
        teamLogItem.setTeamLog(this);

    }

    public static TeamLog createTeamLog(String teamName, int clearTime, List<TeamLogItem> teamLogItems) {

        TeamLog teamLog = new TeamLog();
        teamLog.setTeamName(teamName);
        teamLog.setClearTime(clearTime);

        for(TeamLogItem teamLogItem : teamLogItems) {
            teamLog.addTeamLogItem(teamLogItem);
        }

        return teamLog;
    }

}
