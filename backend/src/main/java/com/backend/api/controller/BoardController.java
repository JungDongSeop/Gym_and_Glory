package com.backend.api.controller;

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

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/board")
@CrossOrigin("*")
public class BoardController {

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
        int flag = boardService.delete(articleSeqeunce);
        if(flag==1)
            return new ResponseEntity("삭제 완료",HttpStatus.OK);
        else
            return new ResponseEntity("삭제 실패",HttpStatus.OK);
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
        System.out.println(flag);
        if(flag==true){
            //null이면 등록하고
            goodService.addGoodBoard(userSequence,articleSequence);
            boardService.addGoodArticle(articleSequence);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
