package com.backend.db.repository;

import com.backend.db.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report,String> {

    void deleteByReportSequence(Integer reportSequence);

    Report findByReportSequence(Integer reportSequence);

    List<Report> findBySendSequence(Integer userSequence);
}
