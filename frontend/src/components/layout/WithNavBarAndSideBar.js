import React from 'react';
import NavBar from './nav_bar/NavBar';
import SideBar from './side_bar/SideBar';
// import SideBarGame from './side_bar/SideBarGame';
// import SideBarMyPage from './side_bar/SideBarMyPage';

// 네브바랑 사이드바 합친 뒤, HOC 써서 원하는 페이지에 붙이기
const WithNavBarAndSideBar = (WrappedComponent, isMyPage) => {
  return (props) => {
    return (
      <>
        <NavBar />
        <SideBar isMyPage={isMyPage} />

        {/* {isMyPage? (
          <SideBarMyPage />
          ) : (
            <SideBarGame />
          )
        } */}
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default WithNavBarAndSideBar;
;
