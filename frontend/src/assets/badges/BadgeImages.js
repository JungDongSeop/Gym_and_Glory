import badge1 from './badge01.png';
import badge2 from './badge02.png';
import badge3 from './badge03.png';
import badge4 from './badge04.png';
import badge5 from './badge05.png';
import badge6 from './badge06.png';
import badge7 from './badge07.png';
import badge8 from './badge08.png';
import classes from './BadgeImages.module.css';

const BadgeImages = () => {

  const items = [badge1, badge2, badge3, badge4, badge5, badge6, badge7, badge8];

  return (
    <div>
      {items.map((item) => (
        <img className={classes.badge} src={item} alt="badge" />
      ))}
    </div>
  )
}
export default BadgeImages;