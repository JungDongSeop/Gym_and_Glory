package com.backend.db.repository;

import com.backend.api.response.FrdRes;
import com.backend.db.entity.Friend;
import com.backend.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend,Integer> {

    // 보낸 친구 목록
    @Query("select new com.backend.api.response.FrdRes( " +
            "f.user.userSequence, f.frdUser.userSequence, f.user.nickname, f.frdUser.nickname ) " +
            "from Friend f " +
            "where f.isReceive = false " +
            "and f.user.userSequence=:sendId")
    List<FrdRes> findSendFrdResList(@Param("sendId") Integer sendId);

    // 받은 친구 목록
    @Query("select new com.backend.api.response.FrdRes( " +
            "f.user.userSequence, f.frdUser.userSequence, f.user.nickname, f.frdUser.nickname ) " +
            "from Friend f " +
            "where f.isReceive = false " +
            "and f.frdUser.userSequence=:recvId")
    List<FrdRes> findRecvFrdResList(@Param("recvId") Integer recvId);

    // 현재 친구 테이블에 있는지 확인
    @Query ("select f " +
            "from Friend f " +
            "where f.user.userSequence = :userId " +
            "and f.frdUser.userSequence = :frdId " +
            "and f.isReceive = false ")
    Friend findByFrd(@Param("userId") Integer userId, @Param("frdId") Integer frdId);

    // 수락해서 친구 된 목록 조회
    @Query(value = "select a.user_sequence, a.frd_user_id, 'none', b.nickname " +
            "from friends a " +
            "join user b on a.frd_user_id = b.user_sequence " +
            "where a.user_sequence = :userId " +
            "and a.is_rev = true " +
            "union all " +
            "select a.frd_user_id, a.user_sequence, 'none', b.nickname " +
            "from friends a " +
            "join user b on a.user_sequence = b.user_sequence " +
            "where a.frd_user_id = :userId " +
            "and a.is_rev = true", nativeQuery = true)
    List<FrdRes> findFrindList(@Param("userId") Integer userid);
}
