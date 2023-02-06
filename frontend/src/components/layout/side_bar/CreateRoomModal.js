import { useState, useEffect } from "react";
import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const APPLICATION_SERVER_URL = "http://localhost:8080/";

const CreateRoom = () => {
  // 네비게이션을 위한 함수
  const navigate = useNavigate();

  // 모달을 열고 닫는 함수
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // const { makeroom } = useContext(GameContext);

  const [roomId, setRoomId] = useState("");
  const [roomTitle, setRoomTitle] = useState("");
  const [teamTitle, setTeamTitle] = useState("");
  const [isopened, setIsopened] = useState(true);
  const [roomPassword, setRoomPassword] = useState(undefined);
  const [ischecked, setIschecked] = useState(false);

  const handleRoomTitleChange = (event) => {
    setRoomTitle(event.target.value);
  };

  const handleTeamTitleChange = (event) => {
    setTeamTitle(event.target.value);
    console.log(teamTitle);
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
        APPLICATION_SERVER_URL + "api/rooms",
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
        state: {
          roomId,
          roomTitle,
          teamTitle,
        },
      });
    }
  }, [roomId]);

  return (
    <div>
      {/* 방 생성 모달 */}
      <Button onClick={openModal}>방 생성</Button>
      <Modal
        open={modalOpen}
        close={closeModal}
        header="게임 방 생성"
        isfooter={false}
      >
        {/* Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
        <form onSubmit={handelSubmit}>
          <p>
            방 제목 :
            <input type="text" required onChange={handleRoomTitleChange} />
          </p>
          <p>
            팀 명 :
            <input type="text" required onChange={handleTeamTitleChange} />
          </p>
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
            <p>
              비밀번호 :
              <input type="text" required onChange={handleRoomPasswordChange} />
            </p>
          ) : null}
          <button type="submit">방 만들기</button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateRoom;
