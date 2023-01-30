import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavigateButtons from './NavigateButtons';
import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

const UpdateBoard = () => {
  // url 이동을 위한 함수
  const navigate = useNavigate();
  
  // url의 params를 사용하기 위한 변수
  const { type, articleSequence } = useParams('notice');
  
  // 게시판에 쓴 글들을 저장할 변수
  const [board, setBoard] = useState([]);
  
  // 게시글 read axios
  useEffect(() => {
    const fetchBoard = async () => {
      const result = await axios(`http://localhost:8080/board/${articleSequence}`);
      setBoard(result.data);   
    };
    fetchBoard();
  }, [articleSequence]);
  
  const handleChange = (event) => {
    setBoard({ ...board, [event.target.name]: event.target.value });
  }

  // 게시판 수정 axios
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8080/board/`, {
      "articleSequence": articleSequence,
      "title":board.title,
      "contents":board.contents,
    })
      .then(() => {
        navigate(`/board/${type}`)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <main>
      {/* 게시판 종류 선택 버튼 */}
      <NavigateButtons type={type}/>

      <form onSubmit={handleSubmit}>
        <label>
          제목:
          <input type="text" name="title" defaultValue={board.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          내용:
          <input type="text" name="contents" defaultValue={board.contents} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Update Board</button>
      </form>
    </main>
  );
}

export default WithNavBarAndSideBar(UpdateBoard);
