package com.backend.api.service;

import com.backend.db.entity.*;
import com.backend.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoodService {

    private final BoardGoodRepository boardGoodRepository;
    private final CommentGoodRepository commentGoodRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    @Autowired
    public GoodService(BoardGoodRepository boardGoodRepository,
                       CommentGoodRepository commentGoodRepository,
                       CommentRepository commentRepository,
                       UserRepository userRepository,
                       BoardRepository boardRepository,
                       BoardService boardService) {
        this.boardGoodRepository = boardGoodRepository;
        this.commentGoodRepository = commentGoodRepository;
        this.commentRepository =   commentRepository;
        this.userRepository = userRepository;
        this.boardRepository=boardRepository;
    }


    public Boolean findBoardGood(User user , BoardArticle article) {
        BoardGood boardGood= boardGoodRepository.findByUserAndArticle(user,article);
        if(boardGood!=null){//있으면 false
            return false;
        }
        return true;//없으면 true
    }

    public void addGoodBoard(Integer userSequence, Integer articleSequence) {
        User user = userRepository.findById(userSequence).get();
        BoardArticle boardArticle = boardRepository.findOneByArticleSequence(articleSequence);
        BoardGood boardGood = BoardGood.builder().user(user).article(boardArticle).build();
        boardGoodRepository.save(boardGood);
    }

    public void minusGoodBoard(Integer userSequence, Integer articleSequence) {
        User user = userRepository.findById(userSequence).get();
        BoardArticle boardArticle = boardRepository.findById(articleSequence).get();
        BoardGood boardGood = boardGoodRepository.findByUserAndArticle(user,boardArticle);
        boardArticle.setGoodCount(boardArticle.getGoodCount()-1);
        boardGoodRepository.delete(boardGood);
    }

    public CommentGood findCommentGood(Integer userSequence, Integer commentSequence) {
        return commentGoodRepository.findByUserSequenceAndCommentSequence(userSequence,commentSequence);
    }

    public void addGoodComment(Integer userSequence, Integer commentSequence) {
        CommentGood commentGood = CommentGood.builder().userSequence(userSequence).commentSequence(commentSequence).build();
        commentGoodRepository.save(commentGood);

        Comment comment = commentRepository.findByCommentSequence(commentSequence);
        comment.setGoodCount(comment.getGoodCount()+1);
        commentRepository.save(comment);
    }


    public void minusGoodComment(Integer userSequence, Integer commentSequence) {
        CommentGood commentGood = commentGoodRepository.findByUserSequenceAndCommentSequence(userSequence,commentSequence);
        commentGoodRepository.delete(commentGood);
        Comment comment = commentRepository.findById(commentSequence).get();
        comment.setGoodCount(comment.getGoodCount()-1);
        commentRepository.save(comment);
    }
}
