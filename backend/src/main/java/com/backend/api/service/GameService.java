package com.backend.api.service;

import com.backend.db.constant.RoomStatus;
import com.backend.db.entity.Room;
import com.backend.db.exception.NoGameStartException;
import com.backend.db.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
@Transactional
@RequiredArgsConstructor
public class GameService {
    private final RoomRepository roomRepository;

    public Room modifyRoomStatus(String sessionKey) {
        Room room = roomRepository.findBySessionKey(sessionKey);
        if(room == null) {
            throw new EntityNotFoundException("현재 시작할 방이 없습니다..");
        }
        else {
            if(room.getRoomStatus() == RoomStatus.START) {
                throw new NoGameStartException("게임이 진행중입니다.");
            }
           room.modifyRoomStatus(RoomStatus.START); // 게임 시작 상태로 바꾼다.
           roomRepository.save(room); // 저장한다.
        }
//        room.modifyRoomStatus(RoomStatus.START); // 게임시작으로 상태 변경
//        roomRepository.save(room);
//        return 1;
        return room;
    }
}
