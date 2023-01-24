import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import Logo from '../../../assets/logo.svg';
import classes from './FindPwd.module.css';

const FindPwd = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={classes.whiteBox}>
        <img className={classes.logoSmall} src={Logo} alt="logo-small" />
        <br />
        <input className={classes.inputText} type="text" placeholder="이메일" />
        <br />
        <Button onClick={() => navigate("/login")}>비밀번호 찾기</Button>
      </div>
    </div>
  );
};

export default FindPwd;
