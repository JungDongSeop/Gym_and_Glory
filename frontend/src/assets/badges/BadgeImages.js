import newbie1 from './newbie1.png';
import newbie2 from './newbie2.png';
import newbie3 from './newbie3.png';
import newbie4 from './newbie4.png';
import mountain1 from './mountain1.png';
import mountain2 from './mountain2.png';
import mountain3 from './mountain3.png';
import mountain4 from './mountain4.png';
import galaxy1 from './galaxy1.png';
import galaxy2 from './galaxy2.png';
import galaxy3 from './galaxy3.png';
import galaxy4 from './galaxy4.png';

import classes from './BadgeImages.module.css';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import RestApi from '../../components/api/RestApi';

const BadgeImages = () => {
  // user 정보 가져오기
  const { userSequence } = useContext(AuthContext);
  
  // 뱃지 전체 목록 가져오기
  const [badgeAllList, setBadgeAllList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios(`${RestApi()}/badge/list`)
      .then((res) => {
        setBadgeAllList(res.data);
      });
    };
    fetchData();
  }, []);
  const items = [newbie1, newbie2, newbie3, newbie4, mountain1, mountain2, mountain3, mountain4, galaxy1, galaxy2, galaxy3, galaxy4]

  // 뱃지 유저 목록 가져오기
  const [userBadges, setUserBadges] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios(`${RestApi()}/badge/list/${userSequence}`)
      .then((res) => {
        setUserBadges(res.data)
      })
    }
    fetchData();
  }, [userSequence]);

  // 마우스 호버 시 설명 창 나타내기
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className={classes.container}>
      {/* 뱃지들 출력 */}
      {items.map((item, index) => {
        return(
        <div key={index} className={classes.badge}>
          <img
          // js는 객체를 비교할 때 값이 아니라 메모리의 위치를 비교하므로, 값이 같아도 false 반환
            className={JSON.stringify(userBadges).includes(JSON.stringify(badgeAllList[index])) ? null : classes.notHave} 
            src={item} 
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
                left: document.getElementById(`${index}`).getBoundingClientRect().right - 20,
                top: document.getElementById(`${index}`).getBoundingClientRect().bottom - 20,
              }}
            >
              {badgeAllList[index] ? badgeAllList[index].description : null}
            </div>
          ) : null}
      </div>)})}
    </div>
  )
}
export default BadgeImages;