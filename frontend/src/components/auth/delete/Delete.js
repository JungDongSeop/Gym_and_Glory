import WithNavBarAndSideBar from "../../layout/WithNavBarAndSideBar";
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RestApi from "../../api/RestApi";

import Logo from "../../../assets/logo.png";
import classes from "./Delete.module.scss";

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
          await axios.delete(`${RestApi()}/user/${authCtx.userSequence}`);
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
      <div className={classes.myDiv}>
      <img src={Logo} alt={Logo}/>
      <div className={classes.formDiv}>
      <h1> 비록 떠나시더라도 운동을 잊지는 마세요! </h1>
      <form onSubmit={handleSubmit}>
        <div>
        <label>
          Password: 
        </label>
          <input type="password" name="password" placeholder=" " 
          />
        {/* <br /> */}
        <button type="submit">Save</button>
        </div>
      </form>
      
      </div>
      </div>
    </main>
  );
};

export default WithNavBarAndSideBar(Delete, true);
