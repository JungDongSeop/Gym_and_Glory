import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import CommentDetail from "./CommentDetail";
import classes from "./Comment.module.css";
import RestApi from "../api/RestApi";
import toast from "react-hot-toast";

const Comment = () => {

  const commentInputRef = useRef();

  // url params 받아오는 변수
  const { articleSequence } = useParams();

  // 유저 정보 redux에서 받아오기
  const { userSequence } = useContext(AuthContext);

  // 댓글 읽기 위한 state
  const [comments, setComments] = useState([]);

  const commentRead = async (articleSequence) => {
    const result = await axios(`${RestApi()}/board/comment/${articleSequence}`);
    setComments(result.data.reverse());
  };

  useEffect(() => {
    const commentRead = async () => {
      const result = await axios(
        `${RestApi()}/board/comment/${articleSequence}`
      );
      setComments(result.data.reverse());
    };
    commentRead();
  }, [articleSequence]);

  // 댓글 create axios 요청
  const handleSubmit = (e) => {
    const enteredcomment = commentInputRef.current.value;
    if (enteredcomment.length === 0) {
      toast.error("댓글을 입력해주세요");
    } else {
      enteredcomment.length > 0 &&
        fetch(`${RestApi()}/board/comment`, {
          method: "POST",
          body: JSON.stringify({
            userSequence: userSequence,
            articleSequence: articleSequence,
            contents: enteredcomment,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .then((response) => {
            setComments([...comments, response.data]);
            commentRead(articleSequence);
            commentInputRef.current.value = "";
          })
          .catch((err) => {
            console.log(err);
          });
    }
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
            <CommentDetail
              key={index}
              comment={comment}
              userSequence={userSequence}
              goodCount={comment.goodCount}
              content={comment.contents}
            />
          ))}
        </ul>
      </div>
      <div className={classes.bottomTxarWrap}>
        <form onSubmit={handleSubmit} className={classes.bottomTxarCtracker}>
          <textarea
            name="comment"
            cols="30"
            rows="5"
            placeholder="댓글을 입력해주세요"
            ref={commentInputRef}
          ></textarea>

          <div className={classes.bottomTxarBtn}>
            <div className={classes.txarRightBtn}>
              <input
                type="submit"
                className={classes.buttonInput}
                value="제출"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comment;
