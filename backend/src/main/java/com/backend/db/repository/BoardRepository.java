package com.backend.db.repository;

import com.backend.db.entity.BoardArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardArticle, String> {

    BoardArticle findOneByArticleSequence(Integer articleSequence);
    int deleteByArticleSequence(Integer articleSequence);
    List<BoardArticle> findByDiv(Integer div);
}
