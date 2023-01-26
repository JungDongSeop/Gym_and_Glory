import React, { useState } from 'react';
import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';
import NavigateButtons from './NavigateButtons';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

const CreateBoard = () => {
  const navigate = useNavigate();
  
  // 
  const { type } = useParams('notice');
  const types = {'notice': 1, 'free': 2, 'party': 3}  

  // 게시판에 쓴 글들을 저장할 변수
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  // const [userSequence, setUserSequence] = useState('');
  // const [div, setDiv] = useState('');

  // 게시판 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:8080/board', {
        "userSequence":1,
        "title":title,
        "contents":contents,
        "div":types[type],
      });
      setTitle('');
      setContents('');
      alert('Board created successfully!');
      navigate(`/board/${type}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      {/* 게시판 종류 선택 버튼 */}
      <NavigateButtons type={type}/>

      {/* 게시판 제출 */}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Contents:
          <textarea value={contents} onChange={e => setContents(e.target.value)} />
        </label>
        <br />
        <button type="submit">제출</button>      
      </form>

    </main>
  );
};

export default WithNavBarAndSideBar(CreateBoard);
