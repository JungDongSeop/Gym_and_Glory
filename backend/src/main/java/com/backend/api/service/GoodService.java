package com.backend.api.service;

import com.backend.db.entity.*;
import com.backend.db.repository.BoardGoodRepository;
import com.backend.db.repository.CommentGoodRepository;
import com.backend.db.repository.CommentRepository;
import com.backend.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoodService {

    private BoardGoodRepository boardGoodRepository;
    private CommentGoodRepository commentGoodRepository;
    private CommentRepository commentRepository;
    private UserRepository userRepository;
    private BoardService boardService;
    @Autowired
    public GoodService(BoardGoodRepository boardGoodRepository,
                       CommentGoodRepository commentGoodRepository,
                       CommentRepository commentRepository,
                       UserRepository userRepository,
                       BoardService boardService) {
        this.boardGoodRepository = boardGoodRepository;
        this.commentGoodRepository = commentGoodRepository;
        this.commentRepository =   commentRepository;
        this.userRepository = userRepository;
        this.boardService = boardService;
    }


    public BoardGood findBoardGood(User user , BoardArticle article) {
        return boardGoodRepository.findByUserAndArticle(user,article);
    }

    public void addGoodBoard(Integer userSequence, Integer articleSequence) {
        User user = userRepository.findById(userSequence).get();
        BoardArticle boardArticle = boardService.boardRepository.findOneByArticleSequence(articleSequence);
        System.out.println("여기들어오나?");
        BoardGood boardGood = BoardGood.builder().user(user).article(boardArticle).build();
        boardGoodRepository.save(boardGood);
    }

    public CommentGood findCommentGood(Integer userSequence, Integer commentSequence) {
        return commentGoodRepository.findByUserSequenceAndCommentSequence(userSequence,commentSequence);
    }

    public void addGoodComment(Integer userSequence, Integer commentSequence) {
        CommentGood commentGood = CommentGood.builder().userSequence(userSequence).commentSequence(commentSequence).build();
        Comment comment = commentRepository.findByCommentSequence(commentSequence);
        comment.setGoodCount(comment.getGoodCount()+1);
        commentRepository.save(comment);
        commentGoodRepository.save(commentGood);
    }
}
