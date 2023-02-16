package com.backend.api.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.backend.api.request.ReportReq;
import com.backend.api.service.ReportService;
import com.backend.db.entity.BoardArticle;
import com.backend.db.entity.Report;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/report")
@CrossOrigin("*")
public class ReportController {

    private String S3Bucket = "pliot1017-bucket"; // Bucket 이름

    @Autowired
    AmazonS3Client amazonS3Client;


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
        System.out.println("삭제 들어옴" );
        reportService.deleteOne(reportSequence);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/file/{reportSequence}")
    public ResponseEntity<Object> upload(@RequestParam("files") MultipartFile[] multipartFileList,
                                         @PathVariable Integer reportSequence) throws Exception {
        List<String> imagePathList = new ArrayList<>();

        for(MultipartFile multipartFile: multipartFileList) {
            String originalName = multipartFile.getOriginalFilename(); // 파일 이름
            long size = multipartFile.getSize(); // 파일 크기

            ObjectMetadata objectMetaData = new ObjectMetadata();
            objectMetaData.setContentType(multipartFile.getContentType());
            objectMetaData.setContentLength(size);

            // S3에 업로드
            amazonS3Client.putObject(
                    new PutObjectRequest(S3Bucket, originalName, multipartFile.getInputStream(), objectMetaData)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );

            String imagePath = amazonS3Client.getUrl(S3Bucket, originalName).toString(); // 접근가능한 URL 가져오기
            imagePathList.add(imagePath);
        }
        reportService.setImagePath(reportSequence,imagePathList.get(0));
        return new ResponseEntity<Object>(imagePathList, HttpStatus.OK);
    }

    @GetMapping("/file/{reportSequence}")
    public String getBoard(@PathVariable Integer reportSequence) {
        Report report = reportService.getOne(reportSequence);
        return "<img src=" +report.getImagePath() +">";
    }

}