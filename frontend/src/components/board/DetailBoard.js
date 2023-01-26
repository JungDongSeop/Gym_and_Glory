import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from'react-router-dom';
import Review from './Review';
import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';
import axios from 'axios';

// 게시판 상세페이지
// 이후 notice, getTeam, report 등으로 분리할 예정

const DetailBoard = () => {
  // url 이동을 위한 함수
  const navigate = useNavigate();

  // URL의 params를 쓰기 위한 state
  const { type, articleSequence } = useParams();

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
  // const goodClick = async () => {
    // const result = await axios.post(`http://localhost:8080/board/${articleSequence}/good`);
    // console.log(result);
  // }


  return (
    <main>
      <h1>게시판 상세페이지 입니다.</h1>      

      {/* 게시판  */}
      <p>제목 : </p>
      <p>{data.title}</p>
      <p>내용 : </p>
      <p>{data.contents}</p>

      <br />
      {/* 게시글 수정은 일단 create 페이지로 이동하도록 작성했음. 이후 update 페이지 별도 제작 */}
      <button onClick={() => navigate(`/board/${type}/create`)}>게시글 수정</button>
      {/* <button onClick={}>좋아요</button> */}
      <button>삭제</button>        
      
      {/* 댓글 */}
      <Review />
    </main>
  );
};

export default WithNavBarAndSideBar(DetailBoard);
;