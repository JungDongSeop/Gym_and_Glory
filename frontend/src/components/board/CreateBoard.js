import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';

const CreateBoard = () => {
  return (
    <main>
      <h1>Create Board</h1>
      <form>
        <p>제목</p>
        <input type="text" />
        <br />
        <textarea />
        <br />
        <button>Create Board</button>
      </form>

    </main>
  );
};

export default WithNavBarAndSideBar(CreateBoard);
