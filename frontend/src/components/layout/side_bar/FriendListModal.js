import React, { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import FriendListModalDetail from "./FriendListModalDetail";
import FriendListModalAdd from "./FriendListModalAdd";
import axios from "axios";
import classes from './FriendListModal.module.css';
import Modal from "../../UI/Modal";
import RestApi from "../../../components/api/RestApi";
import Button from "../../UI/Button";

const FriendList = () => {
  // 페이지 (친구 목록창 or 친구 신청창 구분)
  const [page, setPage] = useState(1);

  // user 정보 가져오기
  const { userSequence } = useContext(AuthContext);

  // 친구 목록 저장할 변수
  const [friends, setFriends] = useState([]);
  // 시작할 때 친구 목록 요청. 이후 friends 바뀔 때마다 실행
  useEffect(() => {
    const fetchData = async () => {
      await axios(`${RestApi()}/friend/${userSequence}`)
      .then((res) => {
        setFriends(res.data);
      });
    };
    fetchData();
    return () => {};
  }, [userSequence, page]);

  return (
    <div>
      <Modal
        buttonTitle='친구 목록'
        width='700px'
        height='500px'
        backgroundColor='rgba(0, 1, 24, 0.75)'
      >
        <div className={classes.container}>

          {/* 창 선택 */}
          <button className={`${classes.modalButton} ${page === 1 ? classes.checked : classes.nonchecked}`} onClick={() => setPage(1)}>목록</button>
          <button className={`${classes.modalButton} ${page === 2 ? classes.checked : classes.nonchecked}`} onClick={() => setPage(2)}>신청</button>

          {/* 창 표시 */}
          {page === 1 ? (
            <div>
              <ul className={classes.friendsWrap}>
                {friends.map((friend, index) => (
                  <li key={index} className={classes.friend}>
                    <FriendListModalDetail
                      friendId={friend.frdUserId}
                      onClick={() => {
                        setPage(1);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : ( 
            <FriendListModalAdd />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default FriendList;
