import React, { useState, useRef } from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router";
import axios from "axios";
import NavigateButtons from "./NavigateButtons";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import RestApi from "../api/RestApi";
import classes from "./ReportBoardCreate.module.scss";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const ReportBoardCreate = () => {
  // url 이동을 위한 함수
  const navigate = useNavigate();

  const enteredusername = useRef();
  // redux로 user 정보 가져오기
  const { userSequence } = useContext(AuthContext);

  // 닉네임으로 유저 검색
  const [searchedDatas, setSearchedDatas] = useState([]);
  const [pickedData, setPickedData] = useState({});

  // 게시판에 저장할 정보
  const [contents, setContents] = useState("");
  const [kind, setKind] = useState("1");
  // 게시판에 작성한 글 저장
  const handleChange = (event) => {
    setContents(event.target.value);
  };
  // 신고 종류 저장
  const handleKindChange = (event) => {
    setKind(event.target.value);
  };
  // 닉네임 목록 불러오기
  const handleReportUserNicknameChange = async () => {
    const reportUserName = enteredusername.current.value;
    // 닉네임이 있으면 해당 닉네임으로 axios 요청
    if (reportUserName.trim()) {
      await axios
        .get(`${RestApi()}/search/nickname/${reportUserName}`)
        .then((res) => {
          setSearchedDatas(res.data);
        })
        .catch(() => {});
    }
  };
  // 닉네임 저장
  const saveReportUserData = (data) => {
    setPickedData(data);
  };

  const [imageUrl, setImageUrl] = useState("");

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(event.target.files[0]);

    const imageUrl = URL.createObjectURL(selectedImage);
    setImageUrl(imageUrl);
  };

  // 게시판 create axios 요청
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("contents", contents);
    formData.append("kind", kind);
    formData.append("sendSequence", userSequence);
    formData.append("getSequence", pickedData.userSequence);
    if (image) {
      formData.append("image", image);
    }

    axios
      .post(`${RestApi()}/report`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          title: "신고가 정상적으로 접수되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/board/report`);
          }
        });
      })
      .catch((err) => {
        if (err.response.status === 413) {
          toast.error("사진 용량이 매우 커서 등록할 수 없습니다.");
        }
      });
  };

  return (
    <main className={classes.boardDiv}>
      <Toaster position="top-center" reverseOrder={false} />

      {/* 게시판 종류 선택 버튼 */}
      <NavigateButtons type="report" />
      {/* 신고 내용 작성 */}
      <div className={classes.myDiv}>
        <form onSubmit={handleSubmit}>
          {/* 신고 종류 선택 */}
          <div className={classes.rbcDiv}>
            <label>
              신고 종류 :
              <select value={kind} onChange={handleKindChange}>
                <option value="1">욕설</option>
                <option value="2">게임 불참</option>
                <option value="3">성희롱</option>
              </select>
            </label>

            {/* 유저 닉네임 검색 */}
            <label>
              유저 닉네임 :
              <input
                type="text"
                onChange={handleReportUserNicknameChange}
                ref={enteredusername}
              />
              {Array.isArray(searchedDatas) ? (
                <div className={classes.pickNickDiv}>
                  {searchedDatas.map((d, index) => {
                    return (
                      <div
                        className={classes.pickNick}
                        key={index}
                        onClick={() => saveReportUserData(d)}
                      >
                        {d.nickname}
                      </div>
                    );
                  })}
                </div>
              ) : null}
              <br />
              고른 닉네임 :{" "}
              {pickedData ? (
                <span className={classes.realPickNick}>
                  {pickedData.nickname}
                </span>
              ) : null}
            </label>

            {/* 신고 내용 입력 */}
            <label>
              신고할 내용 :
              <input type="text" value={contents} onChange={handleChange} />
            </label>

            {/* 수민이꺼 */}
            <label className={classes.imgfileLabel} for="file">
              이미지 선택:
              <input type="file" onChange={handleImageChange} />
              {imageUrl && (
                <img
                  src={imageUrl}
                  style={{ height: "100px", width: "auto" }}
                  alt="사진"
                />
              )}
            </label>

            {/* 제출 버튼 */}
            <button type="submit" className={classes.submitBtn}>
              Create Board
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default WithNavBarAndSideBar(ReportBoardCreate);
