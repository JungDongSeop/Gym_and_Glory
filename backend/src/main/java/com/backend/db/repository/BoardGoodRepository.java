package com.backend.db.repository;

import com.backend.db.entity.BoardArticle;
import com.backend.db.entity.BoardGood;
import com.backend.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardGoodRepository extends JpaRepository<BoardGood,Integer> {

    @Query("SELECT m from BoardGood m where m.user=:user AND m.article=:article")
    BoardGood findByUserAndArticle(User user , BoardArticle article);

}
