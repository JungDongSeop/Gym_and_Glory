package com.backend.api.controller;

import java.util.ArrayList;
import java.util.List;

import com.backend.api.service.UserService;
import com.backend.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@RestController
@RequestMapping("/api/file")
@CrossOrigin("*")
public class FileController {

    private String S3Bucket = "pliot1017-bucket"; // Bucket 이름

    @Autowired
    AmazonS3Client amazonS3Client;
    @Autowired
    UserService userService;

    @PostMapping("/user/{userSequence}")
    public ResponseEntity<Object> upload(@RequestParam("files") MultipartFile[] multipartFileList,
                                         @PathVariable Integer userSequence) throws Exception {
        List<String> imagePathList = new ArrayList<>();
        System.out.println("======================================들어오긴 하냐?");

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
        userService.setImagePath(userSequence,imagePathList.get(0));
        return new ResponseEntity<Object>(imagePathList, HttpStatus.OK);
    }

    @GetMapping("/user/{userSequence}")
    public String getBoard(@PathVariable Integer userSequence) {
        User user= userService.getOne(userSequence);
        return "<img src=" +user.getImagePath() +">";
    }
}