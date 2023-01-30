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
    public List<BoardArticle> getAllList(Integer div) {

        List<BoardArticle> test = boardRepository.findByDiv(div);
        return test;
    }

    @Transactional
    public BoardArticle getOne(Integer articleSeqeunce) {

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

    public void modify( BoardPostReq boardPostReq) {
        BoardArticle cur = boardRepository.findOneByArticleSequence(boardPostReq.getArticleSequence());
        if(boardPostReq.getTitle().length()>0)
            cur.setTitle(boardPostReq.getTitle());
        if(boardPostReq.getContents().length()>0)
            cur.setContents(boardPostReq.getContents());
        cur.setRegisterTime(String.valueOf(LocalDateTime.now()));
        boardRepository.save(cur);
    }

    public void addGoodArticle(Integer articleSequence) {
        BoardArticle cur = boardRepository.findOneByArticleSequence(articleSequence);
        cur.setGoodCount(cur.getGoodCount()+1);
        boardRepository.save(cur);
    }
}
