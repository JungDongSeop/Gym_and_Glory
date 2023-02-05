package com.backend.api.service;

import com.backend.api.request.ReportReq;
import com.backend.db.entity.Report;
import com.backend.db.entity.User;
import com.backend.db.repository.ReportRepository;
import com.backend.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportService {

    private ReportRepository reportRepository;
    private UserRepository userRepository;
    @Autowired
    public ReportService(ReportRepository reportRepository,UserRepository userRepository){
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
    }


    public void addReport(ReportReq reportReq) {
        User sendUser =userRepository.findByUserSequence(reportReq.getSendSequence());
        User getUser =userRepository.findByUserSequence(reportReq.getGetSequence());
        Report report = Report.builder()
                .sendUser(sendUser)
                .getUser(getUser)
                .kind(reportReq.getKind())
                .confirmation(0)
                .contents(reportReq.getContents())
                .registerTime(String.valueOf(LocalDateTime.now())).build();
        reportRepository.save(report);
    }


    //관리자용
    public List<Report> getList() {
        return reportRepository.findAll();
    }

    public void deleteOne(Integer reportSequence) {
        reportRepository.deleteByReportSequence(reportSequence);
    }

    public Report getOne(Integer reportSequence) {
        return reportRepository.findByReportSequence(reportSequence);
    }

    public List<Report> getListByUser(Integer userSequence) {
        User user = userRepository.findByUserSequence(userSequence);
        return reportRepository.findBySendUser(user);
    }

    public void confirmReport(Integer reportSequence) {
        Report report = reportRepository.findByReportSequence(reportSequence);
        report.setConfirmation(1);
        reportRepository.save(report);
    }
}
