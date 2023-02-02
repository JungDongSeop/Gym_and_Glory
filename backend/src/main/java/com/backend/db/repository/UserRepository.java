package com.backend.db.repository;

import com.backend.db.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

    @Query("select u from User u where u.userSequence not in " +
            "(select f.getSequence from Friend f where f.sendSequence =:userSequence)")
    List<User> findUser(Integer userSequence);

    User findByTelNumber(String telNum);
}
