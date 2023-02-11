import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import CommentDetail from "./CommentDetail";
import classes from "./Comment.module.css";
import RestApi from "../api/RestApi";

// import { useNavigate } from 'react-router-dom';

const Comment = () => {
  // Link 쓰기 위한 네비게이터
  // const navigate = useNavigate();

  const commentInputRef = useRef();

  // url params 받아오는 변수
  const { articleSequence } = useParams();

  // 유저 정보 redux에서 받아오기
  const { userSequence } = useContext(AuthContext);

  // 댓글 읽기 위한 state
  const [comments, setComments] = useState([]);

  // 댓글 쓰기 위한 state
  const [newComment, setNewComment] = useState({
    userSequence: userSequence,
    contents: "",
  });

  // 댓글 read axios 요청
  // const commentRead = (articleSequence) => {
  //   axios
  //     .get(`${RestApi()}/board/comment/${articleSequence}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setComments(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const commentRead = async (articleSequence) => {
    const result = await axios(`${RestApi()}/board/comment/${articleSequence}`);
    // const isCommentLike = await axios(
    //   `${RestApi()}/board/comment/IsGood/${userSequence}/${commentSequence}`
    // );
    setComments(result.data.reverse());
    console.log(result.data, "댓글들");
  };

  // const LIKE = (isCommentLike) => {
  //   if (isCommentLike) {
  //     return <div>굿굿</div>;
  //   } else {
  //     return <div>노놉</div>;
  //   }
  // };

  // const isCommentLike = async (commentSequence) => {
  //   // const response = await axios(
  //   //   `${RestApi()}/board/comment/IsGood/${userSequence}/${commentSequence}`
  //   // );
  //   // return response.data
  //   await axios(
  //     `${RestApi()}/board/comment/IsGood/${userSequence}/${commentSequence}`
  //   ).then((res) => {
  //     console.log(res.data);
  //   });

  //   // setCommentLike(response.data);
  //   // console.log(response.data);
  // };

  useEffect(() => {
    const commentRead = async () => {
      const result = await axios(
        `${RestApi()}/board/comment/${articleSequence}`
      );
      setComments(result.data.reverse());
      console.log('댓글 목록', result.data);
    };
    commentRead();
  }, [articleSequence]);

  // 댓글 create axios 요청
  const handleSubmit = (e) => {
    // e.preventDefault();
    // alert("댓글이 작성되었습니다.");
    const enteredcomment = commentInputRef.current.value;
    {
      enteredcomment.length > 0 &&
        axios
          .post(`${RestApi()}/board/comment`, {
            userSequence: userSequence,
            articleSequence: articleSequence,
            contents: enteredcomment,
          })
          .then((response) => {
            setComments([...comments, response.data]);
            setNewComment({ title: "", text: "" });
            commentRead(articleSequence);
            commentInputRef.current.value = "";
          })
          .catch((error) => {
            console.log(error);
          });
    }
  };

  // 댓글 좋아요 axios 요청
  const handleGood = async (commentSequence) => {
    try {
      await axios(
        `${RestApi()}/board/comment/good/${userSequence}/${commentSequence}`
      );
      alert("댓글을 추천하였습니다.");
      // Show a success message or refresh the comments list
      commentRead(articleSequence);
    } catch (error) {
      console.error(error);
    }
  };

  // 댓글 지우기
  const handleDelete = async (commentSequence) => {
    try {
      await axios.delete(`${RestApi()}/board/comment/${commentSequence}`);
      alert("댓글이 삭제되었습니다.");
      // Show a success message or refresh the comments list
      commentRead(articleSequence);
    } catch (error) {
      console.error(error);
    }
  };

  // 댓글 input 값 변경 시 작동
  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className={classes.replyWrap}>
        <div className={classes.replyTitle}>
          <h2>
            댓글
            <span> {comments.length}</span>
          </h2>
        </div>

        <ul className={classes.replyUl}>
          {comments.map((comment, index) => (
            <li key={index}>
              <div className={classes.reply}>
                <p className={classes.commonCharId}>
                  {/* <img
                    src="https://ssl.nexon.com/s2/game/maplestory/renewal/common/world_icon/icon_11.png"
                    alt="프로필 이미지"
                  /> */}
                  {comment.user ? comment.user.nickname : null}
                  <span>
                    {new Date(comment.registerTime).toLocaleString("default", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </span>
                </p>
                <ul className={classes.replyBtnWrap}>
                  <li className={classes.replyBtn}>
                    <p>추천 수: {comment.goodCount}</p>
                    <p>
                      {/* {isCommentLike(comment.commentSequence, userSequence)} */}
                    </p>
                  </li>
                  <li className={classes.replyBtn}>
                    <CommentDetail commentSequence={comment.commentSequence} userSequence={userSequence} goodCount={comment.goodCount} />
                  </li>
                  {+sessionStorage.getItem("userSequence") ===
                  +comment.user.userSequence ? (
                    <li className={classes.replyBtn}>
                      <button
                        onClick={() => handleDelete(comment.commentSequence)}
                      >
                        삭제
                      </button>
                    </li>
                  ) : null}
                </ul>
                <div className={classes.replyText}>{comment.contents}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.bottomTxarWrap}>
        <form onSubmit={handleSubmit} className={classes.bottomTxarCtracker}>
          <textarea
            name="comment"
            cols="30"
            rows="10"
            placeholder="댓글을 입력해주세요"
            ref={commentInputRef}
          ></textarea>
          <div className={classes.bottomTxarBtn}>
            <div className={classes.txarRightBtn}>
              <input type="submit" value="제출" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comment;
