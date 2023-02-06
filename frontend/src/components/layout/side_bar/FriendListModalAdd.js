import { useState, useRef } from "react";
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import axios from "axios";
import RestApi from "../../api/RestApi";

const FriendListModalAdd = (props) => {
  // redux로 user 정보 가져오기
  const { userSequence } = useContext(AuthContext);

  // 닉네임으로 유저 검색
  // 닉네임 저장할 변수
  const [searchedDatas, setSearchedDatas] = useState([]);
  // 입력된 값
  const enteredusername = useRef();
  // 닉네임 목록 불러오기
  const handleReportUserNicknameChange = async () => {
    const reportUserName = enteredusername.current.value;
    // 닉네임이 있으면 해당 닉네임으로 axios 요청
    if (reportUserName.trim()) {
      await axios
        .get(`${RestApi()}/search/nickname/${reportUserName}`)
        .then((res) => {
          setSearchedDatas(res.data);
        })
        .catch(() => {});
    }
  };

  // 친구 요청 보내기
  const handleSendFriendRequest = async (getter) => {
    alert("친구 요청을 보냈습니다.");
    await axios.get(`${RestApi()}/friend/send/${userSequence}/${getter}`);
  };

  // 받은 친구 요청 출력 (이후 axios 요청 만들어지면 바꾸기)
  const getFriendRequests = [
    {
      userSequence: 5,
      email: "pliot123@naver.com",
      password: null,
      nickname: "타타아아",
      gender: null,
      telNumber: null,
      level: null,
      exp: null,
      mannerPoint: null,
      minClearTime: null,
      totalPlayTime: null,
      imagePath: null,
      role: null,
      enabled: true,
      username: "pliot123@naver.com",
      authorities: null,
      accountNonExpired: true,
      accountNonLocked: true,
      credentialsNonExpired: true,
    },
  ];
  // const [getFriendRequests, setGetFriendRequests] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios(`여기엔 친구 요청 목록 조회 api 넣기`);
  //     setGetFriendRequests(result.data);
  //   }
  // }, [userSequence, getFriendRequests])

  // 친구 요청 수락/거절
  const handleAcceptFriendRequest = async (sender, accept) => {
    alert(`친구 요청을 ${accept === 1 ? "수락" : "거절"}하셨습니다.`);
    await axios(
      `${RestApi()}/friend/accept/${sender}/${userSequence}/${accept}`
    );
    // 이후 친구요청목록 다시 request 할 것
  };

  return (
    <div>
      <span>유저 검색 :</span>
      <input
        type="text"
        onChange={handleReportUserNicknameChange}
        ref={enteredusername}
      />
      {/* 검색해서 나온 친구 목록 출력 */}
      {Array.isArray(searchedDatas) ? (
        <div>
          {searchedDatas.map((d, index) => {
            return (
              <div key={index}>
                {/* 유저 정보 출력 */}
                <img src={d.profile_img_path} alt="" />
                Lv.{d.level}
                {d.nickname}
                {/* 친구 요청 버튼 */}
                <button onClick={() => handleSendFriendRequest(d.userSequence)}>
                  V
                </button>
              </div>
            );
          })}
        </div>
      ) : null}

      <hr />

      {/* 유저가 받은 친구 요청 */}
      {getFriendRequests ? (
        <div>
          <p>친구 요청이 있습니다.</p>
          {getFriendRequests.map((data, index) => {
            return (
              <div key={index}>
                <img src={data.profile_img_path} alt="" />
                Lv.{data.level}
                {data.nickname}
                {/* 수락 버튼 */}
                <button
                  onClick={() =>
                    handleAcceptFriendRequest(data.userSequence, 1)
                  }
                >
                  V
                </button>
                {/* 거절 버튼 */}
                <button
                  onClick={() =>
                    handleAcceptFriendRequest(data.userSequence, 0)
                  }
                >
                  X
                </button>
                <button></button>
              </div>
            );
          })}
        </div>
      ) : (
        <p>친구 요청이 없습니다.</p>
      )}
    </div>
  );
};

export default FriendListModalAdd;
