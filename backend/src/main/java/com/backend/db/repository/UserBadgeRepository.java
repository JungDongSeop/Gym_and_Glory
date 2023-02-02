package com.backend.db.repository;

import com.backend.db.compositkey.UserBadgePK;
import com.backend.db.entity.User;
import com.backend.db.entity.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBadgeRepository extends JpaRepository<UserBadge, UserBadgePK> {

    List<UserBadge> findAllByUser(User user);
}
