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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_sequence` int NOT NULL AUTO_INCREMENT,
  `contents` varchar(1000) DEFAULT NULL,
  `good_count` int DEFAULT NULL,
  `open_close` int DEFAULT NULL,
  `register_time` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `article_sequence` int DEFAULT NULL,
  `user_sequence` int DEFAULT NULL,
  PRIMARY KEY (`comment_sequence`),
  KEY `FKke4ehjckmpw0nabr0ftjtcujd` (`article_sequence`),
  KEY `FK1ok3gds7qg1skdhjwcc5kqn6j` (`user_sequence`),
  CONSTRAINT `FK1ok3gds7qg1skdhjwcc5kqn6j` FOREIGN KEY (`user_sequence`) REFERENCES `user` (`user_sequence`),
  CONSTRAINT `FKke4ehjckmpw0nabr0ftjtcujd` FOREIGN KEY (`article_sequence`) REFERENCES `board` (`article_sequence`)
) ENGINE=InnoDB AUTO_INCREMENT=353 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (336,'악성 유저다 ',0,0,'2023-02-17 00:10:02.83362',NULL,111,50),(337,'친구해요 ~^^ ',0,0,'2023-02-17 00:10:13.835842',NULL,112,50),(338,'안 돼 ',0,0,'2023-02-17 00:18:36.199388',NULL,120,50),(339,'감사합니다!',0,0,'2023-02-17 00:18:41.279875',NULL,118,59),(340,'굿굿!!',0,0,'2023-02-17 00:18:59.840398',NULL,119,59),(341,'오 ~~~~~~~~~~~~~~~~~~~~~~ \n대박인데요? ',1,0,'2023-02-17 00:23:43.303216',NULL,127,50),(342,'ㅋㅋㅋ 별말씀을~',0,0,'2023-02-17 00:23:44.254169',NULL,127,58),(343,'거기 부울경 캠이 좋다더라고요 ',0,0,'2023-02-17 00:26:38.166742',NULL,131,50),(344,'같이 해요 ㄱㅡ',0,0,'2023-02-17 00:36:24.634054',NULL,137,50),(345,'진심 허벅지에 자극도 안 오죠 ㅋㅋ',0,0,'2023-02-17 00:36:49.852316',NULL,129,50),(346,'재 호 좌 ',0,0,'2023-02-17 00:39:57.516963',NULL,134,50),(347,'잘자연\n',1,0,'2023-02-17 00:50:50.858462',NULL,141,58),(348,'ㅋㅋㅋ 이제 제가 일등이에요',0,0,'2023-02-17 00:51:10.135434',NULL,140,58),(349,'부울경_이승한',0,0,'2023-02-17 00:51:22.130359',NULL,138,58),(350,'오늘이네?',0,0,'2023-02-17 00:51:34.625029',NULL,136,58),(351,'싫어요 기능은 없나..?',0,0,'2023-02-17 00:51:57.455807',NULL,131,58);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  1:54:53
