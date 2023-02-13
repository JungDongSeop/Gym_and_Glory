package com.backend.api.service;

import com.backend.api.request.BoardPostReq;
import com.backend.api.request.WriteReq;
import com.backend.db.entity.BoardArticle;
import com.backend.db.entity.User;
import com.backend.db.repository.BoardRepository;
import com.backend.db.repository.CommentRepository;
import com.backend.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public BoardService(BoardRepository boardRepository,
                        UserRepository userRepository,
                        CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.boardRepository = boardRepository;
        this.commentRepository =commentRepository;
    }



    @Transactional
    public List<BoardArticle> getAllList(Integer div) {
        System.out.println("들어온다");
        List<BoardArticle> test = boardRepository.findByDiv(div);
        return test;
    }

    @Transactional
    public BoardArticle getOne(Integer articleSeqeunce) {

        return boardRepository.findOneByArticleSequence(articleSeqeunce);
    }


    public void delete(Integer articleSeqeunce) {
        System.out.println("2단계");
        BoardArticle boardArticle = boardRepository.findById(articleSeqeunce).get();
        System.out.println("3단계");
        System.out.println(boardArticle.getArticleSequence());

        commentRepository.deleteByBoardArticle(boardArticle);
        System.out.println("4단계 삭제완료");
        boardRepository.deleteById(articleSeqeunce);
        System.out.println("5단계 삭제완료");

//        return boardRepository.deleteByArticleSequence(articleSeqeunce);
    }

    @Transactional
    public BoardArticle writeArticle(WriteReq writeReq) {

        User user = userRepository.findById(writeReq.getUserSequence()).get();

        BoardArticle boardArticle = BoardArticle.createBoard(writeReq, user);

        return boardRepository.save(boardArticle);
    }

    public void modify( BoardPostReq boardPostReq) {
        BoardArticle cur = boardRepository.findOneByArticleSequence(boardPostReq.getArticleSequence());
        System.out.println(cur);
        cur.setTitle(boardPostReq.getTitle());
        cur.setContents(boardPostReq.getContents());
        boardRepository.save(cur);
    }

    public void addGoodArticle(Integer articleSequence) {
        BoardArticle cur = boardRepository.findOneByArticleSequence(articleSequence);
        cur.setGoodCount(cur.getGoodCount()+1);
        boardRepository.save(cur);
    }
}
