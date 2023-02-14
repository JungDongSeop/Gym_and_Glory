package com.backend.db.repository;


import com.backend.api.response.FrdRes;
import com.backend.api.response.TeamLogRes;
import com.backend.db.entity.TeamLog;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Tuple;
import java.util.List;

@Repository
public interface TeamLogRepository extends JpaRepository<TeamLog,Integer> {

    // 팀 랭킹 조회( 상위 10개 )
    @Query(value = "select a.team_name, sec_to_time(a.clear_time), group_concat(c.nickname separator ', ') as users " +
            "from teamlog a " +
            "join teamlog_item b on a.team_sequence = b.team_sequence " +
            "left outer join user c on b.user_sequence = c.user_sequence " +
            "group by a.team_sequence " +
            "order by a.clear_time " +
            "limit 10 ", nativeQuery = true)
    List<Tuple> findTeamRankigList();
}
