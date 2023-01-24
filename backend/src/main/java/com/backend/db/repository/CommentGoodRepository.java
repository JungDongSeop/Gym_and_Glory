package com.backend.db.repository;

import com.backend.db.entity.CommentGood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentGoodRepository extends JpaRepository<CommentGood,String> {
    @Query("SELECT m from CommentGood m where m.userSequence=:userSequence AND m.commentSequence=:commentSequence")
    CommentGood findByUserSequenceAndCommentSequence(Integer userSequence, Integer commentSequence);
}
