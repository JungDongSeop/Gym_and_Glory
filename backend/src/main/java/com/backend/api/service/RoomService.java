package com.backend.api.service;

import com.backend.api.request.RoomReq;
import com.backend.api.response.RoomRes;
import com.backend.db.entity.Room;
import com.backend.db.repository.RoomRepository;
import com.backend.db.repository.UserRepository;
import com.backend.util.RandomNumberUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public List<RoomRes> getRoomList() {

        List<RoomRes> roomList = new ArrayList<>();

//        roomList = roomRepository.findRoomResList();

        return roomList;
    }

    // 선택한 방 들어가기
    public String enterRoom(Long roomId) {
        // 방 아이디를 통해 방을 찾는다.
        Room room = roomRepository.findById(roomId)
                .orElseThrow(EntityNotFoundException::new);
        
        room.addCount(1); // 한명의 사람이 들어간다.
        roomRepository.save(room); // 인원수 갱신
        return room.getSessionKey(); // 세션키를 돌려준다.
    }

    public void leaveRoom(Long roomId) {
        // 방 아이디를 통해 방을 찾는다.
        Room room = roomRepository.findById(roomId)
                .orElseThrow(EntityNotFoundException::new);

        room.removeCount(1); // 한 명의 사람이 나간다.

        // 만약에 방에 사람이 없다면
        if(room.getCount() == 0) {
            roomRepository.delete(room); // 현재 방을 삭제한다.
        }
        // 방장이 나갔을 경우는 어떻게 하는가..?
    }
}
