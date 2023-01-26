import React from 'react';
import { Button } from 'antd';
import { useNavigate } from'react-router-dom';
import classes from './Board.module.css';

// 게시판 종류를 구분하는 버튼 컴포넌트

const NavigateButtons = (props) => {
  // url 이동을 위한 함수.
  const navigate = useNavigate();

  // url params의 notice를 가져오기 (게시판 분류)
  const type = props.type ? props.type : 'notice'
  // const { type = 'notice' } = useParams('notice');
  
  return (
    <div>
      <Button className={type==='notice'? classes.blue : classes.white} onClick={() => navigate('/board/notice')}>공지사항</Button>
      <Button className={type==='free'? classes.blue : classes.white} onClick={() => navigate('/board/free')}>자유게시판</Button>
      <Button className={type==='party'? classes.blue : classes.white} onClick={() => navigate('/board/party')}>팀원 모집</Button>
      <Button>신고게시판</Button>
    </div>
  );
};

export default NavigateButtons;
