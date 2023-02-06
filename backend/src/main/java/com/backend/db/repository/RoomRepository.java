package com.backend.db.repository;

import com.backend.api.response.RoomRes;
import com.backend.db.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByTitleContaining(String roomTitle); // 방 제목으로 데이터를 조회

    Room findBySessionKey(String sessionKey); // 방 세션 키로 데이터를 조회
    
    // 페이징 조건에 맞추어 조회
    @Query("select r from Room r ")
    List<Room> findRooms(Pageable pageable);
}
