import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useParams, useNavigate } from "react-router-dom";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import axios from "axios";
import RestApi from "../api/RestApi";

const ReportBoardDetail = () => {
  // url 이동을 위한 함수
  const navigate = useNavigate();

  // redux에서 user 정보를 받아오기
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const { userSequence } = useContext(AuthContext);

  // URL의 params를 쓰기 위한 state
  const { reportSequence } = useParams();

  // 게시글 read를 위한 axios 요청
  // data : 게시글 상세 정보를 담은 변수
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${RestApi()}/report/${reportSequence}`);
      setData(result.data);
    };
    fetchData();
  }, [reportSequence]);

  // 게시글 삭제를 위한 axios 요청
  const deleteClick = async () => {
    await axios.delete(`${RestApi()}/report/${reportSequence}`);
    alert("삭제되었습니다");
    navigate("/board/report");
  };

  // 컴포넌트 표시
  return (
    <main>
      {/* 관리자에겐 신고 확인 버튼을, 사용자에겐 삭제 버튼을 */}
      {isAdmin ? (
        <div>
          <h1>관리자에게 보이는 신고내역</h1>
          <p>
            from : {data.sendSequence}, to : {data.getSequence}
          </p>
          <p>내용 : {data.contents}</p>

          {/* 관리자에겐 신고 확인 버튼 */}
          <button>확인 완료</button>
        </div>
      ) : userSequence === String(data.sendSequence) ? (
        <div>
          <h1>유저님이 신고한 내역입니다.</h1>
          <p>
            from : {data.sendSequence}, to : {data.getSequence}
          </p>
          <p>내용 : {data.contents}</p>
          <button onClick={() => deleteClick()}>삭제</button>
        </div>
      ) : (
        <div>본인이 신고한 페이지가 아닙니다.</div>
      )}
    </main>
  );
};

export default WithNavBarAndSideBar(ReportBoardDetail);
