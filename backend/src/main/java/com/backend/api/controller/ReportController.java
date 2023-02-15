package com.backend.api.controller;

import com.backend.api.request.ReportReq;
import com.backend.api.service.ReportService;
import com.backend.db.entity.Report;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/report")
@CrossOrigin("*")
public class ReportController {

    private ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService){
        this.reportService = reportService;
    }

    //신고 접수
    @PostMapping
    public ResponseEntity<?> registerReport(@RequestBody ReportReq reportReq){

        reportService.addReport(reportReq);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //신고 권한에 따라서 다른 리스트를 뿌려줌
    @GetMapping("/user/{email}")
    public ResponseEntity<?> getReport(@PathVariable String email){
        System.out.println("앙냥냥"+email);
        List<Report> list = reportService.getDivReport(email);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }


    //신고한 것 확인하기, 확인 후 매너온도 내려감
    @GetMapping("/confirm/{reportSequence}")
    public ResponseEntity<?> confirm(@PathVariable Integer reportSequence){
        reportService.confirmReport(reportSequence);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //신고 자세히 보기
    @GetMapping("/{reportSequence}")
    public ResponseEntity<?> getDetail(@PathVariable Integer reportSequence){
        Report report = reportService.getOne(reportSequence);
        return new ResponseEntity<>(report,HttpStatus.OK);
    }

    //신고한 거 지우기
    @Transactional
    @DeleteMapping("/{reportSequence}")
    public ResponseEntity<?> deleteReport(@PathVariable Integer reportSequence){
        reportService.deleteOne(reportSequence);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}