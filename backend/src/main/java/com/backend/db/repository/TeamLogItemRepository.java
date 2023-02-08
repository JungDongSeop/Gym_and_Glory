package com.backend.db.repository;

import com.backend.db.entity.TeamLog;
import com.backend.db.entity.TeamLogItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamLogItemRepository extends JpaRepository<TeamLogItem,Integer> {

}
