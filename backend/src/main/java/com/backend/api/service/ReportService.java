package com.backend.api.service;

import com.backend.api.request.ReportReq;
import com.backend.db.entity.Report;
import com.backend.db.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportService {

    ReportRepository reportRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository){
        this.reportRepository = reportRepository;
    }


    public void addReport(ReportReq reportReq) {
        Report report = Report.builder()
                .sendSequence(reportReq.getSendSequence())
                .getSequence(reportReq.getGetSequence())
                .kind(reportReq.getKind())
                .contents(reportReq.getContents())
                .registerTime(String.valueOf(LocalDateTime.now())).build();
        reportRepository.save(report);
    }

    public List<Report> getList() {
        return reportRepository.findAll();
    }

    public void deleteOne(Integer reportSequence) {
        reportRepository.deleteByReportSequence(reportSequence);
    }

    public Report getOne(Integer reportSequence) {
        return reportRepository.findByReportSequence(reportSequence);
    }
}
