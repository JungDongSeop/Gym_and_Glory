import React, {useState, useEffect} from 'react';
import axios from 'axios';
import RestApi from "../api/RestApi";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

// 댓글 좋아요 여부 출력만을 위해 사용
const CommentDetail = (props) => {
  // 댓글 pk
  const commentSequence = props.commentSequence;
  const userSequence = props.userSequence;
  const [goodCount, setGoodCount] = useState(props.goodCount);

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
  const [isCommentLike, setIsCommentLike] = useState(false)
  const [isToggle, setIsToggle] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      await axios(
        `${RestApi()}/board/comment/IsGood/${userSequence}/${commentSequence}`
      ).then((res) => {
        setIsCommentLike(res.data);
      })
    };
    fetchData();
  })

  // 댓글 좋아요 요청
  const handleGood = async () => {
    try {
      await axios(
        `${RestApi()}/board/comment/good/${userSequence}/${commentSequence}`
      );
      // alert("댓글을 추천하였습니다.");
      // Show a success message or refresh the comments list
    } catch (error) {
      setIsCommentLike(!isCommentLike)
    }
    setIsToggle(!isToggle)
    setGoodCount(isCommentLike ? goodCount - 1 : goodCount + 1)
  };

  return (
    <div>
      <span>{goodCount}</span>
      {isCommentLike ? 
        <ThumbUpAltIcon onClick={handleGood}/> 
        : 
        <ThumbUpOffAltIcon onClick={handleGood}/>}
    </div>
  );
};

export default CommentDetail;