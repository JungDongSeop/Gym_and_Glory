import React, { useState, useEffect } from "react";
import axios from "axios";
import RestApi from "../api/RestApi";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import classes from "./CommentDetail.module.css";
import moment from "moment";
import Swal from "sweetalert2";

// 댓글 좋아요 여부 출력만을 위해 사용
const CommentDetail = (props) => {
  // 댓글 pk
  const comment = props.comment;
  const userSequence = props.userSequence;
  const [goodCount, setGoodCount] = useState(props.goodCount);
  const content = props.content;
  const [isDelete, setIsDelete] = useState(false);

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
    } catch (error) {
      setIsCommentLike(!isCommentLike);
    }
    setIsToggle(!isToggle);
    setGoodCount(isCommentLike ? goodCount - 1 : goodCount + 1);
  };

  // 댓글 지우기
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${RestApi()}/board/comment/${comment.commentSequence}`
      );
      Swal.fire({
        title: "댓글을 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsDelete(true);
          window.location.reload();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const utcTime = new Date(comment.registerTime).toISOString();
  const localTime = moment
    .utc(utcTime)
    .add(18, "hours")
    .format("YYYY-MM-DD HH:mm:ss");

  return isDelete ? null : (
    <li>
      <div className={classes.reply}>
        <p className={classes.commonCharId}>
          {comment.user ? comment.user.nickname : null}
          <span>
            {localTime}
          </span>
        </p>
      </div>

      <div className={classes.content}>{content}</div>
      <ul className={classes.replyBtnWrap}>
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
          +comment.user.userSequence ||
        sessionStorage.getItem("role") === "ROLE_ADMIN" ? (
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
