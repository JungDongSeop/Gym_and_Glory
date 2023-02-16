package com.backend.api.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.backend.api.request.BoardPostReq;
import com.backend.api.request.WriteReq;
import com.backend.api.service.BoardService;
import com.backend.api.service.GoodService;
import com.backend.api.service.UserService;
import com.backend.db.entity.BoardArticle;
import com.backend.db.entity.BoardGood;
import com.backend.db.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/board")
@CrossOrigin("*")
public class BoardController {

    private String S3Bucket = "pliot1017-bucket"; // Bucket 이름

    @Autowired
    AmazonS3Client amazonS3Client;
    private BoardService boardService;
    private GoodService goodService;
    private UserService userService;


    @Autowired
    public BoardController(UserService userService,BoardService boardService,GoodService goodService) {
        this.boardService = boardService;
        this.goodService =goodService;
        this.userService = userService;
    }


    //글쓰기
    @PostMapping
    public ResponseEntity write(@RequestBody WriteReq writeReq){
        boardService.writeArticle(writeReq);

        return new ResponseEntity(HttpStatus.OK);
    }

    //글 디테일한 정보 조회
    @GetMapping("/{articleSeqeunce}")
    public ResponseEntity<?> detail(@PathVariable Integer articleSeqeunce){
        BoardArticle boardArticle = boardService.getOne(articleSeqeunce);
        return new ResponseEntity<BoardArticle>(boardArticle,HttpStatus.OK);
    }

    //글 수정
    @Transactional
    @PutMapping
    public ResponseEntity<?> modify(@RequestBody BoardPostReq boardPostReq){
        boardService.modify(boardPostReq);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //글 삭제
    @Transactional
    @DeleteMapping("/{articleSeqeunce}")
    public ResponseEntity<?> delete(@PathVariable Integer articleSeqeunce){
        boardService.delete(articleSeqeunce);

        return new ResponseEntity("삭제 완료",HttpStatus.OK);
    }

    //글 종류 구분해서 글 목록 받아오기
    @GetMapping("/list/{div}")
    public List<BoardArticle> getList(@PathVariable Integer div){
        List<BoardArticle> boardList = boardService.getAllList(div);
        return boardList;
    }

    //게시글 좋아요
    @GetMapping("/good/{userSequence}/{articleSequence}")
    public ResponseEntity<?> boardGood(@PathVariable Integer userSequence,@PathVariable Integer articleSequence){
        User user = userService.getOne(userSequence);
        BoardArticle article = boardService.getOne(articleSequence);

        boolean flag = goodService.findBoardGood(user,article);
        if(flag==true){
            //null이면 등록하고
            goodService.addGoodBoard(userSequence,articleSequence);
            boardService.addGoodArticle(articleSequence);
        }else{
            goodService.minusGoodBoard(userSequence,articleSequence);
        }

        int cnt = boardService.getOne(articleSequence).getGoodCount();

        return new ResponseEntity<>(cnt,HttpStatus.OK);
    }

    @GetMapping("/IsGood/{userSequence}/{articleSequence}")
    public ResponseEntity<?> boardIsGood(@PathVariable Integer userSequence,@PathVariable Integer articleSequence){
        User user = userService.getOne(userSequence);
        BoardArticle article = boardService.getOne(articleSequence);
        boolean flag = goodService.findBoardGood(user,article);
        flag= !flag;
        return new ResponseEntity<>(flag,HttpStatus.OK);
    }


    @PostMapping("/file/{articleSequence}")
    public ResponseEntity<Object> upload(@RequestParam("files") MultipartFile[] multipartFileList,
                                         @PathVariable Integer articleSequence) throws Exception {
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
        boardService.setImagePath(articleSequence,imagePathList.get(0));
        return new ResponseEntity<Object>(imagePathList, HttpStatus.OK);
    }

    @GetMapping("/file/{articleSequence}")
    public String getBoard(@PathVariable Integer articleSequence) {
        BoardArticle boardArticle = boardService.getOne(articleSequence);
        return "<img src=" +boardArticle.getImagePath() +">";
    }

}
