import { useState, useEffect } from "react";
import Modal from "../../UI/Modal";
import Button from "../../UI/LobbyButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RestApi from "../../api/RestApi";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import classes from './CreateRoomModal.module.scss';

const APPLICATION_SERVER_URL = `${RestApi()}/`;

const CreateRoom = () => {
  // 네비게이션을 위한 함수
  const navigate = useNavigate();

  // // 모달을 열고 닫는 함수
  // const [modalOpen, setModalOpen] = useState(false);
  // const openModal = () => {
  //   setModalOpen(true);
  // };
  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  const [roomId, setRoomId] = useState("");
  const [roomTitle, setRoomTitle] = useState("");
  const [teamTitle, setTeamTitle] = useState("");
  const [isopened, setIsopened] = useState(true);
  const [roomPassword, setRoomPassword] = useState(undefined);
  const [ischecked, setIschecked] = useState(false);

  const [visibility, setVisibility] = useState(false);

  const handleRoomTitleChange = (event) => {
    setRoomTitle(event.target.value);
  };

  const handleTeamTitleChange = (event) => {
    setTeamTitle(event.target.value);
  };

  const handleIsopenedChange = () => {
    setIsopened(!isopened);
  };

  const handleIscheckedChange = (event) => {
    setIschecked(!ischecked);
    handleIsopenedChange();
  };

  const handleRoomPasswordChange = (event) => {
    setRoomPassword(event.target.value);
  };

  const handelSubmit = (event) => {
    event.preventDefault();
    makeRoom();
  };

  const makeRoom = () => {
    axios
      .post(
        APPLICATION_SERVER_URL + "rooms",
        {
          title: roomTitle,
          teamName: teamTitle,
          // privateStatus: isopened,
          password: roomPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Methods": "GET,POST",
          },
        }
      )
      .then((response) => {
        setRoomId(response.data);
      });
  };

  useEffect(() => {
    if (roomId !== "") {
      navigate("/gameroom", {
        replace: true,
        state: {
          roomId,
          roomTitle,
          teamTitle,
          isHost: true,
        },
      });
    }
  }, [roomId]);

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div>
      {/* 방 생성 모달 */}
      {/* <Button onClick={openModal}>방 생성</Button> */}
      <Modal buttonTitle='방 생성' width="500px" height="300px">
      <div className={classes.modalDiv}>
        {/* Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
        <div  className={classes.modalTitleText}> 방 만들기 </div>
        <form onSubmit={handelSubmit}>

          <div className={classes.modalformDiv1}>
          <p>
            방 제목 :          </p>
            <input type="text" required onChange={handleRoomTitleChange} />
          <p>
            팀 명 :          </p>
            <input type="text" required onChange={handleTeamTitleChange} />
          </div>
          <div className={classes.modalformDiv2}>
          <p>
            <label>
              비밀방
              <input
                type="checkbox"
                checked={ischecked}
                onChange={handleIscheckedChange}
              />
            </label>
          </p>
          {!isopened ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>
                비밀번호 :               </p>
                <input
                  type={visibility ? "text" : "password"}
                  required
                  onChange={handleRoomPasswordChange}
                  style={{ marginLeft: 4, marginRight: 4 }}
                />
              {visibility ? (
                <VisibilityOff
                  onClick={handleVisibility}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <Visibility
                  onClick={handleVisibility}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          ) : null}
          </div>

          <div className={classes.modalformbuttonDiv}>
          <button type="submit">방 만들기</button>
          </div>
        </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateRoom;
