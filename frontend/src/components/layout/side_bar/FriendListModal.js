import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import FriendListModalDetail from './FriendListModalDetail';
import axios from 'axios';
import Modal from '../../UI/Modal';
import Button from '../../UI/Button'

const FriendList = () => {

  // 네비게이션을 위한 함수
  const navigate = useNavigate();

  // redux로 user 정보 가져오기
  const userSequence = useSelector((state) => state.user.pk);

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
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:8080/friend/list/${userSequence}`);
      setFriends(result.data);
    };
    fetchData();
  }, [userSequence]);

  // 유저 아이디로 유저 정보 받아오기
  
  return (
    <div>
      {/* 방 생성 모달 */}
      <Button onClick={openModal}>친구 목록</Button>
      <Modal open={modalOpen} close={closeModal} header="친구목록" isfooter="true">
        {/* Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
        <ul>
          {friends.map((friend, index) => (
            <li 
              key={index}
            >
              <FriendListModalDetail friendId={friend.sendSequence} />
            </li>
          ))}
        </ul>
        <button onClick={() => navigate("/gameroom")}>어디론가 이동</button>
      </Modal>
    </div>
  );
};

export default FriendList;

