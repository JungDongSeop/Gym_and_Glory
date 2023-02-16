
package com.backend.api.service;

import com.backend.api.request.ReportReq;
import com.backend.db.entity.Report;
import com.backend.db.entity.User;
import com.backend.db.repository.ReportRepository;
import com.backend.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
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
        System.out.println(reportSequence.getClass().getName());
        Report report = reportRepository.findById(reportSequence).get();
        report.setConfirmation(1);
        reportRepository.save(report);
    }

    public List<Report> getDivReport(String email) {
        User user = userRepository.findOneByEmail(email);
        List<Report> list= new ArrayList<>();
        String cur = user.getRole();
        if(user.getRole().equals("ROLE_ADMIN")){
            list = reportRepository.findAllByConfirmation(0);
        } else {
            list = reportRepository.findBySendUser(user);
        }
        return list;
    }
}