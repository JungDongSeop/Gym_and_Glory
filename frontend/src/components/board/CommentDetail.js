import React, { useState, useEffect } from "react";
import axios from "axios";
import RestApi from "../api/RestApi";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import classes from "./CommentDetail.module.css";
// import locale from "antd/es/date-picker/locale/en_US";
import moment from "moment";
import Swal from "sweetalert2";

// 댓글 좋아요 여부 출력만을 위해 사용
const CommentDetail = (props) => {
  // 댓글 pk
  const comment = props.comment;
  const userSequence = props.userSequence;
  const [goodCount, setGoodCount] = useState(props.goodCount);
  // const [content, setContent] = useState(props.content);
  const content = props.content;
  const [isDelete, setIsDelete] = useState(false);

  // 댓글 지우는 axios 요청
  // const handleDelete = async (comment) => {
  //   try {
  //     await axios.delete(`/board/comment/${comment.commentSequence}`);
  //     // Show a success message or refresh the comments list
  //   } catch (error) {
  //     console.error(error);
  //     // Show an error message
  //   }
  // }

  // 댓글 좋아요 여부 axios 요청
  const [isCommentLike, setIsCommentLike] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await axios(
        `${RestApi()}/board/comment/IsGood/${userSequence}/${
          comment.commentSequence
        }`
      ).then((res) => {
        setIsCommentLike(res.data);
      });
    };
    fetchData();
  });

  // 댓글 좋아요 요청
  const handleGood = async () => {
    try {
      await axios(
        `${RestApi()}/board/comment/good/${userSequence}/${
          comment.commentSequence
        }`
      );
      // alert("댓글을 추천하였습니다.");
      // Show a success message or refresh the comments list
    } catch (error) {
      setIsCommentLike(!isCommentLike);
    }
    setIsToggle(!isToggle);
    setGoodCount(isCommentLike ? goodCount - 1 : goodCount + 1);
  };

  // 댓글 지우기

  // const commentLength = props.commentsLength;
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${RestApi()}/board/comment/${comment.commentSequence}`
      );
      // alert("댓글이 삭제되었습니다.");
      Swal.fire({
        title: "삭제",
        text: "댓글이 삭제되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsDelete(true);
          window.location.reload();
        }
      });
      // commentLength -= 1;
      // Show a success message or refresh the comments list
      // commentRead(articleSequence);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   const commentRead = async () => {
  //     const result = await axios(`${RestApi()}/board/comment/`);
  //     setComments(result.data.reverse());
  //   };
  // const handleDelete = async () => {
  //   const deleteResult = await axios.delete(
  //     `${RestApi()}/board/comment/${comment.commentSequence}`
  //   );
  //   setIsDelete(true);
  // };
  //   commentRead();
  //   // handleDelete();
  // }, []);

  const utcTime = new Date(comment.registerTime).toISOString();
  const localTime = moment
    .utc(utcTime)
    .add(18, "hours")
    .format("YYYY-MM-DD HH:mm:ss");

  return isDelete ? null : (
    <li>
      <div className={classes.reply}>
        <p className={classes.commonCharId}>
          {/* <img
            src="https://ssl.nexon.com/s2/game/maplestory/renewal/common/world_icon/icon_11.png"
            alt="프로필 이미지"
          /> */}
          {comment.user ? comment.user.nickname : null}
          <span>
            {/* {new Date(comment.registerTime).toLocaleString("ko-KR", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })} */}
            {/* {new Intl.DateTimeFormat("ko-KR", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              timeZone: "Asia/Seoul",
            }).format(new Date(comment.registerTime))} */}
            {/* {new Date(comment.registerTime).toISOString()} */}
            {localTime}
          </span>
        </p>
      </div>

      <div className={classes.content}>{content}</div>
      {/* <br className={classes.brtag} /> */}
      <ul className={classes.replyBtnWrap}>
        {/* <li className={classes.replyBtn}>
          <p>{goodCount}</p>
          <p>{isCommentLike}</p>
        </li> */}
        <li className={classes.goodCount}>
          <h3>❣ {goodCount}</h3>
        </li>
        <li className={classes.replyBtn}>
          {isCommentLike ? (
            <ThumbUpAltIcon onClick={handleGood} />
          ) : (
            <ThumbUpOffAltIcon onClick={handleGood} />
          )}
        </li>

        {+sessionStorage.getItem("userSequence") ===
        +comment.user.userSequence ? (
          <li className={classes.replyBtn}>
            <button onClick={() => handleDelete(comment.commentSequence)}>
              삭제
            </button>
          </li>
        ) : null}
      </ul>
    </li>
  );
};

export default CommentDetail;
