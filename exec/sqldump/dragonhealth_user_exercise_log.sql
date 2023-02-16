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
-- Table structure for table `user_exercise_log`
--

DROP TABLE IF EXISTS `user_exercise_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_exercise_log` (
  `user_exercise_sequence` int NOT NULL AUTO_INCREMENT,
  `count` int DEFAULT NULL,
  `exercise_date` datetime(6) DEFAULT NULL,
  `user_sequence` int DEFAULT NULL,
  `exercise_code` int DEFAULT NULL,
  `reg_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `div_exercise` int DEFAULT NULL,
  `register_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`user_exercise_sequence`),
  KEY `FKr8qylfwil93gxtd1r5urpi3gl` (`exercise_code`),
  KEY `FK5h0t59p28q8394k1ohiswx3c` (`user_sequence`),
  CONSTRAINT `FK5h0t59p28q8394k1ohiswx3c` FOREIGN KEY (`user_sequence`) REFERENCES `user` (`user_sequence`),
  CONSTRAINT `FKr8qylfwil93gxtd1r5urpi3gl` FOREIGN KEY (`exercise_code`) REFERENCES `exercise` (`exercise_code`)
) ENGINE=InnoDB AUTO_INCREMENT=695 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_exercise_log`
--

LOCK TABLES `user_exercise_log` WRITE;
/*!40000 ALTER TABLE `user_exercise_log` DISABLE KEYS */;
INSERT INTO `user_exercise_log` VALUES (658,0,'2023-02-17 00:17:51.931586',50,1,'2023-02-17 00:17:51.931586','2023-02-17 00:17:51.931586',NULL,NULL),(659,0,'2023-02-17 00:17:51.965494',50,2,'2023-02-17 00:17:51.965494','2023-02-17 00:17:51.965494',NULL,NULL),(660,0,'2023-02-17 00:17:51.978306',50,3,'2023-02-17 00:17:51.978306','2023-02-17 00:17:51.978306',NULL,NULL),(661,0,'2023-02-17 00:17:51.991420',50,4,'2023-02-17 00:17:51.991420','2023-02-17 00:17:51.991420',NULL,NULL),(664,70,'2023-02-17 00:28:04.528496',59,1,'2023-02-17 00:28:04.528496','2023-02-17 00:28:04.528496',NULL,NULL),(665,0,'2023-02-17 00:28:04.545169',59,2,'2023-02-17 00:28:04.545169','2023-02-17 00:28:04.545169',NULL,NULL),(666,0,'2023-02-17 00:28:04.557054',59,3,'2023-02-17 00:28:04.557054','2023-02-17 00:28:04.557054',NULL,NULL),(667,0,'2023-02-17 00:28:04.571379',59,4,'2023-02-17 00:28:04.571379','2023-02-17 00:28:04.571379',NULL,NULL),(670,13,'2023-02-17 00:32:38.863910',58,1,'2023-02-17 00:32:38.863910','2023-02-17 00:32:38.863910',NULL,NULL),(671,0,'2023-02-17 00:32:38.876103',58,2,'2023-02-17 00:32:38.876103','2023-02-17 00:32:38.876103',NULL,NULL),(672,0,'2023-02-17 00:32:38.886483',58,3,'2023-02-17 00:32:38.886483','2023-02-17 00:32:38.886483',NULL,NULL),(673,0,'2023-02-17 00:32:38.896806',58,4,'2023-02-17 00:32:38.896806','2023-02-17 00:32:38.896806',NULL,NULL),(676,117,'2023-02-17 00:42:45.592210',58,1,'2023-02-17 00:42:45.592210','2023-02-17 00:42:45.592210',NULL,NULL),(678,0,'2023-02-17 00:42:45.640017',58,2,'2023-02-17 00:42:45.640017','2023-02-17 00:42:45.640017',NULL,NULL),(679,0,'2023-02-17 00:42:45.656278',58,3,'2023-02-17 00:42:45.656278','2023-02-17 00:42:45.656278',NULL,NULL),(680,0,'2023-02-17 00:42:45.668495',58,4,'2023-02-17 00:42:45.668495','2023-02-17 00:42:45.668495',NULL,NULL),(683,117,'2023-02-17 00:48:29.183382',58,1,'2023-02-17 00:48:29.183382','2023-02-17 00:48:29.183382',NULL,NULL),(685,0,'2023-02-17 00:48:29.262622',58,2,'2023-02-17 00:48:29.262622','2023-02-17 00:48:29.262622',NULL,NULL),(686,0,'2023-02-17 00:48:29.273334',58,3,'2023-02-17 00:48:29.273334','2023-02-17 00:48:29.273334',NULL,NULL),(687,0,'2023-02-17 00:48:29.283983',58,4,'2023-02-17 00:48:29.283983','2023-02-17 00:48:29.283983',NULL,NULL),(690,115,'2023-02-17 00:57:51.781346',51,1,'2023-02-17 00:57:51.781346','2023-02-17 00:57:51.781346',NULL,NULL),(692,0,'2023-02-17 00:57:51.965496',51,2,'2023-02-17 00:57:51.965496','2023-02-17 00:57:51.965496',NULL,NULL),(693,0,'2023-02-17 00:57:52.007458',51,3,'2023-02-17 00:57:52.007458','2023-02-17 00:57:52.007458',NULL,NULL),(694,0,'2023-02-17 00:57:52.020473',51,4,'2023-02-17 00:57:52.020473','2023-02-17 00:57:52.020473',NULL,NULL);
/*!40000 ALTER TABLE `user_exercise_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  1:54:57
