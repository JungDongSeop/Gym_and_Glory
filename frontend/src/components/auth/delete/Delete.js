import WithNavBarAndSideBar from "../../layout/WithNavBarAndSideBar";
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RestApi from "../../api/RestApi";

const API_KEY = `AIzaSyAxyqcEP1JpA7fbuUMKBEHeZ2TazbmlvF8`;

const URL = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${API_KEY}`;
// 이후 와이어프레임에 맞춰 수정

const Delete = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res + "dsfsdf");
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "회원탈퇴에 실패했습니다.";
            console.log(data);
            alert(errorMessage);
          });
        }
      })
      .then(async (data) => {
        console.log(data);
        try {
          await axios.delete(`${RestApi()}api/user/${authCtx.userSequence}`);
          authCtx.logout();
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
    alert("이용해주셔서 감사합니다.");
    navigate("/");
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>
          Password: <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </main>
  );
};

export default WithNavBarAndSideBar(Delete, true);
