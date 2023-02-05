package com.backend.api.service;

import com.backend.api.request.RoomReq;
import com.backend.db.entity.Room;
import com.backend.db.repository.RoomRepository;
import com.backend.db.repository.UserRepository;
import com.backend.util.RandomNumberUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;


    public String addRoom(RoomReq roomReq) {
        Room room = Room.createRoom(roomReq, RandomNumberUtil.getRandomNumber());
        roomRepository.save(room);
        return room.getSession_key(); //방에 접근할 수 있도록 세션 키 정보를 넘겨준다.
    }
}
