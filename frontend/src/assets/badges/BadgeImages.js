import badge1 from './badge01.png';
import badge2 from './badge02.png';
import badge3 from './badge03.png';
import badge4 from './badge04.png';
import badge5 from './badge05.png';
import badge6 from './badge06.png';
import badge7 from './badge07.png';
import badge8 from './badge08.png';
import classes from './BadgeImages.module.css';

import React, { useState } from "react";
// import axios from 'axios';
// import { useContext } from "react";
// import AuthContext from "../../store/auth-context";

const BadgeImages = () => {
  // user 정보 가져오기
  // const { userSequence } = useContext(AuthContext);

  // 뱃지 목록 가져오기
  const badgeList = [0, 2, 4];
  // const [badgeList, setBadgeLIst] = useState([0, 2, 4]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await axios(`http://localhost:8080/list`)
  //     .then((res) => {
  //       setBoard(res.data);
  //     });
  //   };
  //   fetchData();
  // }, [type]);
  const items = [badge1, badge2, badge3, badge4, badge5, badge6, badge7, badge8];

  // 마우스 호버 시 설명 창 나타내기
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className={classes.container}>
      {items.map((badge, index) => {

        return(
        <div key={index}>
          <img 
            className={badgeList.includes(index) ? classes.have : classes.notHave} 
            src={badge} 
            alt="badge" 
            id={index}
            onMouseEnter={() => setShowDescription(index)}
            onMouseLeave={() => setShowDescription(false)}
            />
          
          {showDescription === index ? (
            <div 
              className={classes.descriptionBox}
              style={{
                // 마우스 호버 시, 해당 그림의 우측 하단에 설명창 표시
                left: document.getElementById(`${index}`).getBoundingClientRect().right - 10,
                top: document.getElementById(`${index}`).getBoundingClientRect().bottom - 10,
              }}
            >
              {index}번째 뱃지입니다. 설명 작성
            </div>
          ) : null}
      </div>)})}
    </div>
  )
}
export default BadgeImages;