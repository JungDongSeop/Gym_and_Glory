package com.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name ="teamlogItem")
@Getter
@Setter
public class TeamLogItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "team_item_sequence")
    private Integer teamItemSequence; // 팀 아이템 PK

    @ManyToOne
    @JoinColumn(name = "team_sequence")
    private TeamLog teamLog; // 팀 PK

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    public static TeamLogItem createTeamLogItem(User user) {
        TeamLogItem teamLogItem = new TeamLogItem();
        teamLogItem.setUser(user);
        return teamLogItem;
    }
}
