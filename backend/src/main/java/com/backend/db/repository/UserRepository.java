package com.backend.db.repository;

import com.backend.db.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findOneByEmail(String email);
    List<User> findAllByEmail(String email);
    List<User> findAllByNickname(String nickname);
    void deleteByUserSequence(int userSequence);
    User findByUserSequence(Integer userSequence);
}
