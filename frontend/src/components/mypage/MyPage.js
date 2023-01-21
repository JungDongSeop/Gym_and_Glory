import { useParams } from "react-router-dom";
import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';

const data = {
  dongsum: {
    name: "Dongsum",
    description: '동섬이 설명',
  },
  sumin: {
    name: "Sumin",
    description: '수민이 설명',
  },
};

const MyPage = () => {
  const params = useParams();
  const profile = data[params.username];

  return (
    <main>
      <h1>마이페이지 입니다.</h1>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.description}</p>
        </div>
      ) : (
        <p>존재하지 않는 프로필입니다</p>
      )}
    </main>
  );
};

export default WithNavBarAndSideBar(MyPage);
