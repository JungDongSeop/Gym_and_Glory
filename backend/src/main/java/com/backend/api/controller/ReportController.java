package com.backend.api.controller;

import com.backend.api.request.ReportReq;
import com.backend.api.service.ReportService;
import com.backend.db.entity.Report;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/report")
public class ReportController {

    private ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService){
        this.reportService = reportService;
    }

    @PostMapping
    public ResponseEntity<?> registerReport(@RequestBody ReportReq reportReq){

        reportService.addReport(reportReq);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getList(){
        List<Report> list = reportService.getList();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/user/{userSequence}")
    public ResponseEntity<?> getListByUser(@PathVariable Integer userSequence){
        List<Report> list = reportService.getListByUser(userSequence);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/confirm/{reportSequence}")
    public ResponseEntity<?> confirm(@PathVariable Integer reportSequence){
        reportService.confirmReport(reportSequence);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{reportSequence}")
    public ResponseEntity<?> getDetail(@PathVariable Integer reportSequence){
        Report report = reportService.getOne(reportSequence);
        return new ResponseEntity<>(report,HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/{reportSequence}")
    public ResponseEntity<?> deleteReport(@PathVariable Integer reportSequence){
        //아마 신고는 관리자만 봐야하니까 따로 권한 설정을
        //안해도 되지 않을까요?
        reportService.deleteOne(reportSequence);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
