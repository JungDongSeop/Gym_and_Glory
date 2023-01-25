import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/logo.svg';
import './NavBar.module.css';

// 네브바 만들기. 이후 추가 예정
const Navbar = () => {
  return (
    <nav>
      {/* 네브바 왼쪽 */}
      <div>
        <Link to="/"><img className='logo' src={Logo} alt="홈으로" /></Link>
        <Link to="/lobby">로비</Link>
        <Link to="/ranking">랭킹</Link>
        <Link to="/board">게시판</Link>
      </div>

      {/* 네브바 오른쪽 */}
      <div>
        <Link t0="/">로그아웃</Link>
        <Link to="/mypage"><img className='logo' src={Logo} alt="마이페이지로" /></Link>
      </div>
    </nav>
  );
}

export default Navbar;
