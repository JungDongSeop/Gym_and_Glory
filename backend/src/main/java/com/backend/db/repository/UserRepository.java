package com.backend.db.repository;

import com.backend.db.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findOneByEmail(String email);
    List<User> findAllByEmail(String email);
    List<User> findAllByNickname(String nickname);
    void deleteByUserSequence(int userSequence);
    User findByUserSequence(Integer userSequence);

    User findByNickname(String nickname);

    User findByTelNumber(String telNum);

    @Query("select u from User u where u.nickname like %:word%")
    List<User> findByNicknameLike(String word);

    // 보낸 친구, 받은 친구 다 제외하고 유저 검색될 수 있도록 유저 검색
    @Query(value = "select * from user " +
            "where user_sequence not in ( " +
            "select user_sequence from friends where frd_user_id = :userSequence) " +
            "and user_sequence not in ( " +
            "select frd_user_id from friends where user_sequence = :userSequence) " +
            "and nickName like %:nickName%", nativeQuery = true)
    List<User> findBySearchFriendNative(@Param("userSequence") Integer userSequence, @Param("nickName") String nickName);

}
