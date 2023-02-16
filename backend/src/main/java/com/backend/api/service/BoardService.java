package com.backend.api.service;

import com.backend.api.request.BoardPostReq;
import com.backend.db.entity.BoardArticle;
import com.backend.db.entity.User;
import com.backend.db.repository.BoardRepository;
import com.backend.db.repository.CommentRepository;
import com.backend.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

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
        List<BoardArticle> test = boardRepository.findByDiv(div);
        return test;
    }

    @Transactional
    public BoardArticle getOne(Integer articleSeqeunce) {

        return boardRepository.findOneByArticleSequence(articleSeqeunce);
    }


    public void delete(Integer articleSeqeunce) {
        BoardArticle boardArticle = boardRepository.findById(articleSeqeunce).get();

        commentRepository.deleteByBoardArticle(boardArticle);
        boardRepository.deleteById(articleSeqeunce);

//        return boardRepository.deleteByArticleSequence(articleSeqeunce);
    }

    @Transactional
    public BoardArticle writeArticle(Integer userSequence, String title,
                                     String contents, Integer div,
                                     String imagePath) {

        User user = userRepository.findById(userSequence).get();

        BoardArticle boardArticle = BoardArticle.createBoard(title,contents,div
                ,imagePath, user);

        return boardRepository.save(boardArticle);
    }

    public void modify( BoardPostReq boardPostReq) {
        BoardArticle cur = boardRepository.findOneByArticleSequence(boardPostReq.getArticleSequence());
        cur.setTitle(boardPostReq.getTitle());
        cur.setContents(boardPostReq.getContents());
        boardRepository.save(cur);
    }

    public void addGoodArticle(Integer articleSequence) {
        BoardArticle cur = boardRepository.findOneByArticleSequence(articleSequence);
        cur.setGoodCount(cur.getGoodCount()+1);
        boardRepository.save(cur);
    }

    public void setImagePath(Integer articleSequence, String imagePath) {
        BoardArticle boardArticle= boardRepository.findOneByArticleSequence(articleSequence);
        boardArticle.setImagePath(imagePath);
        boardRepository.save(boardArticle);
    }

}
