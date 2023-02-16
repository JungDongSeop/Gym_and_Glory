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
-- Table structure for table `teamlog`
--

DROP TABLE IF EXISTS `teamlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teamlog` (
  `team_sequence` int NOT NULL AUTO_INCREMENT,
  `clear_time` int DEFAULT NULL,
  `team_name` varchar(255) DEFAULT NULL,
  `reg_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `user_sequence1` int DEFAULT NULL,
  `user_sequence2` int DEFAULT NULL,
  `user_sequence3` int DEFAULT NULL,
  `user_sequence4` int DEFAULT NULL,
  `register_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`team_sequence`)
) ENGINE=InnoDB AUTO_INCREMENT=690 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teamlog`
--

LOCK TABLES `teamlog` WRITE;
/*!40000 ALTER TABLE `teamlog` DISABLE KEYS */;
INSERT INTO `teamlog` VALUES (675,115,'리중딱맹구한반두','2023-02-17 00:42:45.546008','2023-02-17 00:42:45.546008',NULL,NULL,NULL,NULL,NULL),(682,93,'나보다 빨리 깰 수 있냐?','2023-02-17 00:48:29.183384','2023-02-17 00:48:29.183384',NULL,NULL,NULL,NULL,NULL),(689,99,'최강7조 파이팅','2023-02-17 00:57:51.781327','2023-02-17 00:57:51.781327',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `teamlog` ENABLE KEYS */;
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
