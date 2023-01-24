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
@Table(name ="board_good")
public class BoardGood {

    @Id
    @Column(name = "user_sequence")
    private Integer userSequence;

    @Column(name = "article_sequence")
    private Integer articleSequence;
}
