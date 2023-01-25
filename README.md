설치 목록

- axios
- react-router
- redux
- antd
- react-unity-webgl

프론트/백 연결하는 법

1. 인텔리제이 설치 및 실행
실행경로 S08P12E107파일 위치 ->backend->build.gradle 실행

2. axios 보낼 때, 
    requestBody가 적힌 거는 json
    Pathvariable은 /주소/주소/Pathvarible/Pathvariable
                ex) localhost:8080/board/1(pathvarible)/2(pathvariable)
    requestParam은 쿼리스트링 형식으로 보내주시면 돼요.

    *** 스프링 시큐리티가 추가 되고 나면 요청할 데이터, 요청받을 데이터 등이 많이 달라질 수 있으니까 회원관리말고 다른 것들 위주로 테스트 해주시면 좋을 것 같습니다.
    *** 문제나 안돌아가는 거 01058998381로 전화주시면 바로 받고 수정할께요 특별한 일 없으면 무조건 받으니까 부담없이 전화 ㄱ-ㄱ
    *** 아직 추가해야할 api도 많고 작동이 안되는 api도 좀 있을겁니당.. 바로바로 전달해주시면 바로바로 수정할께요