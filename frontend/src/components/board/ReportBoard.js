import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import axios from 'axios';
import classes from './Board.module.css';

// 신고게시판
// 관리자 : 유저들의 신고 내역 조회 가능. 이후 확인 및 확정하기 버튼 누르기
// 사용자 : 관리자가 확정한 신고 내역은 삭제 불가능, 관리자가 확정했다는 여부 표시. 확정하지 않으면 신고내역 삭제 가능

const ReportBoard = () => {
  // url 이동을 위한 함수.
  const navigate = useNavigate();

  // redux로 user 정보 가져오기
  const isAdmin = useSelector(state => state.user.isAdmin);
  // const userSequence = useSelector(state => state.user.pk);
  
  // 게시판에 쓴 글들을 저장할 변수
  const [adminBoard, setAdminBoard] = useState([]);
  // 사용자의 게시글을 저장할 변수
  // const [userBoard, setUserBoard] = useState([]);

  // 게시글 전체 조회 axios (관리자)
  useEffect(() => {
    const fetchBoard = async () => {
      const result = await axios('http://localhost:8080/report');
      setAdminBoard(result.data);   
    };
    fetchBoard();
  }, []);

  // 사용자의 게시글 조회 axios (유저) (axios 완성 이후 붙이기)
  // useEffect(() => {
  //   const fetchUserBoard = async () => {
  //     const result = await axios.get(`http://localhost:8080/board/user/${nickname}`);
  //     setUserBoard(result.data);
  //   };
  //   fetchUserBoard();
  // }, [nickname]);

  return (
    <main>
      <h1>{isAdmin}</h1>
      {isAdmin ? (
        <div>
          <h2>관리자의 신고페이지.</h2>
          <ul className={classes.boardUl}>
            {adminBoard.map((report, index) => (
              <li 
                key={report.reportSequence}
                className={index % 2 === 0 ? classes.odd : classes.even}
                onClick={() => navigate(`/board/report/${report.reportSequence}`)}
              >
                from : {report.sendSequence}, to : {report.getSequence}, 종류 : {report.kind}, 내용 : {report.contents}
              
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>유저들의 신고페이지</h2>
          <p>이후 특정 유저의 신고 내역 api 완성되면 추가</p>
          {/* <ul>
            {userBoard.map((report) => (
              <li key={report.id}>
                {report.title} - {report.description}
              </li>
            ))}
          </ul> */}
        </div>
      )}
    </main>
  );
}

export default WithNavBarAndSideBar(ReportBoard);
