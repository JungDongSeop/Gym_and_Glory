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
    console.log(isLikePeople.data);
    console.log(result.data);
    setLike(isLikePeople.data);
    setData(result.data);
  };
  useEffect(() => {
    const readBoard = async () => {
      const result = await axios(`${RestApi()}/board/${articleSequence}`);
      const isLikePeople = await axios(
        `${RestApi()}/board/IsGood/${userSequence}/${articleSequence}`
      );
      console.log(result.data);
      console.log(isLikePeople.data);

      setLike(isLikePeople.data);
      setData(result.data);
    };
    readBoard();
  }, [articleSequence]);

  // 초기 좋아요 한 사람인지 유무 확인

  // 게시글 좋아요를 위한 axios
  const goodClick = async () => {
    await axios(`${RestApi()}/board/good/${userSequence}/${articleSequence}`);
    if (like === true) {
      alert("취소하였습니다.");
    } else {
      alert("추천하였습니다");
    }
    readBoard();
  };

  // 게시글 삭제를 위한 axios
  const deleteClick = async () => {
    await axios.delete(`${RestApi()}/board/${articleSequence}`);
    navigate("/board/notice");
  };

  // let typeresult = "";

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
    <main>
      {/* 전체 감싸는 wrap */}
      <div className={classes.contentsWrap}>
        {/* 게시판 타입 */}
        <h1 className={classes.conTitle}>{typeresult}</h1>
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
                ? new Date(data.registerTime).toLocaleString("default", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })
                : null}
            </p>
          </div>
        </div>
        <div className={classes.qsText}>{data.contents}</div>
        <div className={classes.qsEmpathyWrap}>
          <div className={classes.empathyInfo}>
            {like ? (
              <button href="#a" onClick={goodClick}>
                <ThumbUpAltIcon
                  sx={{
                    fontSize: "70px",
                    background: "white",
                  }}
                />
              </button>
            ) : (
              <button href="#a" onClick={goodClick}>
                <ThumbUpOffAltIcon
                  sx={{ fontSize: "70px", background: "white" }}
                />
              </button>
            )}

            <div>
              {/* <span>{like ? "좋아요누름" : "안누름"}</span> */}
              <span>{data.goodCount}명</span>
            </div>
          </div>
        </div>
        {data.user && data.user.email === sessionStorage.getItem("email") && (
          <div className={classes.qsBtn}>
            <ul>
              <li>
                <button
                  onClick={() =>
                    navigate(`/board/${type}/update/${articleSequence}`)
                  }
                >
                  <img
                    src="https://ssl.nexon.com/s2/game/maplestory/renewal/common/view_btn01.png"
                    alt="수정"
                  />
                </button>
              </li>
              <li>
                <button onClick={deleteClick}>
                  <img
                    src="https://ssl.nexon.com/s2/game/maplestory/renewal/common/view_btn02.png"
                    alt="삭제"
                  />
                </button>
              </li>
            </ul>
          </div>
        )}
        <Comment />
      </div>
    </main>
    // <main>
    //   {/* <h3>게시판 상세페이지 입니다.</h3> */}
    //   <div className={classes.divset}>
    //     <div className={classes.boardDetail}>
    //       {/* 게시판  */}
    //       <div className={classes.articleTitle}>
    //         <div>
    //           <h1>{data.title}</h1>
    //         </div>
    //         <div>
    //           <h5>[작성자]</h5>
    //           <p>{data.user ? data.user.nickname : null}</p>
    //         </div>
    //       </div>
    //       <p>내용 : </p>
    //       <p>{data.contents}</p>
    //       {/* <p>작성자 : </p> */}
    //       {/* <p><UserIdToNickname userId={data.userSequence}/></p> */}
    //       <br />
    //       {/* 게시글 수정 구현 */}
    //       <button
    //         onClick={() => navigate(`/board/${type}/update/${articleSequence}`)}
    //       >
    //         게시글 수정
    //       </button>
    //       {/* 게시글 좋아요 구현 */}
    //       추천 : {data.goodCount}
    //       <button onClick={() => goodClick()}>좋아요</button>
    //       {/* 게시글 삭제 구현 */}
    //       <button onClick={() => deleteClick()}>삭제</button>
    //       {/* 댓글 */}
    //     </div>
    //     <div className={classes.commentDiv}>
    //       <Comment />
    //     </div>
    //   </div>
    // </main>
  );
};

export default WithNavBarAndSideBar(DetailBoard);
