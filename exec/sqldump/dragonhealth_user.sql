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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_sequence` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `exp` float DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `profile_image_path` varchar(255) DEFAULT NULL,
  `level` int DEFAULT NULL,
  `manner_point` float DEFAULT NULL,
  `min_clear_time` time DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `tel_number` varchar(255) DEFAULT NULL,
  `total_play_time` time DEFAULT NULL,
  `role` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`user_sequence`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (44,'cat10830@naver.com',0,1,NULL,1,NULL,NULL,'inmonim',NULL,'01087255693',NULL,'ROLE_USER'),(45,'xkhg0611x@naver.com',0,1,NULL,1,NULL,NULL,'하상재',NULL,'01011111111',NULL,'ROLE_USER'),(46,'tablemin_park@daum.net',0,1,NULL,1,NULL,NULL,'ㅎㅇ',NULL,'01011111111',NULL,'ROLE_USER'),(47,'kyj032497@gmail.com',0,0,'https://pliot1017-bucket.s3.ap-northeast-2.amazonaws.com/avatar.png',1,NULL,NULL,'찐유진',NULL,'01011112222',NULL,'ROLE_USER'),(48,'kjinabc@naver.com',0,1,NULL,1,NULL,NULL,'김현진',NULL,'01049372341',NULL,'ROLE_USER'),(49,'test107@test.com',0,0,NULL,1,NULL,NULL,'체력증진용',NULL,'01000000000',NULL,'ROLE_USER'),(50,'ssm0224@gmail.com',0,0,NULL,1,NULL,NULL,'울산약골손수민',NULL,'01025758972',NULL,'ROLE_USER'),(51,'ds123911@naver.com',585,1,'https://pliot1017-bucket.s3.ap-northeast-2.amazonaws.com/istockphoto-1349387823-170667a.jpg',1,NULL,NULL,'찐동섭',NULL,'01045107080',NULL,'ROLE_USER'),(52,'test1930@test.com',0,1,NULL,1,NULL,NULL,'운동하자',NULL,'01000000000',NULL,'ROLE_USER'),(53,'11@11.com',0,0,NULL,1,NULL,NULL,'22d',NULL,'01099999999',NULL,'ROLE_USER'),(56,'8gicon@test.com',0,1,NULL,1,NULL,NULL,'컨설턴트',NULL,'01011112222',NULL,'ROLE_USER'),(57,'8gicoach@test.com',0,0,NULL,1,NULL,NULL,'코치',NULL,'01033334444',NULL,'ROLE_USER'),(58,'pliot1017@naver.com',598,1,NULL,1,NULL,NULL,'재호재호재호',NULL,'01099738253',NULL,'ROLE_ADMIN'),(59,'seunghan4769@naver.com',305,1,NULL,1,NULL,NULL,'GM_승한',NULL,'01050504769',NULL,'ROLE_ADMIN');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
