import React from 'react';
//import classes from './Button.module.css';
import classes from './LobbyButton.module.scss';

// 크기 조절이 가능한 버튼
function Button({ onClick, children, size }) {
  const styles = {
    small: {
      fontSize: '12px',
      padding: '5px 10px'
    },
    sideBar: {
      height: '40px',
      width: '150px',
      fontSize: '18px',
      // padding: '10px',
    },
    large: {
      fontSize: '20px',
      padding: '15px 30px'
    }
  }

  return (
    <button className={classes.button} onClick={onClick} style={styles[size]}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: 'sideBar'
};

export default Button;
