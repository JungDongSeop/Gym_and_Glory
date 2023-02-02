package com.backend.db.repository;

import com.backend.db.entity.SendFriend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface SendFriendRepository extends JpaRepository<SendFriend,Integer> {

    @Modifying//이유는 잘모르지만 삭제에는 이게 붙어야합니다
    @Transactional
    @Query("DELETE FROM SendFriend AS m WHERE m.sendSequence=:send AND m.getSequence=:get")
    void deleteSendingList(@Param("send") Integer send,@Param("get") Integer get);
}
