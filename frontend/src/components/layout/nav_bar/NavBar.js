import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import RestApi from "../../api/RestApi";
import defaultProfile from "../../../assets/defaultProfile.png";
import Logo from "../../../assets/logo.png";
import AuthContext from "../../../store/auth-context";
import classes from "./NavBar.module.css";
import LogoutIcon from "@mui/icons-material/Logout";

// 네브바 만들기. 이후 추가 예정
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };

  // 유저 정보 axios 요청
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get(`${RestApi()}/user/detail/${authCtx.userSequence}`)
      .then((res) => {
        console.log("user", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authCtx]);

  return (
    <nav>
      {/* 네브바 왼쪽 */}
      <div>
        <Link to="/">
          <img className="logo" src={Logo} alt="홈으로" />
        </Link>
        {isLoggedIn && (
          <Link
            to="/lobby"
            className={classes.navText}
            style={{
              color:
                location.pathname === "/lobby" ? "rgb(220, 1, 1)" : "white",
            }}
          >
            로비
          </Link>
        )}
        <Link
          to="/ranking"
          className={classes.navText}
          style={{
            color:
              location.pathname === "/ranking" ? "rgb(220, 1, 1)" : "white",
          }}
        >
          랭킹
        </Link>
        <Link
          to="/board/notice"
          className={classes.navText}
          style={{
            color: location.pathname.includes("/board")
              ? "rgb(220, 1, 1)"
              : "white",
          }}
        >
          게시판
        </Link>
      </div>

      {/* 네브바 오른쪽 */}
      {isLoggedIn && (
        <div>
          <Link to="/" onClick={logoutHandler}>
            <div className={classes.outIconDiv}>
              <p>로그아웃</p>
              <LogoutIcon />
            </div>
          </Link>
          <Link to="/mypage">
            <img
              className={classes.profile}
              src={
                user ? (user.imagePath ? user.imagePath : defaultProfile) : null
              }
              alt="마이페이지로"
            />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
