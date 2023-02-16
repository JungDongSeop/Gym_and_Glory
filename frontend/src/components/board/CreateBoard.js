import React, { useState, useRef } from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import NavigateButtons from "./NavigateButtons";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import RestApi from "../api/RestApi";

import classes from "./CreateBoard.module.css";
// import { toast } from "react-hot-toast";

// import CkEditor from "./CkEditor";

const CreateBoard = () => {
  // url 이동을 위한 함수
  const navigate = useNavigate();
  const titleInputRef = useRef();
  const contentInputRef = useRef();

  // url의 params를 사용하기 위한 변수
  const { type } = useParams("notice");
  const types = { notice: 1, free: 2, party: 3 };

  // user 정보 가져오기
  const { userSequence } = useContext(AuthContext);

  // 게시판 제출 버튼
  // 게시판에 쓴 글들을 저장할 변수
  // const [title, setTitle] = useState("");
  // const [contents, setContents] = useState("");
  const [image, setImage] = useState(null);

  // const changeHandler = (event) => {
  //   event.preventDefault();
  //   console.log(titleInputRef.current.value);
  //   console.log(contentInputRef.current.value);
  // };

  // 게시판 제출 함수
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("userSequence", userSequence);
    formData.append("title", titleInputRef.current.value);
    formData.append("contents", contentInputRef.current.value);
    formData.append("div", types[type]);
    if (image) {
      formData.append("image", image);
    }

    axios
      .post(`${RestApi()}/board`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/board/${type}`);
      })
      .catch((err) => {
        console.log(err);
      });

    // try {
    //   await axios.post(`${RestApi()}/board`, {
    //     userSequence: userSequence,
    //     title: titleInputRef.current.value,
    //     contents: contentInputRef.current.value,
    //     div: types[type],
    //   });
    //   setTitle("");
    //   setContents("");
    //   // alert("Board created successfully!");
    //   navigate(`/board/${type}`);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(event.target.files[0]);

    const imageUrl = URL.createObjectURL(selectedImage);
    setImageUrl(imageUrl);
  };

  const typename = () => {
    if (type === "notice") {
      return "공지사항";
    } else if (type === "free") {
      return "자유게시판";
    } else if (type === "party") {
      return "팀원 모집";
    }
  };

  const typeDescription = () => {
    if (type === "notice") {
      return "공지사항을 작성하세요";
    } else if (type === "free") {
      return "여러 사용자들과 자유롭게 이야기를 나누어 보세요 유용한 팁과 정보를 쉽게 얻으실 수 있을거에요.";
    } else if (type === "party") {
      return "파티모집 게시판을 통해 함께 운동할 유저를 찾고 모험을 떠나보아요!";
    }
  };

  return (
    <main className={classes.boardDiv}>
      {/* 게시판 종류 선택 버튼 */}
      <NavigateButtons type={type} />
      {/* {() => {
        const typename = ""
        if (type == "notice") {
          typename = "공지사항"
        } else if (type == "free") {
          return "자유게시판"
        }
        return typename
        <p></p>
      }} */}
      {/* 게시판 제출 */}
      <form onSubmit={handleSubmit}>
        <div className={classes.board_wrap}>
          <div className={classes.board_write_wrap}>
            <h1>{typename()}</h1>
            <p>{typeDescription()}</p>
            <p>{typeDescription}</p>
            <div className={classes.board_write}>
              <div className={classes.title}>
                <dl>
                  <dt>제목</dt>
                  <dd>
                    <input
                      type="text"
                      placeholder="제목을 입력하세요"
                      ref={titleInputRef}
                    />
                  </dd>
                </dl>
              </div>
              <div className={classes.cont}>
                <textarea
                  placeholder="내용을 입력하세요"
                  ref={contentInputRef}
                ></textarea>
              </div>
            </div>
            <div className={classes.bottomDiv}>
              <div>
                <div className={classes.addImage}>
                  {/* <label htmlFor="boardImg"></label> */}
                  <input
                    type="file"
                    onChange={handleImageChange}
                    // ref={boardImageRef}
                  />
                </div>
                <div>
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      style={{ width: "300px", height: "auto" }}
                    />
                  )}
                </div>
              </div>

              <div className={classes.bt_wrap}>
                <button type="submit" className={classes.on}>
                  등록
                </button>
                <button
                  type="submit"
                  // onClick={() => navigate(`/board/${type}`)}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default WithNavBarAndSideBar(CreateBoard);
