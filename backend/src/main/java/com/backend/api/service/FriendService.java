package com.backend.api.service;

import com.backend.db.entity.Friend;
import com.backend.db.entity.SendFriend;
import com.backend.db.repository.FriendRepository;
import com.backend.db.repository.SendFriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

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
        SendFriend sendFriend = new SendFriend();
        sendFriend.setSendSequence(send);
        sendFriend.setGetSequence(get);
        sendFriendRepository.save(sendFriend);
    }

    public void accept(Integer send, Integer get) {

        Friend friend1 = Friend.builder().sendSequence(send).getSequence(get).build();
        Friend friend2 = Friend.builder().sendSequence(get).getSequence(send).build();

        friendRepository.save(friend1);
        friendRepository.save(friend2);
    }

    public void delete(Integer send, Integer get) {
        SendFriend sendFriend = new SendFriend();
        sendFriend.setSendSequence(send);
        sendFriend.setGetSequence(get);
        sendFriendRepository.deleteSendingList(send,get);
    }

    public List<Friend> getList(Integer userSequence) {
        return friendRepository.findByGetSequence(userSequence);
    }

    @Transactional
    public void deleteFriend(Integer getSequence, Integer sendSequence) {
        friendRepository.deleteByGetSequenceAndSendSequence(getSequence,sendSequence);
        friendRepository.deleteByGetSequenceAndSendSequence(sendSequence,getSequence);
    }
}
