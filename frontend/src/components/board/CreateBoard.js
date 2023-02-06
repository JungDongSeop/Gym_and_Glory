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

  return (
    <main>
      {/* 게시판 종류 선택 버튼 */}
      <NavigateButtons type={type} />
      {/* 게시판 제출 */}
      <form onSubmit={handleSubmit}>
        <div>
          <h1>제목:</h1>
          <input
            className={classes.title}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* <br /> */}
        {/* <CkEditor
          value={(editor) => {
            const data = editor.getData();
            console.log(data);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log(contents);
          }}
        /> */}
        <div>
          <h1>내용:</h1>

          <textarea
            className={classes.content}
            value={contents}
            placeholder="내용을 입력하세요."
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        <br />
        <button className={classes.submit} type="submit">
          글 작성하기
        </button>
      </form>
    </main>
  );
};

export default WithNavBarAndSideBar(CreateBoard);
