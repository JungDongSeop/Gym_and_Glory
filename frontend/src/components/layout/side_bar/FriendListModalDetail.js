import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import axios from "axios";
import RestApi from "../../api/RestApi";
const FriendListModalDetail = (props) => {
  // redux로 user 정보 가져오기
  const { userSequence } = useContext(AuthContext);

  // 친구 ID 상속받기
  const friendId = props.friendId;
  const [friendInfo, setFriendInfo] = useState({});

  // 친구 데이터 axios 요청
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${RestApi()}/user/detail/${friendId}`);
      setFriendInfo(result.data);
    };
    fetchData();
  }, [friendId]);

  // 친구 delete axios 요청 (이후 api 만들어지면 붙이기)
  const handleDelete = async () => {
    alert("친구 요청 삭제");
    await axios.delete(`${RestApi()}/friend/list/${userSequence}/${friendId}`);
  };

  // 삭제 버튼 누르면 그냥 null로 만들어서 없애기 (왜 axios 요청을 해도, FriendListModal 컴포넌트에서 friends가 바뀌는데도 표시되는 게 갱신 안되는지 모르겠다.)
  const [isShow, setIsShow] = useState(true);

  return (
    <span>
      {isShow ? (
        <div>
          <img src={friendInfo.profile_image_path} alt="" />
          Lv.{friendInfo.level ? friendInfo.level : "00"}
          {friendInfo.nickname}
          <button
            onClick={() => {
              handleDelete();
              props.onClick();
              setIsShow(false);
            }}
          >
            친구 삭제
          </button>
        </div>
      ) : null}
    </span>
  );
};

export default FriendListModalDetail;
