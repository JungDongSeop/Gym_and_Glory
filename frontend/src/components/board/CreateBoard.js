import React, { useState } from 'react';
import axios from 'axios';
import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';

const CreateBoard = () => {
  // 게시판에 쓴 글들을 저장할 변수
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  // const [userSequence, setUserSequence] = useState('');
  // const [div, setDiv] = useState('');

  // 게시판 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, contents);
    try {
      await axios.post('http://localhost:8080/board', {
        "userSequence":1,
        "title":title,
        "contents":contents,
        "div":1,
      });
      setTitle('');
      setContents('');
      alert('Board created successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Create Board</h1>

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
        <button type="submit">제출</button>      
      </form>

    </main>
  );
};

export default WithNavBarAndSideBar(CreateBoard);
