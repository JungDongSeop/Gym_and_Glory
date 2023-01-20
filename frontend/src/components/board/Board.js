import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Link, useNavigate } from'react-router-dom';
import classes from './Board.module.css';
import axios from 'axios';

// 기본적으로 공지사항 게시판이 표시
// 버튼을 누를 경우 다른 게시판 정보를 axios 요청

const FreeBoard = () => {

  const navigate = useNavigate();

  // axios 요청을 위한 state
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://jsonplaceholder.typicode.com/users/');
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* 게시판 종류 선택. onClick 함수 넣어서 axios 요청 보내기 */}
      <Button>공지사항</Button>
      <Button>자유게시판</Button>
      <Button>팀원 모집</Button>
      <Button>신고게시판</Button>

      <br />
      
      {/* 글 작성 버튼 */}
      <Link to="/board/create"><Button type="primary">글 작성</Button></Link>

      {/* 게시판 내용 */}
      <table className={classes.table}>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? classes.odd : classes.even} onClick={() => navigate('/board/'+item.id)}>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FreeBoard;
;