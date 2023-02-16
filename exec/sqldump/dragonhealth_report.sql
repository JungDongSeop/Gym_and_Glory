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
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `report_sequence` int NOT NULL AUTO_INCREMENT,
  `confirmation` int DEFAULT NULL,
  `contents` varchar(255) DEFAULT NULL,
  `kind` int DEFAULT NULL,
  `register_time` varchar(255) DEFAULT NULL,
  `get_sequence` int DEFAULT NULL,
  `send_sequence` int DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`report_sequence`),
  KEY `FKq8jo22u960e798sx871hbfrhf` (`get_sequence`),
  KEY `FKbo6luxrfjeal4vvjlgskug9n9` (`send_sequence`),
  CONSTRAINT `FKbo6luxrfjeal4vvjlgskug9n9` FOREIGN KEY (`send_sequence`) REFERENCES `user` (`user_sequence`),
  CONSTRAINT `FKq8jo22u960e798sx871hbfrhf` FOREIGN KEY (`get_sequence`) REFERENCES `user` (`user_sequence`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (62,0,'열심히 안하고 버스 타시네요...',2,'2023-02-16T15:05:35.667416',47,59,'https://pliot1017-bucket.s3.ap-northeast-2.amazonaws.com/logo.png'),(63,0,'카메라 앞에서 잼잼 했습니다.',2,'2023-02-16T15:34:43.011068',44,50,'https://pliot1017-bucket.s3.ap-northeast-2.amazonaws.com/%EC%9E%BC%EC%9D%B8%EB%AA%A8.png');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  1:54:54
