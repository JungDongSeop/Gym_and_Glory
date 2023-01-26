import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from'react-router-dom';
import NavigateButtons from './NavigateButtons';
import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';
import axios from 'axios';
import classes from './Board.module.css';
import { Button } from 'antd';
import { Pagination } from 'antd';

// 기본적으로 공지사항 게시판이 표시
// 버튼을 누를 경우 다른 게시판 정보를 axios 요청
// 이후 url 안에 type params를 추가해서 url로 구분되게 하는 편이 좋을 듯?

const Board = () => {
  // url 이동을 위한 함수.
  const navigate = useNavigate();

  // url params의 notice를 가져오기 (게시판 분류)
  const { type = 'notice' } = useParams();
  
  // axios 요청을 위한 state
  // data : 게시판 정보가 담긴 변수. 최신 글이 위로 오도록
  const [data, setData] = useState([]);
  useEffect(() => {    
    const types = {'notice': 1, 'free': 2, 'party': 3}
    const fetchData = async () => {
      const result = await axios(`http://localhost:8080/board/list/${types[type]}`);
      setData(result.data.reverse());
    };
    fetchData();
  }, [type]);

  // 페이지네이션을 위한 변수
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지네이션을 위한 함수
  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <main>
      {/* 게시판 종류 선택. navigate 써서 페이지 갱신하는 게 좋을 듯
      <Button className={type==='notice'? classes.blue : classes.white} onClick={() => navigate('/board/notice')}>공지사항</Button>
      <Button className={type==='free'? classes.blue : classes.white} onClick={() => navigate('/board/free')}>자유게시판</Button>
      <Button className={type==='party'? classes.blue : classes.white} onClick={() => navigate('/board/party')}>팀원 모집</Button>
      <Button>신고게시판</Button> */}
      <NavigateButtons type={type}/>

      <br />
      
      {/* 글 작성 버튼 */}
      <Button className={classes.createButton} type="primary" onClick={() => navigate(`/board/${type}/create`)}>글 작성</Button>

      {/* 게시판 내용 */}
      <ul className={classes.boardUl}>
        {data.slice(currentPage*10-10, currentPage*10).map((item, index) => (
          <li key={index} className={index % 2 === 0 ? classes.odd : classes.even} onClick={() => navigate(`/board/${type}/${item.articleSequence}`)}>
            {/* 제목 */}
            <div>
              {item.title}
            </div>
            {/* 작성자 */}
            <div>
              작성자 : {item.userSequence}
            </div>
            {/* 기타 정보 */}
            <div>
              ❤{item.goodCount}
              👀{item.views}
              🕒{item.modify_time.slice(0, 11)}
            </div>            
          </li>
        ))}
      </ul>
      <Pagination className={classes.pagination} current={currentPage} onChange={onChangePage} total={Object.keys(data).length} />
    </main>
  );
};

export default WithNavBarAndSideBar(Board);
