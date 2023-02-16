package com.backend.db.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
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

    @Column(name = "image_path")
    private String imagePath;

    public static BoardArticle createBoard(String title,
                                           String contents,
                                           Integer div,
                                           String imagePath,
                                           User user
                                           ) {

        BoardArticle board = new BoardArticle();
        board.setTitle(title);
        board.setUser(user);
        board.setContents(contents);
        board.setViews(0);
        board.setGoodCount(0);
        board.setDiv(div);
        board.setImagePath(imagePath);

        return board;
    }
}
