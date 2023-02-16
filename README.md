# 목차

1. [**서비스 소개**](#1)
2. [**기획 배경**](#2)
3. [**기능 소개**](#3)
4. [**시연 영상**](#4)
5. [**기술 스택**](#5)
6. [**프로젝트 일정 및 산출물**](#6)
7. [**개발 멤버 및 회고**](#7)

<br/>

---

<br/>

<div id="1"></div>

# 🌟서비스 소개

## 서비스 설명

### 개요

- 한줄 소개 : 용도 잡고 근육도 얻고 1석 2조
- 서비스 명 : **`GYM & GLORY`**


### 타겟 🎯

- 운동하고 싶은데, 헬스장 갈 돈이 없는 사람들
- 운동하고 싶은데, 헬스장 가기 귀찮은 사람들
- 운동하고 싶은데, 혼자 하기 싫은 사람들
- 운동하고 싶은데, 게임도 하고 싶은 사람들

> 👉 \*\* **여럿이서 집에서 편하게 운동하고 싶은 사람들** \*\*


<div id="2"></div>

# 🎞기획 배경

## 배경

경기 침체로 인해, 지갑이 가벼워진 사람들...
여름엔 덥고, 겨울엔 추워서 운동하로 나가기 싫은 사람들...
가볍게 운동하면서 친구도 만들고 싶은 사람들...

이 사람들이 건강하고 행복하길 바라는 마음에 만들게 되었습니다.
<br/>
<br/>
Gym & Glory의 장점은 다음과 같습니다. 
우선 게임 자체가 재밌습니다. 
그리고 외출할 필요가 없고, 돈 쓸 필요가 없습니다. 
마지막으로 이 게임은 협동심이 꼭 필요하기 때문에, 1~2판만 해도 사람들과 협동하면서 빠르게 친해질 수 있습니다.

## 목적 🧭

**재밌게 운동하면서 친구도 사귀자**

## 의의

- 협동심도 기르고 친구도 만들 수 있는 서비스
- 재밌게 운동하면서 나도 모르는 사이 건강해진다.
- 각 종 보상 및 랭크기능을 통해, 노력한 만큼 돌아오는 성취감

<div id="3"></div>

# 💫 기능소개 
(취합대기중)

# 📺 시연 영상

** https://www.youtube.com/premium **


# 🐳기술 스택

## 1. WebRTC

### WebRTC란?

<aside>
WebRTC (Web Real-Time Communication)는 웹 브라우저 간에 플러그인의 도움 없이 서로 통신할 수 있도록 설계된 API 입니다.
음성 통화, 영상 통화, P2P 파일 공유 등으로 활용될 수 있습니다. -출처 구글 위키피디아
![webRTC](https://velog.velcdn.com/images/jsw4215/post/b6706bea-56de-4b49-b86d-65131aa0dad9/image.webp)
</aside>

### openvidu

다양한 프레임워크와 호환성이 높을 뿐만 아니라 WebRTC를 소프트웨어 개발 키트(Software Development Kit, SDK)로 제공하기 때문에, 사용하기 편리하고 추가적인 커스터마이징을 통해서 고성능의 서비스를 구축할 수 있었습니다.

### 적용

`Gym & Glorty` 에서는 게임 화면 및 inGame에서의 원활한 소통을 위해 openVidu를 사용합니다.

## 2. Teachable Machine

### Teachable Machine이란?

![webSocket](https://www.womennews.co.kr/news/photo/202106/212326_345474_042.png)

<aside>
Teachable Machine은 구글에서 만든 웹기반 노코드 인공지능 학습 툴입니다. 이미지, 사운드, 자세를 인식하도록 컴퓨터를 학습시켜서 사이트, 앱 등에 사용할 수 있는 머신러닝 모델을 쉽고 빠르게 만들 수 있습니다.


Teachable Machine 은 크게 3가지 단계로 이루어집니다. 첫번째 ‘모으기’ 단계에서는 예시를 수집하여 컴퓨터가 학습하기를 원하는 클래스 또는 카테고리로 그룹화합니다. 그 후에는 ‘학습 시키기’를 통해 모델을 학습시켜서 새로운 예시를 올바르게 분류하는지 즉시 테스트해 보는 것이 가능합니다. 마지막으로 ‘내보내기’로 사이트, 앱 등 프로젝트에 대한 모델을 내보내게 되면 모델을 다운로드하거나 온라인으로 호스팅할 수 있습니다.
</aside>

### 적용

`Gym & Glorty` 에서는 사용자의 움직임을 인식하기 위해 n가지 과정을 거칩니다.

1.  각 운동에 대한 모델 학습 (스쿼트,런지,점핑잭,팔굽혀펴기)
2.  Teachable Machine과 리액트 연결
3.  운동 시 리액트에서 정확도 비교 후 운동 횟수 카운트 증가 및 유니티에 신호 전송


## 3. Docker

> 도커는 리눅스의 응용 프로그램들을 프로세스 격리 기술들을 사용해 컨테이너로 실행하고 관리하는 오픈 소스 프로젝트이다. 도커 웹 페이지의 기능을 인용하면 다음과 같다: 도커 컨테이너는 일종의 소프트웨어를 소프트웨어의 실행에 필요한 모든 것을 포함하는 완전한 파일 시스템 안에 감싼다.

![docker](https://subicura.com/generated/assets/article_images/2017-01-19-docker-guide-for-beginners-1/docker-logo-800-b3c79c1cb.png)

## 4. NginX
> 가벼우면서도 강력한 프로그램을 목표로 러시아에서 개발되어 미국에서 운영 중인 오픈 소스 웹 서버 프로그램이다. '엔진엑스'라고 읽는다. HTTP와 리버스 프록시, IMAP/POP3 등의 서버 구동이 가능하다. Java 서블릿은 대개 Apache의 Tomcat을 연동해서 구동하고, PHP의 경우 PHP-FPM(FastCGI Process Manager)을 연동해서 구동한다. 그리고 웹 서버 소프트웨어로, 가벼움과 높은 성능을 목표로 한다. 웹 서버, 리버스 프록시 및 메일 프록시 기능을 가진다. 출처- 나무위키

![NginX](https://vietnamlife.info/wp-content/uploads/2022/10/RooSvbKlAWsOjkz8JPactXH-GPf4Pe6DC3Ue.png)

## 5. JavaScript

> 자바스크립트는 객체 기반의 스크립트 프로그래밍 언어이다. 이 언어는 웹 브라우저 내에서 주로 사용되며, 다른 응용 프로그램의 내장 객체에도 접근할 수 있는 기능을 가지고 있다. 또한 Node.js와 같은 런타임 환경과 같이 서버 프로그래밍에도 사용되고 있다.

![JavaScript](https://s3.ap-northeast-2.amazonaws.com/grepp-cloudfront/programmers_imgs/learn/thumb-course-javascript-webfrontend.jpg)

## 6. React

> 리액트는 자바스크립트 라이브러리의 하나로서 사용자 인터페이스를 만들기 위해 사용된다. 페이스북과 개별 개발자 및 기업들 공동체에 의해 유지보수된다. 리액트는 싱글 페이지 애플리케이션이나 모바일 애플리케이션 개발에 사용될 수 있다.

![React](https://images.velog.io/images/kim-jaemin420/post/088bbdd3-3c5c-4520-b250-4e67da4e368b/%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A2%E1%86%A8%E1%84%90%E1%85%B3.png)

## 7. Spring

> 스프링 프레임워크는 자바 플랫폼을 위한 오픈 소스 애플리케이션 프레임워크로서 간단히 스프링이라고도 한다. 동적인 웹 사이트를 개발하기 위한 여러 가지 서비스를 제공하고 있다.

![Spring](https://t1.daumcdn.net/cfile/tistory/9941A1385B99240D2E)

## 8. JPA(Java Persistence API)

> 스프링 프레임워크는 자바 플랫폼을 위한 오픈 소스 애플리케이션 프레임워크로서 간단히 스프링이라고도 한다. 동적인 웹 사이트를 개발하기 위한 여러 가지 서비스를 제공하고 있다.

![JPA](https://cdn.inflearn.com/public/courses/324109/course_cover/161476f8-f0b7-4b04-b293-ce648c2ea445/kyh_jsp.png)

## 9. 개발환경

![image-2.png](./image-2.png)
![image-3.png](./image-3.png)

## 10. 아키텍쳐 설계

![image-4.png](./image-4.png)

# 개발 일정
![image-5.png](./image-5.png)

