import newbie1 from './newbie1.png';
import newbie2 from './newbie2.png';
import newbie3 from './newbie3.png';
import newbie4 from './newbie4.png';
import classes from './BadgeImages.module.css';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import RestApi from '../../components/api/RestApi';

const BadgeImages = () => {
  // user 정보 가져오기
  const { userSequence } = useContext(AuthContext);
  
  // 뱃지 목록 가져오기
  // const badgeList = [0, 2, 4];
  const [badgeAllList, setBadgeAllList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios(`${RestApi()}/badge/list`)
      .then((res) => {
        console.log('뱃지', res.data)
        console.log(res.data[0].path)
        setBadgeAllList(res.data);
      });
    };
    fetchData();
  }, []);
  const items = [newbie1, newbie2, newbie3, newbie4]

  // 마우스 호버 시 설명 창 나타내기
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className={classes.container}>
      {items.map((item, index) => {

        return(
        <div key={index}>
          <img 
            // className={badgeAllList.includes(index) ? classes.have : classes.notHave} 
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
                left: document.getElementById(`${index}`).getBoundingClientRect().right - 10,
                top: document.getElementById(`${index}`).getBoundingClientRect().bottom - 10,
              }}
            >
              {badgeAllList ? badgeAllList[index].description : null}
            </div>
          ) : null}
      </div>)})}
    </div>
  )
}
export default BadgeImages;