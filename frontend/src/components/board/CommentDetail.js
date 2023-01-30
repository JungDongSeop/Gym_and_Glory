import axios from 'axios';

const CommentDetail = (props) => {
  const comment = props.comment;

  // 댓글 지우는 axios 요청
  const handleDelete = async (comment) => {
    try {
      await axios.delete(`/board/comment/${comment.commentSequence}`);
      // Show a success message or refresh the comments list
    } catch (error) {
      console.error(error);
      // Show an error message
    }
  }

  return (
    <div>
      <h1>{comment.commentSequence}, 작성자 : {comment.userSequence}, 추천 : {comment.goodCount}</h1>
      <button onClick={() => handleDelete()}>삭제</button>
      
    </div>
  );
};

export default CommentDetail;