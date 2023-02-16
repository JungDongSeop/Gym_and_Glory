import React, { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useParams, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import axios from "axios";
import RestApi from "../api/RestApi";
import classes from "./Comment.module.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import moment from "moment";
import { Toaster } from "react-hot-toast";

// 게시판 상세페이지
// 이후 notice, getTeam, report 등으로 분리할 예정

const DetailBoard = () => {
  // url 이동을 위한 함수
  const navigate = useNavigate();
  const [typeresult, setTyperesult] = useState("");

  // URL의 params를 쓰기 위한 state
  const { type, articleSequence } = useParams();

  // redux에서 user 정보를 받아오기
  const { userSequence } = useContext(AuthContext);

  // 게시글 read를 위한 axios 요청
  // data : 게시글 상세 정보를 담은 변수
  const [data, setData] = useState([]);
  const [like, setLike] = useState(false);

  const readBoard = async () => {
    const result = await axios(`${RestApi()}/board/${articleSequence}`);
    const isLikePeople = await axios(
      `${RestApi()}/board/IsGood/${userSequence}/${articleSequence}`
    );
    setLike(isLikePeople.data);
    setData(result.data);
  };
  useEffect(() => {
    const readBoard = async () => {
      const result = await axios(`${RestApi()}/board/${articleSequence}`);
      const isLikePeople = await axios(
        `${RestApi()}/board/IsGood/${userSequence}/${articleSequence}`
      );
      setLike(isLikePeople.data);
      setData(result.data);
    };
    readBoard();
  }, [articleSequence, userSequence]);

  // 게시글 좋아요를 위한 axios
  const goodClick = async () => {
    await axios(`${RestApi()}/board/good/${userSequence}/${articleSequence}`);
    readBoard();
  };

  // 게시글 삭제를 위한 axios
  const deleteClick = async () => {
    await axios.delete(`${RestApi()}/board/${articleSequence}`);
    navigate("/board/notice");
  };

  useEffect(() => {
    if (type === "notice") {
      setTyperesult("공지사항");
    } else if (type === "getTeam") {
      setTyperesult("팀원모집");
    } else if (type === "free") {
      setTyperesult("자유게시판");
    }
  }, [type]);

  return (
    <main className={classes.boardDiv}>
      <Toaster
        toastOptions={{
          success: {
            style: {},
          },
          error: {
            style: {},
          },
        }}
        position="top-center"
        reverseOrder={false}
      />
      {/* 전체 감싸는 wrap */}
      <div className={classes.contentsWrap}>
        {/* 게시판 타입 */}
        <h1 className={classes.conTitle}>
          {typeresult}
          <div
            onClick={() => navigate(`/board/${type}/`)}
            className={classes.conTitleBtn}
          >
            <button>목록</button>
          </div>
        </h1>
        {/* 게시물 제목 */}
        <p className={classes.qsTitle}>
          <span>{data.title}</span>
        </p>
        {/* 작성자 정보 */}
        <div className={classes.qsInfoWrap}>
          <span className={classes.qsId}>
            {data.user ? data.user.nickname : null}
          </span>
          <div className={classes.qsInfo}>
            {/* 작성 시간 */}
            <p className={classes.last}>
              <img
                src="https://ssl.nexon.com/s2/game/maplestory/renewal/common/sub_date_new.png"
                alt="작성 시간"
              />
              {data.registerTime
                ? moment
                    .utc(new Date(data.registerTime).toISOString())
                    .add(18, "hours")
                    .format("YYYY-MM-DD HH:mm:ss")
                : null}
            </p>
          </div>
        </div>
        <div className={classes.qsText}>
          {data.imagePath !== null && (
            <img
              src={data.imagePath}
              style={{ width: "300px", height: "auto" }}
              alt="사진"
            />
          )}
          <div>{data.contents}</div>
        </div>
        <div className={classes.qsEmpathyWrap}>
          <div className={classes.empathyInfo}>
            {like ? (
              <button href="#a" onClick={goodClick}>
                <ThumbUpAltIcon
                  sx={{
                    fontSize: "30px",
                    background: "white",
                  }}
                />
              </button>
            ) : (
              <button href="#a" onClick={goodClick}>
                <ThumbUpOffAltIcon
                  sx={{ fontSize: "30px", background: "white" }}
                />
              </button>
            )}

            <div>
              <span>{data.goodCount}명</span>
            </div>
          </div>
        </div>
        {data.user && data.user.email === sessionStorage.getItem("email") && (
          <div className={classes.qsBtn}>
            <ul>
              <li>
                <button
                  className={classes.udButton}
                  onClick={() =>
                    navigate(`/board/${type}/update/${articleSequence}`)
                  }
                >
                  수정
                </button>
              </li>
              <li>
                <button className={classes.udButton} onClick={deleteClick}>
                  삭제
                </button>
              </li>
            </ul>
          </div>
        )}
        {sessionStorage.getItem("role") === "ROLE_ADMIN" && (
          <div className={classes.qsBtn}>
            <ul>
              <li>
                {/* <p>관리자 권한 삭제버튼</p> */}
                <button className={classes.udButton} onClick={deleteClick}>
                  관리자 삭제
                </button>
              </li>
            </ul>
          </div>
        )}
        <Comment />
      </div>
    </main>
  );
};

export default WithNavBarAndSideBar(DetailBoard);
