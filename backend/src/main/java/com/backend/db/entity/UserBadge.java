package com.backend.db.entity;


import com.backend.db.compositkey.UserBadgePK;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.bytebuddy.implementation.bind.annotation.AllArguments;

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


    public UserBadge(User user,Badge badge){
        this.user =user;
        this.badge=badge;
    }

//    repository.findById(PK);

//    PK >> user, badge

//    repository.findById(user, badge);

//    IdClass >> IdClass 안에 user, badge

//    repository.findById(IdClass);

}

