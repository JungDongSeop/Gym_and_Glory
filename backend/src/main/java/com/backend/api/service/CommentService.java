package com.backend.api.service;

import com.backend.api.request.CommentReq;
import com.backend.db.entity.BoardArticle;
import com.backend.db.entity.Comment;
import com.backend.db.entity.User;
import com.backend.db.repository.BoardRepository;
import com.backend.db.repository.CommentRepository;
import com.backend.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.PrePersist;
import java.time.LocalDateTime;
import java.util.List;

import static java.time.LocalTime.now;

@Service
public class CommentService {

    private CommentRepository commentRepository;
    private UserRepository userRepository;
    private BoardRepository boardRepository;
    @Autowired
    public CommentService(CommentRepository commentRepository,
                          UserRepository userRepository,
                          BoardRepository boardRepository){
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.boardRepository = boardRepository;
    }

    public List<Comment> getAllList(int articleSequence) {
        BoardArticle boardArticle= boardRepository.findOneByArticleSequence(articleSequence);
        return commentRepository.findByBoardArticle(boardArticle);
    }

    @PrePersist // 데이터 생성이 이루어질때 사전 작업
    public void writeComment(CommentReq commentReq) {
        User user = userRepository.findByUserSequence(commentReq.getUserSequence());
        BoardArticle boardArticle = boardRepository.findOneByArticleSequence(commentReq.getArticleSequence());

        Comment comment = Comment.builder()
                .user(user)
                .boardArticle(boardArticle)
                .contents(commentReq.getContents())
                .goodCount(0)
                .open(0)
                .registerTime(String.valueOf(LocalDateTime.now())).build();
        commentRepository.save(comment);
    }

    public int deleteCommentAll(int noticeSequence) {
        User user = userRepository.findByUserSequence(noticeSequence);
        BoardArticle boardArticle = boardRepository.findOneByArticleSequence(noticeSequence);

        return commentRepository.deleteByBoardArticle(boardArticle);
    }

    public void modify(Comment cur) {
        cur = Comment.builder().goodCount(cur.getGoodCount()+1).build();
        commentRepository.save(cur);
    }

    public int deleteComment(int commentSequence) {
        return commentRepository.deleteByCommentSequence(commentSequence);
    }

    public Comment findCommentCount(Integer commentSequence) {
        return commentRepository.findById(commentSequence).get();
    }
}
