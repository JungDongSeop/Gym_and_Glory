import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import AuthContext from "../../../store/auth-context";
import "./NavBar.module.css";

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

  return (
    <nav>
      {/* 네브바 왼쪽 */}
      <div>
        <Link to="/">
          <img className="logo" src={Logo} alt="홈으로" />
        </Link>
        {isLoggedIn && <Link to="/lobby" style={{color: location.pathname === "/lobby" ? "red": "white"}}>로비</Link>}
        <Link to="/ranking" style={{color: location.pathname === "/ranking" ? "red": "white"}}>랭킹</Link>
        <Link to="/board/notice" style={{color: location.pathname === "/board/notice" ? "red": "white"}}>게시판</Link>
      </div>

      {/* 네브바 오른쪽 */}
      {isLoggedIn && (
        <div>
          <Link to="/" onClick={logoutHandler}>
            로그아웃
          </Link>
          <Link to="/mypage">
            <img className="logo" src={Logo} alt="마이페이지로" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
