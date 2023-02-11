import React, { useState, useEffect } from "react";
// import { useSelector } from 'react-redux';
import { useContext } from "react";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import ExerciseGrass from "./ExerciseGrass";
import ExerciseGraph from "./ExerciseGraph";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import defaultProfile from "../../assets/defaultProfile.png";
import classes from "./MyPage.module.css";
import RestApi from "../api/RestApi";

const MyPage = () => {
  // 유저 정보 가져오기
  // const user = useSelector((state) => state.user);
  const authCtx = useContext(AuthContext);

  // 유저 정보 axios 요청
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get(`${RestApi()}/user/detail/${authCtx.userSequence}`)
      .then((res) => {
        console.log('user', res.data)
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authCtx]);

  // 이미지 위에 마우스 올리면 프로필 편집
  // const [isChangeProfile, setIsChangeProfile] = useState(false);

  // 통계에서 운동 종류 구별
  const [exerciseType, setExerciseData] = useState(1);
  // 통계에서 x축 최소값 구별
  const [xAxisMin, setXAxisMin] = useState(7);
  // 통계에서 x축 단위 구별
  const [xUnit, setXUnit] = useState(1);

  // ======================================================================
  // 프로필 사진 업로드 기능
  const [profileImage, setProfileImage] = useState(null);
  // const fileInput = useRef(null);
  // 사진 선택
  const handleFileSelect = (e) => {
    console.log('e.target.files[0]', e.target.files[0])
    setProfileImage(e.target.files[0]);
  };
  // 사진 db에 저장
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('files', profileImage);
    console.log('formData update', typeof(formData));
    console.log('formData', formData);
    try {
      await axios.post(`${RestApi()}/file/user/${authCtx.userSequence}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.log('에러 폼 데이터', typeof(formData))
      console.error(error);
    }
  };
  

  return (
    <main>
      {user ? (
        <div className={classes.container}>
          <div className={classes.profileWrap}>
            {/* 유저 프로필 사진 */}
            <img
              className={classes.profile}
              src={user.imagePath || defaultProfile}
              alt="프로필"
              // onMouseEnter={() => {setIsChangeProfile(true)}}
              // onMouseLeave={() => {setIsChangeProfile(false)}}
            />
<input type="file" onChange={handleFileSelect} />
<button onClick={handleFileUpload}>Upload</button>

            {/* <h2>유저 pk : {authCtx.userSequence}</h2> */}
            <p>
              Lv.{authCtx.level ? authCtx.level : 1}
              {authCtx.nickname}
            </p>
          </div>
          {/* 잔디 */}
          <div className={classes.grassWrap}>
            <ExerciseGrass />
          </div>
          <br />
          {/* 운동 통계 */}
          <div className={classes.graphWrap}>
            {/* 운동 종류 */}
            <div className={classes.graphButtonWrap}>
              <div>
                <button className={`${classes.graphButton} ${exerciseType === 1 ? classes.checked : ''}`} onClick={() => setExerciseData(1)}>스쿼트</button>
                <button className={`${classes.graphButton} ${exerciseType === 2 ? classes.checked : ''}`} onClick={() => setExerciseData(2)}>런지</button>
                <button className={`${classes.graphButton} ${exerciseType === 3 ? classes.checked : ''}`} onClick={() => setExerciseData(3)}>푸쉬업</button>
                <button className={`${classes.graphButton} ${exerciseType === 4 ? classes.checked : ''}`} onClick={() => setExerciseData(4)}>점핑잭</button>
              </div>
              {/* 총 기간 */}
              <div>
                <button className={`${classes.graphButton} ${xAxisMin === 7 ? classes.checked : ''}`} onClick={() => {if (xUnit !== 1){setXUnit(1)}; setXAxisMin(7)}}>1주일</button>
                <button className={`${classes.graphButton} ${xAxisMin === 30 ? classes.checked : ''}`} onClick={() => {if (xUnit === 30){setXUnit(7)}; setXAxisMin(30)}}>1달</button>
                <button className={`${classes.graphButton} ${xAxisMin === 364 ? classes.checked : ''}`} onClick={() => setXAxisMin(364)}>1년</button>
              </div>
            </div>
            {/* 운동 그래프 */}
            <ExerciseGraph
              exerciseKind={exerciseType}
              xAxisMin={xAxisMin}
              xUnit={xUnit}
            />
            {/* 단위 기간 */}
            <div className={classes.graphXAxisWrap}>
              <button className={`${classes.graphButton} ${xUnit === 1 ? classes.checked : ''}`} onClick={() => setXUnit(1)}>일별</button>
              <button className={`${classes.graphButton} ${xUnit === 7 ? classes.checked : ''}`} onClick={() => {if (xAxisMin === 7) {setXAxisMin(30)}; setXUnit(7)}}>주별</button>
              <button className={`${classes.graphButton} ${xUnit === 30 ? classes.checked : ''}`} onClick={() => {setXAxisMin(364); setXUnit(30);}}>월별</button>
            </div>
          </div>
        </div>
      ) : (
        <p>존재하지 않는 프로필입니다</p>
      )}
    </main>
  );
};

export default WithNavBarAndSideBar(MyPage, true);