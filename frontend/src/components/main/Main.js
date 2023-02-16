import React, { useContext, useRef } from "react";
import classes from "./Main.module.scss";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import AuthContext from "../../store/auth-context";

import Logo from "../../assets/logo.png";
import story_img1 from "../../assets/story_img1.PNG";
import story_img2 from "../../assets/story_img2.PNG";
import story_img3 from "../../assets/story_img3.PNG";
import story_img4 from "../../assets/story_img4.PNG";
import guide_img1 from "../../assets/guide_img1.PNG";
import guide_img2 from "../../assets/guide_img2.PNG";
import guide_img3 from "../../assets/guide_img3.png";
import guide_img4 from "../../assets/guide_img4.PNG";
import story_textbg from "../../assets/story_textbg.jpg";
import Button from "../../components/UI/Button";

const Main = () => {
  // custom react hook
  const navigate = useNavigate();
  const isLoggedIn = useContext(AuthContext).isLoggedIn;

  // 캐러셀 페이지 넘기기
  const carouselRef = React.createRef();

  // 스토리Div. 스크롤 파악용
  const storyDivRev = useRef();
  const storyContentRef = useRef([]);

  // 캐러셀과의 스크롤 충돌로 인해 직접 접근
  const storyDivScrollUp = () => {
    document.getElementById("storyDiv").scrollTop = 0;
  };

  return (
    <div>
      {/* 캐러셀 넣기 */}
      <Carousel className={classes.carousel} ref={carouselRef}>
        {/* 로그인 캐러셀 */}
        <div>
          <span className={classes.carouselBox}>
            <img src={Logo} alt={Logo}></img>
            <div className={classes.mainTextDiv}>
              <h1>푸쉬업, 플랭크, 런지, 버피 </h1>
              <h1>Let`s Go</h1>
            </div>
            {!isLoggedIn && (
              <Button onClick={() => navigate("/login")}>게임시작</Button>
            )}
            {isLoggedIn && (
              <Button onClick={() => navigate("/lobby")}>게임시작</Button>
            )}
            <br />
            <span
              className={classes.leftword}
              onClick={() => {
                carouselRef.current.prev();
              }}
            >
              {"<"}
              {"<"} 가이드
            </span>
            <span
              className={classes.rightword}
              onClick={() => {
                carouselRef.current.next();
                storyDivScrollUp();
              }}
            >
              스토리 {">"}
              {">"}
            </span>
          </span>
        </div>
        {/* 스토리 캐러셀 */}
        <div>
          <span className={classes.carouselBox}>
            <img className={classes.smallLogo} src={Logo} alt={Logo}></img>
            <div ref={storyDivRev} className={classes.storyDiv} id="storyDiv">
              <h2>스토리</h2>

            <div
              ref={(el) => (storyContentRef.current[0] = el)}
              className={classes.storySection}
            >

                      <div className="fadeComp1">
                        <img src={story_img1} alt={story_img1}></img>
                      </div>
                    
                      <div className="fadeComp2">
                          <div
                          className={classes.StorytextDiv}
                          style={{ backgroundImage: `url(${story_textbg})` }}
                          id="story1"
                        >
                          <p>
                            여러분은 이 땅에서 가장 위대한 드래곤 슬레이어가 되는 꿈을
                            꾸며 여행을 떠나는 젊은 강아지들입니다. (때때로 당신은
                            사람일 수도 있습니다.)
                          </p>
                        </div>
                      </div>

      
            </div>

            <div
              ref={(el) => (storyContentRef.current[0] = el)}
              className={classes.storySection}
            >


                      <div className="fadeComp1">
                        <img src={story_img2} alt={story_img2} id="storyImg2"></img>
                      </div>

                      <div className="fadeComp2">
                          <div
                          className={classes.StorytextDiv}
                          style={{ backgroundImage: `url(${story_textbg})` }}
                          id="story2"
                        >
                          <p>
                          이 목표를 달성하기 위해서는 먼저 신체적으로 강하고 전투에
                          능숙해야 합니다. 이를 위해서는 스쿼트, 팔 굽혀 펴기 및 기타
                          운동과 같은 일상적인 근육 훈련에 참여해야 합니다.
                          </p>
                        </div>
                      </div>
            </div>

            <div
              ref={(el) => (storyContentRef.current[0] = el)}
              className={classes.storySection}
            >
                      <div className="fadeComp1">
                        <img src={story_img3} alt={story_img3} id="storyImg3"></img>
                      </div>

                      <div className="fadeComp2">
                          <div
                          className={classes.StorytextDiv}
                          style={{ backgroundImage: `url(${story_textbg})` }}
                          id="story3"
                        >
                          <p>
                          당신은 여행을 떠나며 점점 더 강하고 다양한 드래곤과 만나
                    전투를 벌이게 됩니다. 힘과 기술이 성장함에 따라 당신은 결국
                    가장 무시무시한, 전설 속 붉은 숲의 고대 드래곤과의 마지막
                    사투에 직면하게 될 것입니다.
                          </p>
                        </div>
                      </div>
            </div>

            <div
              ref={(el) => (storyContentRef.current[0] = el)}
              className={classes.storySection}
            >
  
                      <div className="fadeComp1">
                        <img src={story_img4} alt={story_img4} id="storyImg4"></img>
                      </div>


                      <div className="fadeComp2">
                          <div
                          className={classes.StorytextDiv}
                          style={{ backgroundImage: `url(${story_textbg})` }}
                        >
                          <p>
                          만약 당신이 그 드래곤을 무찌른다면 드래곤 머슬 마스터라는
                    칭호를 얻고 지상 최고의 드래곤 슬레이어가 됩니다. 그 이름은
                    영원토록 (DB가 허용하는 기간동안) 후세에 전해질 것입니다.
                          </p>
                        </div>
                      </div>

      
            </div>
            
            <div style={{
              display:'inline-block',
              height:'200px'
            }}></div>

            </div>
            <br />
            <span
              className={classes.leftword}
              onClick={() => {
                carouselRef.current.prev();
              }}
            >
              {"<"}
              {"<"} 시작
            </span>
            <span
              className={classes.rightword}
              onClick={() => {
                carouselRef.current.next();
              }}
            >
              가이드 {">"}
              {">"}
            </span>
          </span>
        </div>
        {/* 가이드 캐러셀 */}
        <div>
          <span className={classes.carouselBox}>
            <img className={classes.smallLogo} src={Logo} alt={Logo}></img>

            <div ref={storyDivRev} className={classes.storyDiv} id="storyDiv">
              <h2>가이드</h2>

            <div
              ref={(el) => (storyContentRef.current[0] = el)}
              className={classes.storySection}
            >

                      <div className="fadeComp1">
                        <img src={guide_img1} alt={guide_img1}></img>
                      </div>
                    
                      <div className="fadeComp2">
                          <div
                          className={classes.StorytextDiv}
                          style={{ backgroundImage: `url(${story_textbg})` }}
                          id="story1"
                        >
                          <p>
                            로비에서 방을 만들어 입장하세요.
                          </p>
                        </div>
                      </div>

      
            </div>

            <div
              ref={(el) => (storyContentRef.current[0] = el)}
              className={classes.storySection}
            >


                      <div className="fadeComp1">
                        <img src={guide_img2} alt={guide_img2} id="storyImg2"></img>
                      </div>

                      <div className="fadeComp2">
                          <div
                          className={classes.StorytextDiv}
                          style={{ backgroundImage: `url(${story_textbg})` }}
                          id="story2"
                        >
                          <p>
                          원하시는 운동을 선택하고 하단의 READY 버튼을 누르세요. 방장이 GAME START 버튼을 누르면 시작합니다.
                         </p>
                        </div>
                      </div>
            </div>

            <div
              ref={(el) => (storyContentRef.current[0] = el)}
              className={classes.storySection}
            >
                      <div className="fadeComp1">
                        <img src={guide_img3} alt={guide_img3} id="storyImg3"></img>
                      </div>

                      <div className="fadeComp2">
                          <div
                          className={classes.StorytextDiv}
                          style={{ backgroundImage: `url(${story_textbg})` }}
                          id="story3"
                        >
                          <p>
                          웹캠에 전신이 보이도록 정면에서 선 후, 선택한 운동을 하면 공격이 가능합니다.
                          회복을 하고 싶다면 스탠딩 사이드 크런치(양 손을 양쪽 귀 뒤에 대고 다리를 한 쪽씩 드는 자세)를 해보세요.
                          </p>
                        </div>
                      </div>
            </div>

            <div
              ref={(el) => (storyContentRef.current[0] = el)}
              className={classes.storySection}
            >
  
                      <div className="fadeComp1">
                        <img src={guide_img4} alt={guide_img4} id="storyImg4"></img>
                      </div>


                      <div className="fadeComp2">
                          <div
                          className={classes.StorytextDiv}
                          style={{ backgroundImage: `url(${story_textbg})` }}
                        >
                          <p>
                          누적 대미지만큼 경험치를 얻어 레벨업을 할 수 있습니다.
                          팀의 클리어 타임은 단체 랭킹에 올라갑니다.
                          친구와 협력하고 경쟁하며 높은 순위를 노려보세요.                        

                          </p>
                        </div>
                      </div>

      
            </div>
            
            <div style={{
              display:'inline-block',
              height:'200px'
            }}></div>

            </div>



            <br />
            <span
              className={classes.leftword}
              onClick={() => {
                carouselRef.current.prev();
                storyDivScrollUp();
              }}
            >
              {"<"}
              {"<"} 스토리
            </span>
            <span
              className={classes.rightword}
              onClick={() => {
                carouselRef.current.next();
              }}
            >
              시작 {">"}
              {">"}
            </span>
          </span>
        </div>
      </Carousel>
    </div>
  );
};

export default Main;
