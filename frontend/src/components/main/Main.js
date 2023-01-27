import React, { useContext } from "react";
import classes from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import AuthContext from "../../store/auth-context";
import Logo from "../../assets/logo.svg";
import Button from "../../components/UI/Button";

const Main = () => {
  // custom react hook
  const navigate = useNavigate();
  const isLoggedIn = useContext(AuthContext).isLoggedIn;

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
            <h1>푸쉬업, 플랭크, 런지, 버피 </h1>
              <h1>Let`s Go</h1>
            {!isLoggedIn && (
              <div>
                <Button onClick={() => navigate("/login")}>로그인</Button>
              </div>
            )}
            {isLoggedIn && (
              <Button onClick={() => navigate("/lobby")}>게임시작</Button>
            )}
            <br />
            <span
              className={classes.leftword}
              onClick={() => {
                carouselRef.current.prev();
              }}
            >
              {"<"}
              {"<"} 가이드
            </span>
            <span
              className={classes.rightword}
              onClick={() => {
                carouselRef.current.next();
              }}
            >
              스토리 {">"}
              {">"}
            </span>
          </span>
        </div>
        {/* 스토리 캐러셀 */}
        <div>
          <span className={classes.carouselBox}>
            <img className={classes.smallLogo} src={Logo} alt={Logo}></img>
            <h2>스토리</h2>
            <p>옛날 옛적에 ...</p>
            <br />
            <span
              className={classes.leftword}
              onClick={() => {
                carouselRef.current.prev();
              }}
            >
              {"<"}
              {"<"} 시작
            </span>
            <span
              className={classes.rightword}
              onClick={() => {
                carouselRef.current.next();
              }}
            >
              가이드 {">"}
              {">"}
            </span>
          </span>
        </div>
        {/* 가이드 캐러셀 */}
        <div>
          <span className={classes.carouselBox}>
            <img className={classes.smallLogo} src={Logo} alt={Logo}></img>
            <h2>가이드</h2>
            <p>이래 저래 하세요</p>
            <br />
            <span
              className={classes.leftword}
              onClick={() => {
                carouselRef.current.prev();
              }}
            >
              {"<"}
              {"<"} 스토리
            </span>
            <span
              className={classes.rightword}
              onClick={() => {
                carouselRef.current.next();
              }}
            >
              시작 {">"}
              {">"}
            </span>
          </span>
        </div>
      </Carousel>
    </div>
  );
};

export default Main;
