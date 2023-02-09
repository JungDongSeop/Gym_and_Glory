import React from 'react';
import './Modal.css';

/* 출처 https://phrygia.github.io/react/2021-09-21-react-modal/ */

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트, footer 존재 여부를 부모로부터 받아옴
  const { open, close, width, height } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section
          style={{
            width: width,
            height: height,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {props.children}
          </div>

          <button 
            className="close"
            onClick={close}
            style={{
              width: '200px',
              height: '80px',
              margin: '20px auto',
              backgroundColor: 'crimson'
            }}
            >
            &times;
          </button>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
