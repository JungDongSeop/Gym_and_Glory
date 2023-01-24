import WithNavBarAndSideBar from '../../layout/WithNavBarAndSideBar';

// 이후 와이어프레임에 맞춰 수정

const Delete = () => {

  function handleSubmit(e) {
    e.preventDefault();
    // 서버에 처리 요청할 함수 작성
    // updateProfile(name, email);
  }

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
}

export default WithNavBarAndSideBar(Delete, true);
