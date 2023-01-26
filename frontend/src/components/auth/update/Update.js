import React, { useState, useRef } from "react";
import WithNavBarAndSideBar from "../../layout/WithNavBarAndSideBar";

// 이후 와이어프레임에 맞춰 수정

const Update = () => {
  // const user = {
  //   name: "홍길동",
  //   age: 20,
  //   email: "nnheo@example.com",
  // };
  const newPasswordInputRef = useRef();

  // const [name, setName] = useState(user.name);
  // const [email, setEmail] = useState(user.email);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
  };

  return (
    <form>
      <div>
        <label htmlFor="new-password"></label>
      </div>
    </form>
    // <main>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Name:
    //       <input
    //         type="text"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       />
    //     </label>
    //     <br />
    //     <label>
    //       Email:
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </label>
    //     <br />
    //     <button type="submit">Save</button>
    //   </form>
    // </main>
  );
};

export default WithNavBarAndSideBar(Update, true);
