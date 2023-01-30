import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from'react-router-dom';
import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';
import axios from 'axios';

const ReportBoardDetail = () => {
  // redux에서 user 정보를 받아오기
  const isAdmin = useSelector((state) => state.user.isAdmin);

  // URL의 params를 쓰기 위한 state
  const { reportSequence } = useParams();

  // 게시글 read를 위한 axios 요청
  // data : 게시글 상세 정보를 담은 변수
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:8080/report/${reportSequence}`);
      setData(result.data);        
    };
    fetchData();
  }, [reportSequence]);

  // 컴포넌트 표시
  return (
    <main>
      {isAdmin ? (
        <div>
          <p>from : {data.sendSequence}, to : {data.getSequence}</p>
          <p>
          내용 : {data.contents}
          </p>
          <button>
            확인 완료
          </button>
        </div>
      ) : (
        <div>
          관리자가 아니군요
        </div>
      )}
    </main>
  );
};

export default WithNavBarAndSideBar(ReportBoardDetail);
