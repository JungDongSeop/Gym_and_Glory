package com.backend.db.repository;


import com.backend.db.entity.TeamLog;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RankingRepository extends JpaRepository<TeamLog,Integer > {

    @Query("SELECT R FROM TeamLog AS R")
    List<TeamLog> orderByTime(Sort sort);
}
