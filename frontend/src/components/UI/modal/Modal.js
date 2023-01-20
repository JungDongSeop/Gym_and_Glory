import React from 'react';
import './Modal.css';

/* 출처 https://phrygia.github.io/react/2021-09-21-react-modal/ */

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트, footer 존재 여부를 부모로부터 받아옴
  const { open, close, header, isfooter } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          {/* footer 조건에 따라 없애기 */}
          { isfooter
            ? <footer>
                <button className="close" onClick={close}>
                  close
                </button>
              </footer>
              : null
          }
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
