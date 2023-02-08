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
          }}
        >
          <div
            style={{
              position: 'relative',              
            }}
            >
            <div
              style={{
                height: '40px'
              }}
              >
              <button 
                className="close"
                onClick={close}
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '0'
                }}
                >
                &times;
              </button>
            </div>

            {props.children}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
