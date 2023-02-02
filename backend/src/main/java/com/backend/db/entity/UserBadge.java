package com.backend.db.entity;


import com.backend.db.compositkey.UserBadgePK;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@IdClass(UserBadgePK.class)
public class UserBadge {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_sequence")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "badge_sequence")
    private Badge badge;

//    repository.findById(PK);

//    PK >> user, badge

//    repository.findById(user, badge);

//    IdClass >> IdClass 안에 user, badge

//    repository.findById(IdClass);

}

