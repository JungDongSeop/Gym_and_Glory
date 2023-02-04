import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import FriendListModalDetail from './FriendListModalDetail';
import FriendListModalAdd from './FriendListModalAdd';
import axios from 'axios';
import Modal from '../../UI/Modal';
import Button from '../../UI/Button'

const FriendList = () => {

  // 페이지 (친구 목록창 or 친구 신청창 구분)
  const [page, setPage] = useState(1);

  // user 정보 가져오기
  const {userSequence} = useContext(AuthContext);

  // 모달을 열고 닫는 함수
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // 친구 목록 저장할 변수
  const [friends, setFriends] = useState([]);
  // 친구 목록 axios 요청
  const readFriends = async (userSequence) => {
    await axios(`http://localhost:8080/friend/list/${userSequence}`)
    .then((res) => {
      setFriends(res.data)
    });
  };
  // 시작할 때 친구 목록 요청. 이후 friends 바뀔 때마다 실행
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:8080/friend/list/${userSequence}`, {
      });
      setFriends(result.data);
    };
    fetchData();
  }, [userSequence, friends]);
  
  return (
    <div>
      {/* 방 생성 모달 */}
      <Button onClick={openModal}>친구 목록</Button>

      <Modal open={modalOpen} close={closeModal} header="친구목록" isfooter="true">

      {/* 창 선택 */}
      <button onClick={() => setPage(1)}>목록</button>
      <button onClick={() => setPage(2)}>신청</button>

      {/* 창 표시 */}
      {page === 1 ? (
        <div>
          <ul>
            {friends.map((friend, index) => (
              <li key={index}>
                <FriendListModalDetail friendId={friend.sendSequence} onClick={() => readFriends(userSequence)}/>
              </li>
            ))}
          </ul>
        </div>
      ) : (<FriendListModalAdd />)
      }
      </Modal>
    </div>
  );
};

export default FriendList;

