package com.backend.api.service;

import com.backend.db.entity.Friend;
import com.backend.db.entity.SendFriend;
import com.backend.db.repository.FriendRepository;
import com.backend.db.repository.SendFriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FriendService {

    FriendRepository friendRepository;
    SendFriendRepository sendFriendRepository;

    @Autowired
    public FriendService(FriendRepository friendRepository,SendFriendRepository sendFriendRepository){
        this.friendRepository = friendRepository;
        this.sendFriendRepository = sendFriendRepository;
    }

    public void send(Integer send, Integer get) {
        SendFriend sendFriend = new SendFriend(send,get);
        sendFriendRepository.save(sendFriend);
    }

    public void accept(Integer send, Integer get) {
        Friend friend1 = new Friend(send,get);
        Friend friend2 = new Friend(get,send);
        friendRepository.save(friend1);
        friendRepository.save(friend2);
    }

    public void delete(Integer send, Integer get) {
        SendFriend sendFriend = new SendFriend(send,get);
        sendFriendRepository.deleteSendingList(send,get);
    }
}
