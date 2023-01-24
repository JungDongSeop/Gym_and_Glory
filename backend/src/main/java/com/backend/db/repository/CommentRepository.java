package com.backend.db.repository;

import com.backend.db.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface
CommentRepository extends JpaRepository<Comment, String> {
    List<Comment> findByArticleSequence(int articleSequence);

    int deleteByArticleSequence(int articleSequence);

//    Comment findByArticleSequnceAndCommentSeqeunce(int noticeSequence, int commentSequence);
}
