package com.backend.db.repository;

import com.backend.db.entity.FileUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileUserRepository extends JpaRepository<FileUser,Integer> {
    Optional<FileUser> findByUserSequence(Integer userSequence);
    void deleteByUserSequence(Integer userSequence);
}
