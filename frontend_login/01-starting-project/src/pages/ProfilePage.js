import UserProfile from '../components/profile/user-profile';

const ProfilePage = () => {
  // 유저 비밀번호 변경은 반드시 로그인 상태에서만 가능해야 한다.
  return <UserProfile />;
};

export default ProfilePage;
