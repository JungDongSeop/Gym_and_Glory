package com.backend.db.repository;

import com.backend.db.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend,Integer> {
    List<Friend> findByGetSequence(Integer userSequence);
}
