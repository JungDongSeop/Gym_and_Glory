import { useSelector } from 'react-redux';
import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';

const MyPage = () => {
  const user = useSelector((state) => state.user);

  return (
    <main>
      <h1>마이페이지 입니다.</h1>
      {user ? (
        <div>
          <h2>유저 pk : {user.pk}</h2>
          <p>유저 닉네임 : {user.nickname}</p>
        </div>
      ) : (
        <p>존재하지 않는 프로필입니다</p>
      )}
    </main>
  );
};

export default WithNavBarAndSideBar(MyPage, true);
