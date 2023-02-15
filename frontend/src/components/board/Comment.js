import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import CommentDetail from "./CommentDetail";
import classes from "./Comment.module.css";
import RestApi from "../api/RestApi";
import { Button } from "antd";
import toast, { Toaster } from "react-hot-toast";

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

  const commentRead = async (articleSequence) => {
    const result = await axios(`${RestApi()}/board/comment/${articleSequence}`);
    setComments(result.data.reverse());
    console.log(result.data, "댓글들");
  };

  useEffect(() => {
    const commentRead = async () => {
      const result = await axios(
        `${RestApi()}/board/comment/${articleSequence}`
      );
      setComments(result.data.reverse());
      console.log("댓글 목록", result.data);
    };
    commentRead();
  }, [articleSequence]);

  // 댓글 create axios 요청
  const handleSubmit = (e) => {
    // e.preventDefault();
    // alert("댓글이 작성되었습니다.");
    const enteredcomment = commentInputRef.current.value;
    if (enteredcomment.length === 0) {
      toast.error("댓글을 입력해주세요");
    }
    {
      enteredcomment.length > 0 &&
        // axios
        //   .post(`${RestApi()}/board/comment`, {
        //     userSequence: userSequence,
        //     articleSequence: articleSequence,
        //     contents: enteredcomment,
        //   })
        //   .then((response) => {
        //     setComments([...comments, response.data]);
        //     // setNewComment({ title: "", text: "" });
        //     commentRead(articleSequence);
        //     commentInputRef.current.value = "";
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
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
            } else {
              return res.json().then((data) => {
                console.log(data);
              });
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

  // 댓글 input 값 변경 시 작동
  // const handleChange = (e) => {
  //   setNewComment({ ...newComment, [e.target.name]: e.target.value });
  // };

  return (
    <div>
      {/* <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div> */}
      <div className={classes.replyWrap}>
        <div className={classes.replyTitle}>
          <h2>
            댓글
            <span> {comments.length}</span>
          </h2>
        </div>

        <ul className={classes.replyUl}>
          {comments.map((comment, index) => (
            // <li>
            <CommentDetail
              key={index}
              comment={comment}
              userSequence={userSequence}
              goodCount={comment.goodCount}
              content={comment.contents}
              // commentsLength={comments.length}
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
              <Button className={classes.createButton} type="primary">
                <input
                  className={classes.buttonInput}
                  type="submit"
                  value="제출"
                />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comment;
