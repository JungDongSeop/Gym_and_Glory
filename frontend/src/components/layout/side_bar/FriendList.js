import { useState } from 'react';
import Modal from '../../UI/modal/Modal';
import { useNavigate } from "react-router-dom";

const FriendList = () => {

  // 네비게이션을 위한 함수
  const navigate = useNavigate();

  // 모달을 열고 닫는 함수
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };


  // 
  return (
    <div>
      {/* 방 생성 모달 */}
      <button onClick={openModal}>친구 목록</button>
      <Modal open={modalOpen} close={closeModal} header="게임 방 생성" isfooter="true">
        {/* Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
        <p>친구 목록 출력</p>
        <p>친구 목록 출력</p>
        <button onClick={() => navigate("/gameroom")}>어디론가 이동</button>
      </Modal>
    </div>
  );
};

export default FriendList;

