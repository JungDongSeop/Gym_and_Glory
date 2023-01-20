
const FreeBoard = () => {
  const dummys = [
    {
      id: 1,
      title: '제목',
      contents: '내용',
    },
    {
      id: 2,
      title: '제목',
      description: '내용',
    }
  ]

  return (
    <div>
      <h1>자유 게시판</h1>
      {dummys.map(dummy => (
        dummy.title
      ))}
    </div>
  );
};

export default FreeBoard;
;