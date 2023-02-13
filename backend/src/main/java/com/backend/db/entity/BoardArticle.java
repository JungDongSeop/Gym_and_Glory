package com.backend.db.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;


@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(value = {AuditingEntityListener.class})
@Table(name ="board")
public class BoardArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_sequence")
    private Integer articleSequence;

    @ManyToOne
    @JoinColumn(name = "user_sequence")
    private User user;

    private String title;

    private String contents;

    @CreatedDate
    @Column(name = "register_time")
    private String registerTime;

    @LastModifiedDate
    @Column(name = "modify_time")
    private String modify_time;

    private Integer views;

    @Column(name = "good_count")
    private Integer goodCount;

    private Integer div;
}
