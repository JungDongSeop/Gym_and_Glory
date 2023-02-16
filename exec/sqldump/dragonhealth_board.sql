-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: i8e107.p.ssafy.io    Database: dragonhealth
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `article_sequence` int NOT NULL AUTO_INCREMENT,
  `contents` varchar(1000) DEFAULT NULL,
  `div` int DEFAULT NULL,
  `good_count` int DEFAULT NULL,
  `modify_time` varchar(255) DEFAULT NULL,
  `register_time` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `views` int DEFAULT NULL,
  `user_sequence` int DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`article_sequence`),
  KEY `FKguh3hsvo11cmn2qrowveocn5j` (`user_sequence`),
  CONSTRAINT `FKguh3hsvo11cmn2qrowveocn5j` FOREIGN KEY (`user_sequence`) REFERENCES `user` (`user_sequence`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (111,'모델 성능이 너무 좋아져서 꼼수가 안 먹히는군요',2,1,'2023-02-16 17:11:57.77834','2023-02-16 17:11:52.888562','재미있었습니다',0,44,NULL),(112,'저와 같이 운동할 사람 댓글 남겨주세요!!\r\n친구도 환영합니다 ㅎㅎ',3,1,'2023-02-17 00:10:16.741926','2023-02-16 23:51:23.762447','같이 할 사람 구해요~!',0,47,NULL),(114,'3일 전에 운동했는데 왜 지금도 터질 것 같죠?\r\n이건 말도 안 됩니다...',2,0,'2023-02-17 00:02:45.675333','2023-02-17 00:02:45.675333','허벅지 터질 것 같아요',0,50,'https://pliot1017-bucket.s3.ap-northeast-2.amazonaws.com/%EA%B3%B0%EA%B3%B0.jpg'),(115,'팀명 : 14시 아기돼지사형제 / 시작 전에 3분 정도 스트레칭 합니다',3,0,'2023-02-17 00:12:04.375436','2023-02-17 00:11:42.23018','오후 2시 풀팟 가볍게 오늘치 운동 합시다',0,50,NULL),(116,'다치지 마세요',1,1,'2023-02-17 00:18:31.393171','2023-02-17 00:15:56.742371','************************필독***************************',0,58,NULL),(117,'',1,1,'2023-02-17 00:18:17.806137','2023-02-17 00:16:27.637179','업데이트 공지 0.1 version',0,58,NULL),(118,'사진 올라가는 거 수정했습니다~',1,2,'2023-02-17 00:18:45.515378','2023-02-17 00:17:16.837877','업데이트 공지 0.2 version',0,58,NULL),(119,'업데이트 했떠요',1,2,'2023-02-17 00:32:39.946399','2023-02-17 00:17:39.825937','업데이트 공지 0.3 version',0,58,NULL),(120,'서비스 중단 위기 입니다.',1,1,'2023-02-17 00:18:23.314388','2023-02-17 00:17:54.741478','업데이트 공지 0.4 version',0,58,NULL),(121,'점검합니데이~',1,0,'2023-02-17 00:18:34.203258','2023-02-17 00:18:34.203258','서비스 점검 안내 2023-02-01~ 2023-02-02',0,58,NULL),(122,'',1,0,'2023-02-17 00:19:36.389678','2023-02-17 00:19:36.389678','서비스 점검 안내 2023-02-03~ 2023-02-04',0,58,NULL),(123,'긴급 패치 합니다.. 미안합니다..',1,0,'2023-02-17 00:20:34.976293','2023-02-17 00:20:02.296936','긴급 패치 2023 -02 -14 ~ 2023 -02 -15',0,58,NULL),(124,'긴급패치..ㅠㅠ',1,0,'2023-02-17 00:20:52.218807','2023-02-17 00:20:52.218807','긴급 패치 2023 -02 -15 ~ 2023 -02 -16',0,58,NULL),(125,'실패했다.... ',2,0,'2023-02-17 00:20:52.53248','2023-02-17 00:20:52.53248','클리어',0,50,'https://pliot1017-bucket.s3.ap-northeast-2.amazonaws.com/%EA%B3%B0%EA%B3%B0%EA%B3%B0.jfif'),(126,'버그 수정 개선',1,0,'2023-02-17 00:21:07.947171','2023-02-17 00:21:07.947171','버그 수정 및 개선',0,58,NULL),(127,'내 허벅지 제주도 흑마',2,1,'2023-02-17 00:22:01.619913','2023-02-17 00:21:32.941139','벅지 말벅지',0,58,NULL),(128,'오늘 4층까지 달릴 사람~?오늘 4층까지 달릴 사람~?오늘 4층까지 달릴 사람~?오늘 4층까지 달릴 사람~?오늘 4층까지 달릴 사람~?오늘 4층까지 달릴 사람~?',3,1,'2023-02-17 00:25:31.116336','2023-02-17 00:22:05.471149','오늘 4층까지 달릴 사람~?',0,58,NULL),(129,'4층까진 너무 쉽지 않냐 ? ㅋㅋ',3,0,'2023-02-17 00:22:24.558605','2023-02-17 00:22:24.558605','언제 5층 나오냐 ',0,58,NULL),(130,'',2,0,'2023-02-17 00:23:28.098312','2023-02-17 00:23:28.098312','님들 스쿼트 제대로 된 자세 보여드림',0,58,'https://pliot1017-bucket.s3.ap-northeast-2.amazonaws.com/maxresdefault.jpg'),(131,'',2,2,'2023-02-17 00:59:21.450875','2023-02-17 00:24:44.579349','저 싸피 인터뷰 합격했어요.',0,58,'https://pliot1017-bucket.s3.ap-northeast-2.amazonaws.com/%ED%95%A9%EA%B2%A9%EC%A6%9D%EB%AA%85.jpg'),(132,'팀명 드래곤머슬마스터 / 레벨 낮으면 강퇴함 ',3,1,'2023-02-17 00:39:17.107691','2023-02-17 00:25:08.099659','랭킹 남기게 빡겜하실분',0,50,NULL),(133,'나 대신..',2,0,'2023-02-17 00:25:30.502573','2023-02-17 00:25:30.502573','스쿼트 좀 해줘..',0,58,NULL),(134,'그건 바로 나\r\n',2,1,'2023-02-17 00:39:51.265201','2023-02-17 00:25:53.814639','매일 운동하는 사람있냐?',0,58,'https://pliot1017-bucket.s3.ap-northeast-2.amazonaws.com/%EB%82%B4%20%EC%82%AC%EC%A7%84.jpg'),(135,'너 찾아간다.',2,1,'2023-02-17 00:59:08.513258','2023-02-17 00:26:32.933699','아까 나랑 겜할 때 트롤한 놈 봐라 ',0,58,NULL),(136,'내일은 금요일이닷!',2,0,'2023-02-17 00:27:07.652581','2023-02-17 00:27:07.652581','히융',0,58,NULL),(137,'혼자 할끄다',3,0,'2023-02-17 00:27:53.867881','2023-02-17 00:27:53.867881','7시에 운동 할 사람들 친추 보내라.',0,58,NULL),(138,'페이스 다 무너지고 웃느라 딜 못넣었다 책임져라 ',2,0,'2023-02-17 00:27:56.727732','2023-02-17 00:27:56.727732','아니 방금 점핑잭하다 방구뀐놈 누구야',0,50,NULL),(140,'인모 위 승한',2,2,'2023-02-17 00:58:23.86798','2023-02-17 00:30:47.933659','와 방금 개인 랭킹 기록 깨진거 봄?',0,50,'https://pliot1017-bucket.s3.ap-northeast-2.amazonaws.com/%EC%9D%B8%EC%9C%84%EC%8A%B9.png'),(141,'내일 보자 ',2,2,'2023-02-17 00:58:53.675697','2023-02-17 00:37:32.162595','자러간다',0,50,NULL),(142,'스테이지 딜 100 넘게 때리는 사람만 오세요 ... ',3,0,'2023-02-17 00:38:29.180633','2023-02-17 00:38:29.180633','2인 잔디팟 가실 분',0,50,NULL),(143,' 대박!!',2,1,'2023-02-17 00:59:21.477517','2023-02-17 00:58:16.497679','와 여기 인기 장난 아니다!!',0,47,NULL);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  1:54:59
