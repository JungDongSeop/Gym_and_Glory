import { useState } from 'react';
import Modal from '../../UI/Modal';

const BadgeModal = () => {

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
      <button onClick={openModal}>뱃지 목록</button>
      <Modal open={modalOpen} close={closeModal} header="뱃지 목록" isfooter={false}>
        <p>뱃지 사진 띄웁시다</p>
      </Modal>
    </div>
  );
};

export default BadgeModal;
;
