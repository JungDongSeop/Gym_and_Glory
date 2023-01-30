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
@Table(name ="comment_good")
public class CommentGood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_good_sequence")
    private Integer commentGoodSequence;

    @Column(name = "user_sequence")
    private Integer userSequence;

    @Column(name = "comment_sequence")
    private Integer commentSequence;
}
