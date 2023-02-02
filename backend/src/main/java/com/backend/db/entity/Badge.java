package com.backend.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Badge {

    @Id
    @Column(name = "badge_sequence")
    private Integer badgeSequence;
    private String description;
    private String path;


}
