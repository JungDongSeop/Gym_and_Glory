package com.backend.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="comment_good")
public class CommentGood {
    @Id
    @Column(name = "user_sequence")
    private Integer userSequence;

    @Column(name = "comment_sequence")
    private Integer commentSequence;
}
