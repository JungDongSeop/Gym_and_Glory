import Button from '../../UI/Button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Link 쓰기 위한 네비게이터
  const navigate = useNavigate();  


  return (
    <div>
      <h2>
        로그인 기능 구현합시다.
      </h2>
      <input type="text" placeholder="ID" />
      <br />
      <input type="password" placeholder="PASSWORD" />
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
