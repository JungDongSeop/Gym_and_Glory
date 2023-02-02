package com.backend.db.compositkey;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class UserBadgePK implements Serializable {

    @EqualsAndHashCode.Include
    public Integer user;

    @EqualsAndHashCode.Include
    public Integer badge;

}
