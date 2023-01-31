import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import NavigateButtons from './NavigateButtons';
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import UserIdToNickname from './UserIdToNickname';
import axios from 'axios';
import classes from './Board.module.css';
import { Button } from "antd";
import { Pagination } from "antd";

// 신고게시판
// 관리자 : 유저들의 신고 내역 조회 가능. 이후 확인 및 확정하기 버튼 누르기
// 사용자 : 관리자가 확정한 신고 내역은 삭제 불가능, 관리자가 확정했다는 여부 표시. 확정하지 않으면 신고내역 삭제 가능

const ReportBoard = () => {
  // url 이동을 위한 함수.
  const navigate = useNavigate();

  // redux로 user 정보 가져오기
  const isAdmin = useSelector(state => state.user.isAdmin);
  const userSequence = useSelector(state => state.user.pk);
  
  // 게시판에 쓴 글들을 저장할 변수
  const [board, setBoard] = useState([]);
  // 사용자의 게시글을 저장할 변수
  // const [userBoard, setUserBoard] = useState([]);

  // 게시글 전체 조회 axios (관리자, 유저)
  useEffect(() => {
    if(isAdmin) {
      const fetchBoard = async () => {
        const result = await axios('http://localhost:8080/report');
        setBoard(result.data);   
      };
      fetchBoard();
    } else {
      const fetchBoard = async () => {
        const result = await axios(`http://localhost:8080/report/user/${userSequence}`);

        setBoard(result.data);   
      };
      fetchBoard();
    }
  }, [userSequence, isAdmin]);

  // 페이지네이션을 위한 변수
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지네이션을 위한 함수
  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <main>
      {/* 게시판 별로 이동 가능한 버튼 */}
      <NavigateButtons type="report"/>
      
      <br />

      {/* 글 작성 버튼 */}
      <Button
        className={classes.createButton}
        type="primary"
        onClick={() => navigate(`/board/report/create`)}
      >
        글 작성
      </Button>

      {/* 신고게시판 내용 */}
      {isAdmin ? (
        <div>
          <h2>관리자의 신고페이지.</h2>
          <ul className={classes.boardUl}>
            {board
              .slice(currentPage * 10 - 10, currentPage * 10)
              .map((item, index) => (
                <li 
                  key={item.reportSequence}
                  className={index % 2 === 0 ? classes.odd : classes.even}
                  onClick={() => navigate(`/board/report/${item.reportSequence}`)}
                >
                  from : {item.sendSequence}, to : {item.getSequence}, 종류 : {item.kind}, 내용 : {item.contents}
                
                </li>
            ))}
          </ul>
        </div>
      ) : (
        // 유저들의 신고페이지
        // 확인되지 않았으면 내용 표시, 삭제 버튼 추가
        // 확인되었으면 '신고 내용이 반영되었습니다' 라는 문구로 표시
        <div>
          <h2>유저들의 신고페이지</h2>
          <ul className={classes.boardUl}>
            {board
              .slice(currentPage * 10 - 10, currentPage * 10)
              .map((item, index) => 
                // 관리자가 확인 안했으면
                !item.confirmation ? 
                  <li 
                    key={item.reportSequence}
                    className={index % 2 === 0 ? classes.odd : classes.even}
                    onClick={() => navigate(`/board/report/${item.reportSequence}`)}
                  >
                    from : <UserIdToNickname userId={item.sendSequence}/>, to : <UserIdToNickname userId={item.getSequence}/>, 종류 : {item.kind}, 내용 : {item.contents}
                  
                  </li>
                  // 관리자가 확인했으면
                  :
                  <li
                    key={item.reportSequence}
                    className={`${classes.confirm} ${index % 2 === 0 ? classes.odd : classes.even}`}
                  >
                    신고 내용이 확인되었습니다.
                  </li>
            )}
          </ul>
        </div>
      )}

      {/* 페이지네이션 */}
      <Pagination
        className={classes.pagination}
        current={currentPage}
        onChange={onChangePage}
        total={Object.keys(board).length}
      />
    </main>
  );
}

export default WithNavBarAndSideBar(ReportBoard);
