import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/logo.svg';
import './NavBar.module.css';

// 네브바 만들기. 이후 추가 예정
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/"><img className='logo' src={Logo} alt="홈으로" /></Link>
        </li>
        <li>
          <Link to="/lobby">로비</Link>
        </li>
        <li>
          <Link to="/">랭킹</Link>
        </li>
        <li>
          <Link to="/board">게시판</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
