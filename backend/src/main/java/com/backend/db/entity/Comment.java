package com.backend.db.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(value = {AuditingEntityListener.class})
@Table(name ="comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_sequence")
    private Integer commentSequence;

    @ManyToOne
    @JoinColumn(name = "article_sequence")
    private BoardArticle boardArticle;
    @ManyToOne
    @JoinColumn(name = "user_sequence")
    private User user;
    private String title;
    private String contents;

    @Column(name = "good_count")
    private Integer goodCount;

    @Column(name = "open_close")
    private Integer open;

    @LastModifiedDate
    @Column(name="register_time")
    private LocalDateTime registerTime;

    public static Comment createComment (User user, BoardArticle boardArticle, String contents, Integer goodCount, Integer open) {
        Comment comment = new Comment();
        comment.setUser(user);
        comment.setBoardArticle(boardArticle);
        comment.setContents(contents);
        comment.setGoodCount(goodCount);
        comment.setOpen(open);

        return comment;
    }

}
