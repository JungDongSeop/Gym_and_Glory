package com.backend.api.controller;

import com.backend.api.request.CommentReq;
import com.backend.api.service.CommentService;
import com.backend.api.service.GoodService;
import com.backend.db.entity.BoardGood;
import com.backend.db.entity.Comment;
import com.backend.db.entity.CommentGood;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@Transactional
@RequestMapping("/api/board/comment")
@CrossOrigin("*")
public class CommentController {

    private final CommentService commentService;
    private final GoodService goodService;

    @Autowired
    public CommentController(CommentService commentService, GoodService goodService) {
        this.commentService = commentService;
        this.goodService = goodService;
    }

    //댓글 쓰기
    @PostMapping
    public ResponseEntity write(@RequestBody CommentReq commentReq) {
        commentService.writeComment(commentReq);
        return new ResponseEntity("글쓰기 완료", HttpStatus.OK);
    }

    //댓글 삭제
    @DeleteMapping("/{commentSequence}")
    public ResponseEntity delete(@PathVariable int commentSequence) {
        int flag = commentService.deleteComment(commentSequence);
        if (flag == 1)
            return new ResponseEntity("삭제 완료", HttpStatus.OK);
        else
            return new ResponseEntity("삭제 실패", HttpStatus.OK);
    }

    //댓글 리스트 받아오기
    @GetMapping("/{articleSequence}")
    public List<Comment> getList(@PathVariable int articleSequence) {
        List<Comment> commentList = commentService.getAllList(articleSequence);
        return commentList;
    }

    //댓글에 좋아요 누르기
    @GetMapping("/good/{userSequence}/{commentSequence}")
    public ResponseEntity<?> commentGood(@PathVariable Integer userSequence, @PathVariable Integer commentSequence) {

        CommentGood flag = goodService.findCommentGood(userSequence, commentSequence);

        if (flag == null) {
            goodService.addGoodComment(userSequence, commentSequence);
        }else{
            goodService.minusGoodComment(userSequence, commentSequence);
        }

        Comment comment = commentService.findCommentCount(commentSequence);

        return new ResponseEntity<>(comment.getGoodCount(),HttpStatus.OK);
    }

    @GetMapping("/IsGood/{userSequence}/{commentSequence}")
    public ResponseEntity<?> IsCommentGood(@PathVariable Integer userSequence, @PathVariable Integer commentSequence) {
        CommentGood flag = goodService.findCommentGood(userSequence, commentSequence);
        System.out.println(flag);
        if(flag==null){
            return new ResponseEntity<>(false,HttpStatus.OK);
        }
        return new ResponseEntity<>(true,HttpStatus.OK);
    }

}