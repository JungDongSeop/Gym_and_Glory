import React, { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useParams, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import axios from "axios";
import RestApi from "../api/RestApi";
import classes from "./Comment.module.css";

// 게시판 상세페이지
// 이후 notice, getTeam, report 등으로 분리할 예정

const DetailBoard = () => {
  // url 이동을 위한 함수
  const navigate = useNavigate();

  // URL의 params를 쓰기 위한 state
  const { type, articleSequence } = useParams();

  // redux에서 user 정보를 받아오기
  const { userSequence } = useContext(AuthContext);

  // 게시글 read를 위한 axios 요청
  // data : 게시글 상세 정보를 담은 변수
  const [data, setData] = useState([]);

  const readBoard = async () => {
    const result = await axios(`${RestApi()}/board/${articleSequence}`);
    setData(result.data);
  };
  useEffect(() => {
    const readBoard = async () => {
      const result = await axios(`${RestApi()}/board/${articleSequence}`);
      setData(result.data);
    };
    readBoard();
  }, [articleSequence]);

  // 게시글 좋아요를 위한 axios
  const goodClick = async () => {
    await axios(`${RestApi()}/board/good/${userSequence}/${articleSequence}`);
    alert("추천하였습니다");
    readBoard();
  };

  // 게시글 삭제를 위한 axios
  const deleteClick = async () => {
    await axios.delete(`${RestApi()}/board/${articleSequence}`);
    navigate("/board/notice");
  };

  return (
    <main>
      <div className={classes.divset}>
        <div>
          <h1>게시판 상세페이지 입니다.</h1>
          {/* 게시판  */}
          <p>제목 : </p>
          <p>{data.title}</p>
          <p>내용 : </p>
          <p>{data.contents}</p>
          <p>작성자 : </p>
          {/* <p><UserIdToNickname userId={data.userSequence}/></p> */}
          <p>{data.user ? data.user.nickname : null}</p>
          <br />
          {/* 게시글 수정 구현 */}
          <button
            onClick={() => navigate(`/board/${type}/update/${articleSequence}`)}
          >
            게시글 수정
          </button>
          {/* 게시글 좋아요 구현 */}
          추천 : {data.goodCount}
          <button onClick={() => goodClick()}>좋아요</button>
          {/* 게시글 삭제 구현 */}
          <button onClick={() => deleteClick()}>삭제</button>
          {/* 댓글 */}
        </div>
        <div className={classes.commentDiv}>
          <Comment />
        </div>
      </div>
    </main>
  );
};

export default WithNavBarAndSideBar(DetailBoard);
