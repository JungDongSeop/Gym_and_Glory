import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>
        회원가입 기능 구현합시다.
      </h2>
      <p>아이디</p>
      <input type="text"/>
      <br />
      <p>비밀번호</p>
      <input type="password" />
      <br />
      <p>비밀번호 확인</p>
      <input type="password" />
      <br />
      <span>닉네임
        <Button>중복 확인</Button>
      </span>
      <br />

      <Button onClick={() => navigate("/lobby")}>로그인</Button>
    </div>
  );
};

export default Signup;
