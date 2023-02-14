import React, { useState, useRef } from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router";
import axios from "axios";
import NavigateButtons from "./NavigateButtons";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import RestApi from "../api/RestApi";
import classes from "./ReportBoardCreate.module.scss"

const ReportBoardCreate = () => {
  // url 이동을 위한 함수
  const navigate = useNavigate();

  const enteredusername = useRef();
  // redux로 user 정보 가져오기
  const { userSequence } = useContext(AuthContext);

  // 닉네임으로 유저 검색
  // const [reportUserNickname, setReportUserSequence] = useState('');
  const [searchedDatas, setSearchedDatas] = useState([]);
  const [pickedData, setPickedData] = useState({});

  // 게시판에 저장할 정보
  const [contents, setContents] = useState("");
  const [kind, setKind] = useState("1");
  // 게시판에 작성한 글 저장
  const handleChange = (event) => {
    setContents(event.target.value);
  };
  // 신고 종류 저장
  const handleKindChange = (event) => {
    setKind(event.target.value);
  };
  // 닉네임 목록 불러오기
  const handleReportUserNicknameChange = async () => {
    const reportUserName = enteredusername.current.value;
    // 닉네임이 있으면 해당 닉네임으로 axios 요청
    if (reportUserName.trim()) {
      await axios
        .get(`${RestApi()}/search/nickname/${reportUserName}`)
        .then((res) => {
          setSearchedDatas(res.data);
        })
        .catch(() => {});
    }
  };
  // 닉네임 저장
  const saveReportUserData = (data) => {
    setPickedData(data);
    console.log(data);
  };

  // 게시판 create axios 요청
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add logic to create board here
    try {
      await axios.post(`${RestApi()}/report`, {
        sendSequence: userSequence,
        getSequence: pickedData.userSequence,
        contents: contents,
        kind: kind,
      });

      alert("신고가 접수되었습니다.!");
      navigate(`/board/report`);
    } catch (error) {
      console.log(error);
    }
    setContents("");
  };

  return (
    <main className={classes.boardDiv}>
      {/* 게시판 종류 선택 버튼 */}
      <NavigateButtons type="report" />
      {/* 신고 내용 작성 */}
      <form onSubmit={handleSubmit}>
        {/* 신고 종류 선택 */}
        <div className={classes.rbcDiv}>
        <label>
          신고 종류 :
          <select value={kind} onChange={handleKindChange}>
            <option value="1">욕설</option>
            <option value="2">게임 불참</option>
            <option value="3">성희롱</option>
          </select>
        </label>

        <br />

        {/* 유저 닉네임 검색 */}
        <label>
          유저 닉네임 :
          <input
            type="text"
            onChange={handleReportUserNicknameChange}
            ref={enteredusername}
          />
          {Array.isArray(searchedDatas) ? (
            <div className={classes.pickNickDiv} >
              {searchedDatas.map((d, index) => {
                return (
                  <div className={classes.pickNick} key={index} onClick={() => saveReportUserData(d)}>
                    {d.nickname}
                  </div>
                );
              })}
            </div>
          ) : null}
          <br />
          고른 닉네임 : {pickedData ? <span>{pickedData.nickname}</span> : null}
        </label>

        <br />

        {/* 신고 내용 입력 */}
        <label>
          내용을 입력하세요:
          <input type="text" value={contents} onChange={handleChange} />
        </label>

        {/* 제출 버튼 */}
        <button type="submit">Create Board</button>
        </div>
      </form>
    </main>
  );
};

export default WithNavBarAndSideBar(ReportBoardCreate);
