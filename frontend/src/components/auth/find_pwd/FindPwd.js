import Button from "../../UI/Button";

const FindPwd = () => {
  return (
    <div>
      <h2>
        비밀번호 찾기 기능 구현합시다.
      </h2>
      <form>
        <input type="email" />
        <Button type="submit">확인</Button>
      </form>
    </div>
  );
};

export default FindPwd;
