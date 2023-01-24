import React, { useState } from 'react';
import WithNavBarAndSideBar from '../../layout/WithNavBarAndSideBar';

// 이후 와이어프레임에 맞춰 수정

const Update = () => {
  const user = {
    name: '홍길동',
    age: 20,
    email: 'nnheo@example.com'
  }

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  function handleSubmit(e) {
    e.preventDefault();
    // 서버에 처리 요청할 함수 작성
    // updateProfile(name, email);
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </main>
  );
}

export default WithNavBarAndSideBar(Update, true);
