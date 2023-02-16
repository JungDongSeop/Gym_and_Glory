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
-- Table structure for table `teamlog_item`
--

DROP TABLE IF EXISTS `teamlog_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teamlog_item` (
  `team_item_sequence` int NOT NULL,
  `team_sequence` int DEFAULT NULL,
  `user_sequence` int DEFAULT NULL,
  PRIMARY KEY (`team_item_sequence`),
  KEY `FKm7hgkiw7pc400s4ysk8kg99oi` (`team_sequence`),
  KEY `FKg3604pahjraotf9ybqbnvxk0i` (`user_sequence`),
  CONSTRAINT `FKg3604pahjraotf9ybqbnvxk0i` FOREIGN KEY (`user_sequence`) REFERENCES `user` (`user_sequence`),
  CONSTRAINT `FKm7hgkiw7pc400s4ysk8kg99oi` FOREIGN KEY (`team_sequence`) REFERENCES `teamlog` (`team_sequence`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teamlog_item`
--

LOCK TABLES `teamlog_item` WRITE;
/*!40000 ALTER TABLE `teamlog_item` DISABLE KEYS */;
INSERT INTO `teamlog_item` VALUES (677,675,58),(684,682,58),(691,689,51);
/*!40000 ALTER TABLE `teamlog_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  1:54:56
