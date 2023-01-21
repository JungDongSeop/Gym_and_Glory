import React from 'react';
import NavBar from './nav_bar/NavBar';
import SideBar from './side_bar/SideBar';

// 네브바랑 사이드바 합친 뒤, HOC 써서 원하는 페이지에 붙이기
const WithNavBarAndSideBar = (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <NavBar />
        <SideBar />
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default WithNavBarAndSideBar;
;
