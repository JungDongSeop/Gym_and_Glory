import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import axios from 'axios';
import './Comment.module.css';
// import { useNavigate } from 'react-router-dom';

const Comment = () => {
  // Link 쓰기 위한 네비게이터
  // const navigate = useNavigate();  

  // url params 받아오는 변수
  const { articleSequence } = useParams();

  // 유저 정보 받아오기
  const {userSequence} = useContext(AuthContext);
  const user = useContext(AuthContext);

  // 댓글 읽기 위한 state
  const [comments, setComments] = useState([]);
  // 댓글 쓰기 위한 state
  const [newComment, setNewComment] = useState({'userSequence': userSequence, contents: ''});

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
    console.log('user', user)
    commentRead(articleSequence);
  }, [articleSequence]);

  // 댓글 create axios 요청
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("댓글이 작성되었습니다.")

    axios.post(`/board/comment`, {
      "userSequence": userSequence,
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

  // 댓글 좋아요 axios 요청
  const handleGood = async (commentSequence) => {
    try {
      await axios(`/board/comment/good/${userSequence}/${commentSequence}`);
      alert('댓글을 추천하였습니다.')
      // Show a success message or refresh the comments list
      commentRead(articleSequence);
    } catch (error) {
      console.error(error);
    }
  }

  // 댓글 지우기
  const handleDelete = async (commentSequence) => {
    try {
      await axios.delete(`/board/comment/${commentSequence}`);
      alert('댓글이 삭제되었습니다.')
      // Show a success message or refresh the comments list
      commentRead(articleSequence);
    } catch (error) {
      console.error(error);
    }
  }

  // 댓글 input 값 변경 시 작동
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
          {/* 댓글 상세 표시, 댓글 좋아요, 댓글 삭제 */}
          <h1>{comment.commentSequence}, 내용 : {comment.contents} 작성자 : {comment.user ? comment.user.nickname : null}</h1>
          추천 : {comment.goodCount}. <button onClick={() => handleGood(comment.commentSequence)}>❤</button>
          <button onClick={() => handleDelete(comment.commentSequence)}>삭제</button>
      
        </ul>
      ))}
    </div>
  );
};

export default Comment;
