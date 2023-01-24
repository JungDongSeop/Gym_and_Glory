package com.backend.api.service;

import com.backend.db.entity.BoardGood;
import com.backend.db.entity.CommentGood;
import com.backend.db.repository.BoardGoodRepository;
import com.backend.db.repository.CommentGoodRepository;
import com.backend.db.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoodService {

    private BoardGoodRepository boardGoodRepository;
    private CommentGoodRepository commentGoodRepository;

    @Autowired
    public GoodService(BoardGoodRepository boardGoodRepository,
                       CommentGoodRepository commentGoodRepository) {
        this.boardGoodRepository = boardGoodRepository;
        this.commentGoodRepository = commentGoodRepository;
    }


    public BoardGood findBoardGood(Integer userSequence, Integer articleSequence) {
        return boardGoodRepository.findByUserSequenceAndArticleSequence(userSequence,articleSequence);
    }

    public void addGoodBoard(Integer userSequence, Integer articleSequence) {
        System.out.println("여기들어오나?");
        BoardGood boardGood = new BoardGood(userSequence,articleSequence);
        boardGoodRepository.save(boardGood);
    }

    public CommentGood findCommentGood(Integer userSequence, Integer commentSequence) {
        return commentGoodRepository.findByUserSequenceAndCommentSequence(userSequence,commentSequence);
    }

    public void addGoodComment(Integer userSequence, Integer commentSequence) {
        CommentGood commentGood = new CommentGood(userSequence,commentSequence);
        commentGoodRepository.save(commentGood);
    }
}
