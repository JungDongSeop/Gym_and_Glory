import React, { useState, useEffect } from 'react';
import { useParams } from'react-router-dom';
import Review from './Review';
import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';
import axios from 'axios';

// 게시판 상세페이지
// 이후 notice, getTeam, report 등으로 분리할 예정

const DetailBoard = () => {
  // URL의 params를 쓰기 위한 state
  const { articleSequence } = useParams();

  // axios 요청을 위한 state
  // data : 게시판 정보를 담은 변수
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:8080/board/${articleSequence}`);
      setData(result.data);        
    };
    fetchData();
  }, [articleSequence]);

  // 게시글 상세 정보를 담은 변수

  return (
    <main>
      <h1>게시판 상세페이지 입니다.</h1>      

      {/* 게시판  */}
      <p>제목 : </p>
      <p>{data.title}</p>
      <p>내용 : </p>
      <p>{data.contents}</p>

      <br />
      <form>
        <button>게시글 수정</button>
      </form>
      
      {/* 댓글 */}
      <Review />
    </main>
  );
};

export default WithNavBarAndSideBar(DetailBoard);
;