package com.backend.db.repository;

import com.backend.api.response.RoomRes;
import com.backend.db.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

//    @Query( "select r " +
//            "from Room r " +
//            "order by r.roomStatus"
//    )
//    List<Room> findRoomResList();

    List<Room> findByTitleContaining(String roomTitle); // 방 제목으로 데이터를 조회

}
