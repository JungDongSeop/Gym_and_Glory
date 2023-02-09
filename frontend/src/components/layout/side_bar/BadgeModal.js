import { useState } from 'react';
import Modal from '../../UI/Modal';
import Button from '../../UI/Button';
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
      <Button onClick={openModal}>뱃지 목록</Button>
      <Modal open={modalOpen} close={closeModal} height='400px' width='800px'>
        <BadgeImages/>
      </Modal>
    </div>
  );
};

export default BadgeModal;
;
