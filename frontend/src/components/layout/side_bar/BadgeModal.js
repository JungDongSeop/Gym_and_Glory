// import { useState } from 'react';
import Modal from '../../UI/Modal';
import BadgeImages from '../../../assets/badges/BadgeImages'

const BadgeModal = () => {

  return (
    <div>
      <Modal buttonTitle='뱃지 목록' width='500px' height='500px' style={{overflowY: 'hidden'}}>
        <BadgeImages/>
      </Modal>
    </div>
  );
};

export default BadgeModal;
;
