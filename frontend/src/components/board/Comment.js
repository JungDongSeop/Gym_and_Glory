import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentDetail from './CommentDetail';
import axios from 'axios';
import './Comment.module.css';
// import { useNavigate } from 'react-router-dom';

const Comment = () => {
  // Link 쓰기 위한 네비게이터
  // const navigate = useNavigate();  

  // url params 받아오는 변수
  const { articleSequence } = useParams();

  // 유저 정보 redux에서 받아오기
  const user = useSelector((state) => state.user);

  // 댓글 읽기 위한 state
  const [comments, setComments] = useState([]);
  // 댓글 쓰기 위한 state
  const [newComment, setNewComment] = useState({'userSequence': user.pk, contents: ''});


  // 댓글 read axios 요청
  const commentRead = (articleSequence) => {
    axios.get(`/board/comment/${articleSequence}`)
      .then(response => {
      setComments(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  ;}
  useEffect(() => {
    commentRead(articleSequence);
  }, [articleSequence]);

  // 댓글 create axios 요청
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("댓글이 작성되었습니다.")

    axios.post(`/board/comment`, {
      "userSequence": user.pk,
      "articleSequence": articleSequence,
      "contents": newComment.contents
    })
    .then(response => {
      setComments([...comments, response.data]);
      setNewComment({title: '', text: ''});
      commentRead(articleSequence);
    })
    .catch(error => {
      console.log(error);
    });
  }

  // 댓글 입력 값 변경 시 작동
  const handleChange = (e) => {
    setNewComment({...newComment, [e.target.name]: e.target.value});
  }

  return (
    <div>
      <h2>
        댓글 기능 구현합시다.
      </h2>

      {/* 댓글 달기 */}
      <form onSubmit={handleSubmit}>
        <label>
          내용:
          <textarea name="contents" value={newComment.contents} onChange={handleChange} required />
        </label>
        <br />
        <input type="submit" value="제출" />
      </form>

      {/* 댓글 목록 axios 요청 */}
      {comments.map((comment, index) => (
        <ul key={index}>
          <CommentDetail comment={comment} />
        </ul>
      ))}


    </div>
  );
};

export default Comment;
