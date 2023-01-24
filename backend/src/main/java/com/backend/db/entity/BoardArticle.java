package com.backend.db.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;


@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="board")
public class BoardArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_sequence")
    private Integer articleSequence;

    @Column(name = "user_sequence")
    private Integer userSequence;

    private String title;

    private String contents;

    @Column(name = "register_time")
    private Timestamp registerTime;

    @Column(name = "modify_time")
    private Timestamp modify_time;

    private Integer views;

    @Column(name = "good_count")
    private Integer goodCount;

    private Integer div;

}
