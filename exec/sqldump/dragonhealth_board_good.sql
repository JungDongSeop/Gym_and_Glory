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
-- Table structure for table `board_good`
--

DROP TABLE IF EXISTS `board_good`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_good` (
  `board_good_sequence` int NOT NULL AUTO_INCREMENT,
  `article_sequence` int DEFAULT NULL,
  `user_sequence` int DEFAULT NULL,
  PRIMARY KEY (`board_good_sequence`),
  KEY `FKrel9huxf9uk15adbko8nbl1vd` (`article_sequence`),
  KEY `FKmwxq8twl4r5btwsjuu7p9mswb` (`user_sequence`),
  CONSTRAINT `FKmwxq8twl4r5btwsjuu7p9mswb` FOREIGN KEY (`user_sequence`) REFERENCES `user` (`user_sequence`),
  CONSTRAINT `FKrel9huxf9uk15adbko8nbl1vd` FOREIGN KEY (`article_sequence`) REFERENCES `board` (`article_sequence`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_good`
--

LOCK TABLES `board_good` WRITE;
/*!40000 ALTER TABLE `board_good` DISABLE KEYS */;
INSERT INTO `board_good` VALUES (77,111,44),(79,112,50),(80,117,59),(81,118,59),(82,119,59),(83,120,59),(85,116,50),(86,118,50),(88,127,50),(89,131,58),(90,128,50),(92,119,50),(93,132,50),(94,134,50),(95,141,58),(96,140,58),(97,140,47),(98,141,47),(99,135,47),(100,131,47),(101,143,59);
/*!40000 ALTER TABLE `board_good` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  1:54:58
