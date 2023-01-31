import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import NavigateButtons from './NavigateButtons';
import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';

const ReportBoardCreate = () => {
  // url 이동을 위한 함수
  const navigate = useNavigate();
  
  // redux로 user 정보 가져오기
  const user = useSelector((state) => state.user);

  // 게시판에 저장할 정보
  const [contents, setContents] = useState('');
  const [kind, setKind] = useState('');
  // 게시판에 작성한 글 저장
  const handleChange = (event) => {
    setContents(event.target.value);
  };
  // 신고 종류 저장
  const handleKindChange = (event) => {
    setKind(event.target.value);
  };

  // 게시판 create axios 요청
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add logic to create board here
    try {
      await axios.post('http://localhost:8080/report', {
        "sendSequence": user.pk,
        "getSequence": 5,
        "contents":contents,
        "kind":kind,
      });

      alert('신고가 접수되었습니다.!');
      navigate(`/board/report`);
    } catch (error) {
      console.log(error);
    }
    setContents('');
  };

  return (
    <main>
      {/* 게시판 종류 선택 버튼 */}
      <NavigateButtons type="report"/>

      {/* 신고 내용 작성 */}
      <form onSubmit={handleSubmit}>
        <label>
          신고 종류:
          <select value={kind} onChange={handleKindChange}>
            <option value="1">욕설</option>
            <option value="2">게임 불참</option>
            <option value="3">성희롱</option>
          </select>
        </label>

        <br/>

        <label>
          내용을 입력하세요:
          <input type="text" value={contents} onChange={handleChange} />
        </label>

        <button type="submit">Create Board</button>
      </form>
    </main>
  );
};

export default WithNavBarAndSideBar(ReportBoardCreate);
