package com.backend.api.service;

import com.backend.api.request.BoardPostReq;
import com.backend.api.request.WriteReq;
import com.backend.db.entity.BoardArticle;
import com.backend.db.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    @Autowired
    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }



    @Transactional
    public List<BoardArticle> getAllList(Integer userSequence) {

        List<BoardArticle> test = boardRepository.findAll();
        return boardRepository.findAll();
    }

    @Transactional
    public BoardArticle getOne(Integer articleSeqeunce) {

        BoardArticle boardArticle = boardRepository.findOneByArticleSequence(articleSeqeunce);
        boardRepository.save(boardArticle);
        return boardRepository.findOneByArticleSequence(articleSeqeunce);
    }


    public Integer delete(Integer articleSeqeunce) {
        return boardRepository.deleteByArticleSequence(articleSeqeunce);
    }

    @Transactional
    public BoardArticle writeArticle(WriteReq writeReq) {

        BoardArticle boardArticle = BoardArticle.builder()
                .title(writeReq.getTitle())
                .userSequence(writeReq.getUserSequence())
                .contents(writeReq.getContents())
                .registerTime(String.valueOf(LocalDateTime.now()))
                .modify_time(String.valueOf(LocalDateTime.now()))
                .views(0).goodCount(0).div(writeReq.getDiv()).
                build();

        return boardRepository.save(boardArticle);
    }

    public void modify(BoardArticle cur, BoardPostReq boardPostReq) {
        cur = BoardArticle.builder()
                .articleSequence(boardPostReq.getArticleSequence())
                .title(boardPostReq.getTitle())
                .contents(boardPostReq.getContents()).build();
        boardRepository.save(cur);
    }

    public void addGoodArticle(Integer articleSequence) {
        BoardArticle cur = boardRepository.findOneByArticleSequence(articleSequence);
        cur = BoardArticle.builder().goodCount(cur.getGoodCount()+1).build();
    }
}
