import { useNavigate } from "react-router-dom";
import Logo from '../../../assets/logo.svg';
import classes from './Signup.module.css';
import Button from "../../UI/Button";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.whiteBox}>
      <img className={classes.logoSmall} src={Logo} alt="logo-small" />
      <br />
      <input className={classes.inputText} type="text" placeholder="아이디(e-mail)" />
      <br />
      <input className={classes.inputText} type="password" placeholder="비밀번호" />
      <br />
      <input className={classes.inputText} type="password" placeholder="비밀번호 확인" />
      <br />
      <input className={classes.inputText} type="text" placeholder="닉네임" />
      <br />
      <div class="gender-checkbox">
        <input type="radio" id="male" name="gender" value="male"/>
        <label for="male">남</label>
        
        <input type="radio" id="female" name="gender" value="female"/>
        <label for="female">여</label>
      </div>      
    <Button onClick={() => navigate("/lobby")}>로그인</Button>

    </div>

  );
};

export default Signup;
