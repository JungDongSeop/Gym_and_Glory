package com.backend.db.repository;

import com.backend.db.entity.BoardArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<BoardArticle, String> {

    BoardArticle findOneByArticleSequence(Integer articleSequence);
    int deleteByArticleSequence(Integer articleSequence);
}
