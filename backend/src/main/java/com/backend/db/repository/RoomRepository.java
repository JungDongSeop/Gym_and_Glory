package com.backend.db.repository;

import com.backend.api.response.RoomRes;
import com.backend.db.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.List;
@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query( "select new com.backend.api.response.RoomRes(r.id, r.title, r.teamName," +
            "r.privateStatus, r.password, r.roomStatus, r.count, r.sessionKey) " +
            "from Room r" +
            "order by r.roomStatus, r.id asc"
    )
    List<RoomRes> findRoomResList();

    List<Room> findByTitleContaining(String roomTitle); // 방 제목으로 데이터를 조회

}
