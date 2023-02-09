package com.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name= "exercise")
@Getter
@Setter
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "exercise_code")
    private Integer exercise_code; // 운동 종류 코드

    @Column(name = "name")
    private String name; // 운동 명

}
