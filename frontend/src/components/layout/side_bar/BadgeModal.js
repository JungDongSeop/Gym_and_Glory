import { useState } from 'react';
import Modal from '../../UI/Modal';
import BadgeImages from '../../../assets/badges/BadgeImages'

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
        <BadgeImages />
      </Modal>
    </div>
  );
};

export default BadgeModal;
;
