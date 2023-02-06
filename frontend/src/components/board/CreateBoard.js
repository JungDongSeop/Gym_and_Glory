import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import NavigateButtons from "./NavigateButtons";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

import classes from "./CreateBoard.module.css";

// import CkEditor from "./CkEditor";

const CreateBoard = () => {
  // url 이동을 위한 함수
  const navigate = useNavigate();

  // url의 params를 사용하기 위한 변수
  const { type } = useParams("notice");
  const types = { notice: 1, free: 2, party: 3 };

  // user 정보 가져오기
  const { userSequence } = useContext(AuthContext);

  // 게시판 제출 버튼
  // 게시판에 쓴 글들을 저장할 변수
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // 게시판 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/board", {
        userSequence: userSequence,
        title: title,
        contents: contents,
        div: types[type],
      });
      setTitle("");
      setContents("");
      alert("Board created successfully!");
      navigate(`/board/${type}`);
    } catch (error) {
      console.log(error);
    }
  };

  const typename = () => {
    if (type === "notice") {
      return "공지사항";
    } else if (type === "free") {
      return "자유게시판";
    } else if (type === "party") {
      return "팀원 모집";
    }
  };

  const typeDescription = () => {
    if (type === "notice") {
      return "공지사항을 작성하세요";
    } else if (type === "free") {
      return "여러 사용자들과 자유롭게 이야기를 나누어 보세요 유용한 팁과 정보를 쉽게 얻으실 수 있을거에요.";
    } else if (type === "party") {
      return "파티모집 게시판을 통해 함께 운동할 유저를 찾고 모험을 떠나보아요!";
    }
  };

  return (
    <main>
      {/* 게시판 종류 선택 버튼 */}
      <NavigateButtons type={type} />
      {/* {() => {
        const typename = ""
        if (type == "notice") {
          typename = "공지사항"
        } else if (type == "free") {
          return "자유게시판"
        }
        return typename
        <p></p>
      }} */}
      {/* 게시판 제출 */}
      <form onSubmit={handleSubmit}>
        <div className={classes.board_wrap}>
          <div className={classes.board_write_wrap}>
            <h1>{typename()}</h1>
            <p>{typeDescription()}</p>
            <p>{typeDescription}</p>
            <div className={classes.board_write}>
              <div className={classes.title}>
                <dl>
                  <dt>제목</dt>
                  <dd>
                    <input type="text" placeholder="제목을 입력하세요" />
                  </dd>
                </dl>
              </div>
              <div className={classes.cont}>
                <textarea placeholder="내용을 입력하세요"></textarea>
              </div>
            </div>

            <div className={classes.bt_wrap}>
              <button type="submit" className={classes.on}>
                등록
              </button>
              <button type="submit" onClick={() => navigate(`/board/${type}`)}>
                취소
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default WithNavBarAndSideBar(CreateBoard);
