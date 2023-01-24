package com.backend.db.repository;

import com.backend.db.entity.BoardGood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardGoodRepository extends JpaRepository<BoardGood,String> {

    @Query("SELECT m from BoardGood m where m.userSequence=:userSequence AND m.articleSequence=:articleSequence")
    BoardGood findByUserSequenceAndArticleSequence(Integer userSequence, Integer articleSequence);

}
