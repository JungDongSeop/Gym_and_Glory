package com.backend.db.repository;

import com.backend.db.entity.Report;
import com.backend.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report,Integer> {

    void deleteByReportSequence(Integer reportSequence);

    Report findByReportSequence(Integer reportSequence);

    List<Report> findBySendUser(User user);
}
