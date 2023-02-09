import { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import axios from "axios";
import classes from './FriendListModalAdd.module.css'
import RestApi from "../../api/RestApi";
import SearchIcon from '@mui/icons-material/Search';


const FriendListModalAdd = () => {
  // redux로 user 정보 가져오기
  const { userSequence, nickname } = useContext(AuthContext);

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
      await axios.get(`${RestApi()}/friend/search?userSequence=${userSequence}&nickName=${reportUserName.trim()}`)
        .then((res) => {
          setSearchedDatas(res.data);
        })
        .catch(() => {});
    }
  };

  // 친구 요청 보내기
  const handleSendFriendRequest = async (getterSequence) => {
    alert("친구 요청을 보냈습니다.");
    // await axios.get(`${RestApi()}/friend/send`, {
    await axios.post(`${RestApi()}/friend/send`, {
      sendFrd: userSequence,
      recvFrd: getterSequence
    });
  };

  // 받은 친구 요청 출력
  const [getFriendRequests, setGetFriendRequests] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios(`${RestApi()}/friend/receive?nickName=${nickname}`)
      .then((res) => {
        setGetFriendRequests(res.data);
      })
      .catch(() => {
        console.log('받은 신청 유저 없음')
      })
    }

    fetchData();
  }, [userSequence])

  // 친구 요청 수락, 이후 새로운 친구 목록 출력
  const handleAcceptFriendRequest = async (sender, getter) => {
    alert('친구 요청을 수락하셨습니다.')
    await axios.put(`${RestApi()}/friend/receive/ok`, {
      sendFrd: sender,
      recvFrd: getter
    })
    .then((res) => {
      setGetFriendRequests(res.data)
    });
  };
  // 친구 요청 거절
  const handleCancelFriendRequest = async (sender, getter) => {
    alert('친구 요청을 거절하셨습니다.')
    await axios.post(`${RestApi()}/friend/receive/cancel`, {
      sendFrd: sender,
      recvFrd: getter
    })
    .then((res) => {
      setGetFriendRequests(res.data)
    });
  };

  return (
    <div className={classes.container}>
      <div style={{display: 'flex', alignContent: 'flex-start'}}>
        <SearchIcon  sx={{ fontSize: 80 }}/>
          <input
            type="text"
            className={classes.searchBar}
            onChange={handleReportUserNicknameChange}
            ref={enteredusername}
          />
        {/* <Box sx={{ display: 'flex', alignItems: 'self-end', fontSize: 10000, position: 'relative' }}> */}
          {/* <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: 70 }} />
          <TextField fullWidth id="input-with-sx" margin="normal" label="닉네임 검색" variant="standard" sx={{fontSize: '300px'}} 
            style={{}} 
            type="text"

            onChange={handleReportUserNicknameChange}
            ref={enteredusername}/> */}
        {/* </Box> */}
      </div>
      {/* 검색해서 나온 친구 목록 출력 */}
      {Array.isArray(searchedDatas) ? (
        <div className={classes.popUp}>
          {searchedDatas.map((d, index) => {
            return (
              <div key={index} className={classes.popUpDetail}>
                {/* 유저 정보 출력 */}
                <div>
                  <img src={d.profile_img_path} alt="" />
                  Lv.{d.level}
                  {d.nickname}
                </div>
                {/* 친구 요청 버튼 */}
                <button onClick={() => handleSendFriendRequest(d.userSequence)}>
                  요청
                </button>
              </div>
            );
          })}
        </div>
      ) : null}

      <hr />

      {/* 유저가 받은 친구 요청 */}
      <div>
        <p>받은 친구 요청</p>
        {Array.isArray(getFriendRequests) && getFriendRequests.map((data, index) => {
            return (
              <div key={index} className={classes.friendRequest}>
                {data.sendNickName}
                {/* 수락 버튼 */}
                <button onClick={() => handleAcceptFriendRequest(data.userId, data.frdUserId)}>V</button>
                {/* 거절 버튼 */}
                <button onClick={() => handleCancelFriendRequest(data.userId, data.frdUserId)}>X</button>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default FriendListModalAdd;
