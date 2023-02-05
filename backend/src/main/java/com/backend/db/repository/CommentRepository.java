package com.backend.db.repository;

import com.backend.db.entity.BoardArticle;
import com.backend.db.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface
CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByBoardArticle(BoardArticle boardArticle);

    int deleteByBoardArticle(BoardArticle boardArticle);

    int deleteByCommentSequence(int commentSequence);

    Comment findByCommentSequence(Integer commentSequence);
}
