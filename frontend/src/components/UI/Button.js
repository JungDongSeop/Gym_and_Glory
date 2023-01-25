import React from 'react';
import classes from './Button.module.css';

// 크기 조절이 가능한 버튼
function Button({ onClick, children, size }) {
  const styles = {
    small: {
      fontSize: '12px',
      padding: '5px 10px'
    },
    sideBar: {
      height: '60px',
      width: '250px',
      fontSize: '30px',
      padding: '10px 20px',
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
