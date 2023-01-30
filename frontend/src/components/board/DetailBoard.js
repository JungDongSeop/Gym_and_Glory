import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from'react-router-dom';
import Comment from './Comment';
import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';
import axios from 'axios';

// 게시판 상세페이지
// 이후 notice, getTeam, report 등으로 분리할 예정

const DetailBoard = () => {
  // url 이동을 위한 함수
  const navigate = useNavigate();

  // URL의 params를 쓰기 위한 state
  const { type, articleSequence } = useParams();

  // redux에서 user 정보를 받아오기
  const user = useSelector((state) => state.user);

  // 게시글 read를 위한 axios 요청
  // data : 게시글 상세 정보를 담은 변수
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:8080/board/${articleSequence}`);
      setData(result.data);        
    };
    fetchData();
  }, [articleSequence]);

  // 게시글 좋아요를 위한 axios
  const goodClick = async () => {
    const result = await axios(`http://localhost:8080/board/good/${user.pk}/${articleSequence}`);
    console.log(result);
  }

  // 게시글 삭제를 위한 axios
  const deleteClick = async () => {
    const result = await axios.delete(`http://localhost:8080/board/${articleSequence}`);
    console.log(result.data);
    navigate('/board/notice');
  }


  return (
    <main>
      <h1>게시판 상세페이지 입니다.</h1>      

      {/* 게시판  */}
      <p>제목 : </p>
      <p>{data.title}</p>
      <p>내용 : </p>
      <p>{data.contents}</p>

      <br />
      {/* 게시글 수정 구현 */}
      <button onClick={() => navigate(`/board/${type}/update/${articleSequence}`)}>게시글 수정</button>
      {/* 게시글 좋아요 구현 */}
      <button onClick={() => goodClick()}>좋아요</button>
      {/* 게시글 삭제 구현 */}
      <button onClick={() => deleteClick()}>삭제</button>        
      
      {/* 댓글 */}
      <Comment />
    </main>
  );
};

export default WithNavBarAndSideBar(DetailBoard);
;