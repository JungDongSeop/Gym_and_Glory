const CommentDetail = (props) => {
  const comment = props.comment;

  return (
    <div>
      <h1>{comment.commentSequence}</h1>
    </div>
  );
};

export default CommentDetail;