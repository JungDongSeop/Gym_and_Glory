import Modal from '../../UI/Modal';
import BadgeImages from '../../../assets/badges/BadgeImages'

const BadgeModal = () => {

  return (
    <div style={{margin: 'auto'}}>
      <Modal buttonTitle='뱃지 목록' width='600px'>
        <BadgeImages/>
      </Modal>
    </div>
  );
};

export default BadgeModal;
;
