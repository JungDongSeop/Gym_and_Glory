import React from 'react';
import classes from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import { Carousel } from 'antd';
import Logo from "../../assets/logo.png";

const Main = () => {
  // custom react hook
  const navigate = useNavigate();

  // 캐러셀 페이지 넘기기
  const carouselRef = React.createRef();


  return (
    <div className={classes.main}>
      {/* 로그인하지 않은 유저에게 표시되는 화면 */}
      <h1>메인 페이지. 제일 처음 보이는 화면입니다.</h1>

      {/* 캐러셀 넣기 */}
      <Carousel className={classes.carousel} ref={carouselRef}>
        <div>
          <span className={classes.carouselBox}>
            <img src={Logo} alt={Logo}></img>
            <p>푸쉬업, 플랭크, 런지, 버피 Let`s Go</p>
            <button onClick={() => navigate("/login")}>로그인 버튼</button>
            <br/>
            <button onClick={() => {carouselRef.current.prev()}}>스토리</button>
            <button onClick={() => {carouselRef.current.next()}}>가이드</button>
          </span>
        </div>
        <div>
          <span className={classes.carouselBox}>
            <h2>스토리</h2>
            <p>옛날 옛적에 ...</p>
            <br/>
            <button onClick={() => {carouselRef.current.prev()}}>가이드</button>
            <button onClick={() => {carouselRef.current.next()}}>시작</button>
          </span>
        </div>
        <div>
          <span className={classes.carouselBox}>
            <h2>가이드</h2>
            <p>이래 저래 하세요</p>
            <br/>
            <button onClick={() => {carouselRef.current.prev()}}>시작</button>
            <button onClick={() => {carouselRef.current.next()}}>스토리</button>
          </span>
        </div>

      </Carousel>
      
      <button onClick={() => navigate("/signup")}>회원가입 버튼</button>
      <button onClick={() => navigate("/find-pwd")}>비밀번호 찾기 버튼</button>

      <hr/>

      {/* 로그인한 유저에게 표시되는 화면  */}
      <button onClick={() => navigate("/lobby")}>로그인 완료. 로비로 이동</button>

      {/* <p><Link to="/mypage/dongsum">동섬 마이페이지</Link></p> */}
      {/* <p><Link to="/board/">게시판</Link></p> */}
    </div>
  );
};

export default Main;
