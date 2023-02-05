package com.backend.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="board_good")
public class BoardGood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_good_sequence")
    private Integer boardGoodSequence;

    @ManyToOne
    @JoinColumn(name = "user_sequence")
    private User user;

    @ManyToOne
    @JoinColumn(name = "article_sequence")
    private BoardArticle article;
}
