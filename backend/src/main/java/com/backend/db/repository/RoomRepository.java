package com.backend.db.repository;

import com.backend.db.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.List;
@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByTitleContaining(String roomTitle); // 방 제목으로 데이터를 조회

}
