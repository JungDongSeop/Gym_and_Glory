import React from 'react';
import classes from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import { Carousel } from 'antd';
import Logo from "../../assets/logo.svg";
import Button from "../../components/UI/Button";

const Main = () => {
  // custom react hook
  const navigate = useNavigate();

  // 캐러셀 페이지 넘기기
  const carouselRef = React.createRef();

  return (
    <div>
      {/* 로그인하지 않은 유저에게 표시되는 화면 */}

      {/* 캐러셀 넣기 */}
      <Carousel className={classes.carousel} ref={carouselRef}>
        {/* 로그인 캐러셀 */}
        <div>
          <span className={classes.carouselBox}>
            <img src={Logo} alt={Logo}></img>
            <p>푸쉬업, 플랭크, 런지, 버피 Let`s Go</p>
            <Button onClick={() => navigate("/login")}>로그인 버튼</Button>
            <br/>
            <span className={classes.leftword} onClick={() => {carouselRef.current.prev();}}>{'<'}{'<'} 가이드</span>
            <span className={classes.rightword} onClick={() => {carouselRef.current.next();}}>스토리 {'>'}{'>'}</span>
          </span>
        </div>
        {/* 스토리 캐러셀 */}
        <div>
          <span className={classes.carouselBox}>
            <img className={classes.smallLogo} src={Logo} alt={Logo}></img>
            <h2>스토리</h2>
            <p>옛날 옛적에 ...</p>
            <br/>
            <span className={classes.leftword} onClick={() => {carouselRef.current.prev();}}>{'<'}{'<'} 시작</span>
            <span className={classes.rightword} onClick={() => {carouselRef.current.next();}}>가이드 {'>'}{'>'}</span>
          </span>
        </div>
        {/* 가이드 캐러셀 */}
        <div>
          <span className={classes.carouselBox}>
          <img className={classes.smallLogo} src={Logo} alt={Logo}></img>
            <h2>가이드</h2>
            <p>이래 저래 하세요</p>
            <br/>
            <span className={classes.leftword} onClick={() => {carouselRef.current.prev();}}>{'<'}{'<'} 스토리</span>
            <span className={classes.rightword} onClick={() => {carouselRef.current.next();}}>시작 {'>'}{'>'}</span>
          </span>
        </div>

      </Carousel>

      {/* <button onClick={() => navigate("/lobby")}>로그인 완료. 로비로 이동</button> */}
    </div>
  );
};

export default Main;
