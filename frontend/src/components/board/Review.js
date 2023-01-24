// import { useNavigate } from 'react-router-dom';

const Review = () => {
  // Link 쓰기 위한 네비게이터
  // const navigate = useNavigate();  

  return (
    <div>
      <h2>
        댓글 기능 구현합시다.
      </h2>

      {/* 댓글 달기 */}
      <form>
        <input type="text" placeholder="댓글 입력." />
        <input type="submit" value="댓글 제출" />
      </form>

      {/* 댓글 목록 axios 요청 */}


    </div>
  );
};

export default Review;
