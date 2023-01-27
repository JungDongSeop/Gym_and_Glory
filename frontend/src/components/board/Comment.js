import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
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
  useEffect(() => {
      axios.get(`/board/comment/${articleSequence}`)
      .then(response => {
        setComments(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [articleSequence]);

  // 댓글 create axios 요청
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`/board/comment`, newComment)
    .then(response => {
      setComments([...comments, response.data]);
      setNewComment({title: '', text: ''});
    })
    .catch(error => {
      console.log(error);
    });
  }

  const handleChange = (event) => {
    setNewComment({...newComment, [event.target.name]: event.target.value});
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
          <li>{comment.contents}</li>
        </ul>
      ))}


    </div>
  );
};

export default Comment;
