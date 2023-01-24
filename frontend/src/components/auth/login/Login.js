import Button from '../../UI/Button';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo.svg';
import classes from './Login.module.css';

const Login = () => {
  // Link 쓰기 위한 네비게이터
  const navigate = useNavigate();  

  return (
    <div className={classes.whiteBox}>
      <img className={classes.logoSmall} src={Logo} alt="logo-small" />
      <br />
      <input className={classes.inputText} type="text" placeholder="ID" />
      <br />
      <input className={classes.inputText} type="password" placeholder="PASSWORD" />
      <br />
      <Button onClick={() => navigate("/lobby")}>로그인</Button>
      <br />
      <Button onClick={() => navigate("/signup")}>회원가입</Button>
      <br />
      <Button onClick={() => navigate("/find-pwd")}>비밀번호 찾기</Button>
    </div>
  );
};

export default Login;
