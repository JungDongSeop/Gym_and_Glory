import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Link, useNavigate, useParams } from'react-router-dom';
import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';
import classes from './Board.module.css';
import axios from 'axios';

// 기본적으로 공지사항 게시판이 표시
// 버튼을 누를 경우 다른 게시판 정보를 axios 요청
// 이후 url 안에 type params를 추가해서 url로 구분되게 하는 편이 좋을 듯?

const Board = () => {
  // url 이동을 위한 함수.
  const navigate = useNavigate();

  // url params의 notice를 가져오기 (게시판 분류)
  const { type = 'notice' } = useParams();

  // axios 요청을 위한 state
  // data : 게시판 정보가 담긴 변수
  const [data, setData] = useState([]);
  useEffect(() => {    
    const fetchData = async () => {
      const result = await axios('https://jsonplaceholder.typicode.com/users/');
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <main>
      {/* 게시판 종류 선택. navigate 써서 페이지 갱신하는 게 좋을 듯 */}
      <Button className={type==='notice'? classes.blue : classes.white}>공지사항</Button>
      <Button className={type==='free'? classes.blue : classes.white}>자유게시판</Button>
      <Button className={type==='free'? classes.blue : classes.white}>팀원 모집</Button>
      <Button>신고게시판</Button>

      <br />
      
      {/* 글 작성 버튼 */}
      <Link to="/board/:type/create"><Button type="primary">글 작성</Button></Link>

      {/* 게시판 내용 */}
      <ul>
        {data.map((item, index) => (
          <li key={index} className={index % 2 === 0 ? classes.odd : classes.even} onClick={() => navigate('/board/'+item.id)}>
            {item.name} |||| {item.email}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default WithNavBarAndSideBar(Board);
;
;