// import React, { useState, useEffect } from 'react';
// import { Button } from 'antd';
// import { Link, useParams } from'react-router-dom';
// import axios from 'axios';

// // 게시판 상세페이지

// const DetailBoard = () => {
//   // URL의 params를 쓰기 위한 state
//   const params = useParams();
  
//   // axios 요청을 위한 state
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios('https://jsonplaceholder.typicode.com/users/');
//       setData(result.data);
//       console.log(result.data);
//       console.log(params);
      
//     };
//     fetchData();
//   }, []);

//   // 게시글 상세 정보를 담은 변수

//   return (
//     <div>
//       <h1>게시판 상세페이지 입니다.</h1>      

//       <p>제목 : </p>
//       <p>{data[0].id}</p>
//       <p>내용 : </p>
//       <p>{data[0].name}</p>
      
//       {/* 글 제출 */}
//       <Link to="/board/create"><Button type="primary">글 작성</Button></Link>

//     </div>
//   );
// };

// export default DetailBoard;
// ;