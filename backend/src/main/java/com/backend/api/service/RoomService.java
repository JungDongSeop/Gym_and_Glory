package com.backend.api.service;

import com.backend.api.request.RoomReq;
import com.backend.api.response.RoomRes;
import com.backend.db.entity.Room;
import com.backend.db.repository.RoomRepository;
import com.backend.db.repository.UserRepository;
import com.backend.util.RandomNumberUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import javax.persistence.EntityNotFoundException;

import java.util.List;
import java.util.ArrayList;
@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;


    // 방 만들기
    public String addRoom(RoomReq roomReq) {
        Room room = Room.createRoom(roomReq, RandomNumberUtil.getRandomNumber());
        roomRepository.save(room);
        return room.getSessionKey(); //방에 접근할 수 있도록 세션 키 정보를 넘겨준다.
    }

    // 전체 방 조회
    @Transactional(readOnly = true)
    public List<Room> getRoomList() {

        List<Room> roomList = roomRepository.findAll();

        return roomList;
    }

    // 페이징 조회
    @Transactional(readOnly = true)
    public Page<Room> getRoomList(Pageable pageable) {
        List<Room> rooms = roomRepository.findRooms(pageable);
        Long totalCount = roomRepository.count();

        return new PageImpl<Room>(rooms, pageable, totalCount);
    }

    // 선택한 방 들어가기
    public int enterRoom(String sessionKey) {
        // 방 세션을 통해 방을 찾는다.
        Room room = roomRepository.findBySessionKey(sessionKey);

        if(room == null) {
            throw new EntityNotFoundException("선택하신 방은 존재하지 않습니다.");
        }

        room.addCount(1); // 한명의 사람이 들어간다.
        roomRepository.save(room); // 인원수 갱신
        return 1; // 방에 들어갔으면 성공
    }

    public void leaveRoom(String sessionKey) {

        // 세션키로 방을 찾는다.
        Room room = roomRepository.findBySessionKey(sessionKey);

        room.removeCount(1); // 한 명의 사람이 나간다.

        // 만약에 방에 사람이 없다면
        if(room.getCount() == 0) {
            roomRepository.delete(room); // 현재 방을 삭제한다.
        }
    }
}
