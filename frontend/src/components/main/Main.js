import React from 'react';
import classes from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import { Carousel } from 'antd';
import Logo from "../../assets/logo.png";
import Button from "../../components/UI/Button";

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
            <Button onClick={() => {carouselRef.current.prev();}}>가이드</Button>
            <Button onClick={() => {carouselRef.current.next();}}>스토리</Button>
          </span>
        </div>
        <div>
          <span className={classes.carouselBox}>
            <h2>스토리</h2>
            <p>옛날 옛적에 ...</p>
            <br/>
            <Button onClick={() => {carouselRef.current.prev();}}>시작</Button>
            <Button onClick={() => {carouselRef.current.next();}}>가이드</Button>
          </span>
        </div>
        <div>
          <span className={classes.carouselBox}>
            <h2>가이드</h2>
            <p>이래 저래 하세요</p>
            <br/>
            <Button onClick={() => {carouselRef.current.prev();}}>스토리</Button>
            <Button onClick={() => {carouselRef.current.next();}}>시작</Button>
          </span>
        </div>

      </Carousel>
      
      <button onClick={() => navigate("/signup")}>회원가입 버튼</button>
      <button onClick={() => navigate("/find-pwd")}>비밀번호 찾기 버튼</button>

      <hr/>

      <button onClick={() => navigate("/lobby")}>로그인 완료. 로비로 이동</button>
    </div>
  );
};

export default Main;
