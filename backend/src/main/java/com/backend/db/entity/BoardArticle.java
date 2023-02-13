package com.backend.db.entity;

import com.backend.api.request.WriteReq;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;


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
    private LocalDateTime registerTime;

    @LastModifiedDate
    @Column(name = "modify_time")
    private LocalDateTime modify_time;

    private Integer views;

    @Column(name = "good_count")
    private Integer goodCount;

    private Integer div;

    public static BoardArticle createBoard(WriteReq writeReq, User user) {
        BoardArticle board = new BoardArticle();
        board.setTitle(writeReq.getTitle());
        board.setUser(user);
        board.setContents(writeReq.getContents());
        board.setViews(0);
        board.setGoodCount(0);
        board.setDiv(writeReq.getDiv());

        return board;
    }
}
